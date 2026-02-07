import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Download,
  Share2,
  RotateCcw,
  Home
} from 'lucide-react';
import { AssessmentResults as AssessmentResultsType } from './AssessmentWorkflow';

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

interface AssessmentResultsProps {
  results: AssessmentResultsType;
  assessment: Assessment;
  onFinish: () => void;
}

interface PerformanceAnalytics {
  category: string;
  correct: number;
  total: number;
  percentage: number;
}

interface TimeAnalytics {
  totalTime: number;
  averageTimePerQuestion: number;
  timeDistribution: {
    fast: number;
    medium: number;
    slow: number;
  };
}

export function AssessmentResults({ results, assessment, onFinish }: AssessmentResultsProps) {
  const [analytics, setAnalytics] = useState<PerformanceAnalytics[]>([]);
  const [timeAnalytics, setTimeAnalytics] = useState<TimeAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    calculateAnalytics();
    saveResults();
  }, [calculateAnalytics, saveResults]);

  const calculateAnalytics = useCallback(() => {
    // Calculate performance by question type
    const typeAnalytics: Record<string, { correct: number; total: number }> = {};
    
    results.questionResults.forEach(result => {
      const type = result.userAnswer === result.correctAnswer ? 'correct' : 'incorrect';
      if (!typeAnalytics[type]) {
        typeAnalytics[type] = { correct: 0, total: 0 };
      }
      typeAnalytics[type].total++;
      if (result.isCorrect) {
        typeAnalytics[type].correct++;
      }
    });

    const performanceAnalytics: PerformanceAnalytics[] = [
      {
        category: 'Correct Answers',
        correct: results.questionResults.filter(r => r.isCorrect).length,
        total: results.questionResults.length,
        percentage: results.percentage
      },
      {
        category: 'Incorrect Answers',
        correct: results.questionResults.filter(r => !r.isCorrect).length,
        total: results.questionResults.length,
        percentage: 100 - results.percentage
      }
    ];

    setAnalytics(performanceAnalytics);

    // Calculate time analytics
    const timeAnalytics: TimeAnalytics = {
      totalTime: results.timeTaken,
      averageTimePerQuestion: Math.round(results.timeTaken / results.questionResults.length),
      timeDistribution: {
        fast: Math.floor(results.questionResults.length * 0.3),
        medium: Math.floor(results.questionResults.length * 0.5),
        slow: Math.floor(results.questionResults.length * 0.2)
      }
    };

    setTimeAnalytics(timeAnalytics);
  }, [results]);

  const saveResults = useCallback(async () => {
    try {
      setLoading(true);
      
      // Save assessment result
      const { data: resultData, error: resultError } = await supabase
        .from('assessment_results')
        .insert({
          assessment_id: results.assessmentId,
          user_id: results.userId,
          score: results.score,
          total_points: results.totalPoints,
          percentage: results.percentage,
          passed: results.passed,
          time_taken_seconds: results.timeTaken,
          completed_at: results.completedAt,
          answers: results.answers,
          question_results: results.questionResults
        })
        .select()
        .single();

      if (resultError) throw resultError;

      // Mark session as completed
      await supabase
        .from('assessment_sessions')
        .update({ 
          completed: true, 
          submitted_at: new Date().toISOString(),
          result_id: resultData.id
        })
        .eq('assessment_id', results.assessmentId)
        .eq('user_id', results.userId);

      toast({
        title: 'Results Saved',
        description: 'Your assessment results have been saved successfully.',
        variant: 'success'
      });

    } catch (error) {
      console.error('Error saving results:', error);
      toast({
        title: 'Error',
        description: 'Failed to save results. Please contact support.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [results, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (percentage: number, passed: boolean) => {
    if (passed) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          PASSED
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200">
        <XCircle className="w-3 h-3 mr-1" />
        FAILED
      </Badge>
    );
  };

  const downloadResults = () => {
    const resultsData = {
      assessment: assessment,
      results: results,
      analytics: analytics,
      timeAnalytics: timeAnalytics,
      downloadedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(resultsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment-results-${assessment.title.replace(/\s+/g, '-')}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Results Downloaded',
      description: 'Your assessment results have been downloaded.',
      variant: 'success'
    });
  };

  const shareResults = async () => {
    const shareText = `I just completed the "${assessment.title}" assessment and scored ${results.percentage}% (${results.passed ? 'PASSED' : 'FAILED'})! 🎯`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Assessment Results',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      toast({
        title: 'Copied to Clipboard',
        description: 'Results summary copied to clipboard.',
        variant: 'success'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Results</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Congratulations on completing the assessment! Here are your detailed results and performance analytics.
        </p>
      </div>

      {/* Main Score Card */}
      <Card className={`border-2 ${
        results.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
      }`}>
        <div className="p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            {getPerformanceBadge(results.percentage, results.passed)}
          </div>
          
          <div className="text-6xl font-bold mb-2 ${getPerformanceColor(results.percentage)}">
            {results.percentage}%
          </div>
          
          <div className="text-lg text-gray-600 mb-4">
            {results.score} / {results.totalPoints} points
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {results.questionResults.filter(r => r.isCorrect).length}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {results.questionResults.filter(r => !r.isCorrect).length}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(results.timeTaken)}
              </div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Analytics */}
      {analytics.length > 0 && (
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Performance Analytics
            </h3>
            
            <div className="space-y-4">
              {analytics.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm text-gray-600">
                      {item.correct}/{item.total} ({item.percentage}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Time Analytics */}
      {timeAnalytics && (
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Time Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(timeAnalytics.totalTime)}
                </div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {timeAnalytics.averageTimePerQuestion}s
                </div>
                <div className="text-sm text-gray-600">Avg per Question</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((timeAnalytics.totalTime / assessment.duration_minutes / 60) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Time Efficiency</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Detailed Question Results */}
      <Card>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Question-by-Question Results</h3>
          
          <div className="space-y-4">
            {results.questionResults.map((result, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                result.isCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                      {result.isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Your Answer:</span>
                        <p className="text-sm text-gray-800 mt-1">{result.userAnswer || 'Not answered'}</p>
                      </div>
                      
                      {!result.isCorrect && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Correct Answer:</span>
                          <p className="text-sm text-green-700 mt-1">{result.correctAnswer}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`font-medium ${
                          result.isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {result.points}/{result.maxPoints} points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={downloadResults}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Results</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={shareResults}
            className="flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Results</span>
          </Button>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onFinish}
            className="flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Saving your results...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}