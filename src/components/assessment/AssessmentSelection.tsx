import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, Award, Users, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  passing_score: number;
  total_questions: number;
  difficulty: string;
  category: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
}

interface AssessmentSelectionProps {
  onAssessmentSelect: (assessment: Assessment) => void;
  userId: string;
}

export function AssessmentSelection({ onAssessmentSelect, userId }: AssessmentSelectionProps) {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [filteredAssessments, setFilteredAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const { toast } = useToast();

  // Derive categories and difficulties dynamically from fetched data
  const categories = ['all', ...Array.from(new Set(assessments.map(a => a.category))).sort()];
  const difficulties = ['all', ...Array.from(new Set(assessments.map(a => a.difficulty))).sort()];
  const commonTags = ['all', 'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Problem Solving', 'Communication'];

  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map DB rows to our Assessment interface
      const mapped: Assessment[] = (data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description || '',
        duration_minutes: row.duration_minutes,
        passing_score: row.passing_score,
        total_questions: 0,
        difficulty: row.difficulty,
        category: row.category,
        tags: [],
        is_active: row.is_published ?? true,
        created_at: row.created_at,
      }));
      setAssessments(mapped);
    } catch (error) {
      toast({ title: 'Error loading assessments', description: 'Failed to load available assessments.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const filterAssessments = useCallback(() => {
    const filtered = assessments.filter(assessment => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        assessment.title.toLowerCase().includes(searchLower) || 
        assessment.description.toLowerCase().includes(searchLower) ||
        assessment.category.toLowerCase().includes(searchLower);
      const matchesCategory = selectedCategory === 'all' || assessment.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || assessment.difficulty === selectedDifficulty;
      // Tags: match against title + category since DB doesn't store tags separately
      const matchesTag = selectedTag === 'all' || 
        assessment.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
        assessment.category.toLowerCase().includes(selectedTag.toLowerCase());
      return matchesSearch && matchesCategory && matchesDifficulty && matchesTag;
    });
    setFilteredAssessments(filtered);
  }, [assessments, searchTerm, selectedCategory, selectedDifficulty, selectedTag]);

  useEffect(() => { fetchAssessments(); }, [fetchAssessments]);
  useEffect(() => { filterAssessments(); }, [filterAssessments]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading assessments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Assessment</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Select an assessment that matches your skills and career goals.</p>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input type="text" placeholder="Search assessments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background">
              {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
            </select>
            <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background">
              {difficulties.map(d => <option key={d} value={d}>{d === 'all' ? 'All Difficulties' : d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium">Tags:</span>
          {commonTags.map(tag => (
            <Badge key={tag} variant={selectedTag === tag ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedTag(tag)}>
              {tag === 'all' ? 'All Tags' : tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">Showing {filteredAssessments.length} of {assessments.length} assessments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{assessment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assessment.category}</p>
                </div>
                <Badge className={getDifficultyColor(assessment.difficulty)}>{assessment.difficulty}</Badge>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-3">{assessment.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center"><Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" /><div className="text-sm font-medium">{assessment.duration_minutes} min</div></div>
                <div className="text-center"><Award className="w-4 h-4 text-green-500 mx-auto mb-1" /><div className="text-sm font-medium">{assessment.passing_score}%</div></div>
                <div className="text-center"><Users className="w-4 h-4 text-purple-500 mx-auto mb-1" /><div className="text-sm font-medium">{assessment.total_questions}</div></div>
              </div>
              <Button onClick={() => onAssessmentSelect(assessment)} className="w-full" size="lg">
                Start Assessment <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredAssessments.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No assessments found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria.</p>
          <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedDifficulty('all'); setSelectedTag('all'); }}>Clear all filters</Button>
        </div>
      )}
    </div>
  );
}
