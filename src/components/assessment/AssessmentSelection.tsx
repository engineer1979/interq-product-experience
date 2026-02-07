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
  difficulty: 'easy' | 'medium' | 'hard';
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

  const categories = ['all', 'Technical', 'Behavioral', 'Cognitive', 'Domain-Specific', 'Leadership'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];
  const commonTags = ['all', 'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Problem Solving', 'Communication'];

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  useEffect(() => {
    filterAssessments();
  }, [assessments, searchTerm, selectedCategory, selectedDifficulty, selectedTag, filterAssessments]);

  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      toast({
        title: 'Error loading assessments',
        description: 'Failed to load available assessments. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const filterAssessments = useCallback(() => {
    const filtered = assessments.filter(assessment => {
      const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assessment.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || assessment.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || assessment.difficulty === selectedDifficulty;
      const matchesTag = selectedTag === 'all' || assessment.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));

      return matchesSearch && matchesCategory && matchesDifficulty && matchesTag;
    });

    setFilteredAssessments(filtered);
  }, [assessments, searchTerm, selectedCategory, selectedDifficulty, selectedTag]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '⭐';
      case 'medium': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading assessments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Assessment</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select an assessment that matches your skills and career goals. Each assessment is carefully designed to evaluate your expertise.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search assessments by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Tags:</span>
          {commonTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTag(tag)}
            >
              {tag === 'all' ? 'All Tags' : tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredAssessments.length} of {assessments.length} assessments
        </p>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Filtered by your criteria</span>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{assessment.title}</h3>
                  <p className="text-sm text-gray-500">{assessment.category}</p>
                </div>
                <Badge className={getDifficultyColor(assessment.difficulty)}>
                  {getDifficultyIcon(assessment.difficulty)} {assessment.difficulty}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">{assessment.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{assessment.duration_minutes} min</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Award className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{assessment.passing_score}%</div>
                  <div className="text-xs text-gray-500">Passing Score</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{assessment.total_questions}</div>
                  <div className="text-xs text-gray-500">Questions</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {assessment.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {assessment.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{assessment.tags.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Action Button */}
              <Button
                onClick={() => onAssessmentSelect(assessment)}
                className="w-full"
                size="lg"
              >
                Start Assessment
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssessments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more assessments.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSelectedTag('all');
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}