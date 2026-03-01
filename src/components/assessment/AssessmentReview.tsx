import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  Circle, 
  Flag, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Clock
} from 'lucide-react';

interface TestCase {
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

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

interface Question {
  id: string;
  question_text: string;
  question_type: 'mcq' | 'coding';
  options?: string[];
  correct_answer?: string;
  points: number;
  order_index: number;
  starter_code?: string;
  test_cases?: TestCase[];
  time_limit_minutes?: number;
  language_options?: string[];
}

interface AssessmentReviewProps {
  assessment: Assessment;
  questions: Question[];
  answers: Record<string, string | number | boolean>;
  markedForReview: Set<string>;
  onSubmit: () => void;
  onBack: () => void;
}

export function AssessmentReview({ 
  assessment, 
  questions, 
  answers, 
  markedForReview, 
  onSubmit, 
  onBack 
}: AssessmentReviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = answers[currentQuestion.id];

  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const unansweredQuestions = totalQuestions - answeredQuestions;
  const markedForReviewCount = markedForReview.size;

  const getQuestionStatus = (index: number) => {
    const question = questions[index];
    if (markedForReview.has(question.id)) return 'review';
    if (answers[question.id]) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-green-100 text-green-800 border-green-200';
      case 'review': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered': return <CheckCircle className="w-4 h-4" />;
      case 'review': return <Flag className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const handleSubmit = () => {
    if (unansweredQuestions > 0) {
      setShowWarning(true);
      return;
    }
    
    if (!confirmSubmit) {
      setConfirmSubmit(true);
      return;
    }

    onSubmit();
  };

  const renderAnswerPreview = (question: Question, answer: string | number | boolean) => {
    if (!answer) {
      return (
        <div className="text-gray-500 italic">
          No answer provided
        </div>
      );
    }

    if (question.question_type === 'mcq') {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">Selected Answer:</span>
          </div>
          <div className="mt-2 text-blue-800">{answer}</div>
        </div>
      );
    }

    if (question.question_type === 'coding') {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">Your Code:</span>
          </div>
          <pre className="text-sm text-gray-700 bg-white p-3 rounded border overflow-x-auto max-h-32">
            <code>{answer}</code>
          </pre>
        </div>
      );
    }

    return (
      <div className="text-gray-800">
        {answer}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Answers</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please review your answers before submitting. You can navigate through questions and make changes if needed.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
            <div className="text-sm text-blue-800">Total Questions</div>
          </div>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{answeredQuestions}</div>
            <div className="text-sm text-green-800">Answered</div>
          </div>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{markedForReviewCount}</div>
            <div className="text-sm text-orange-800">Marked for Review</div>
          </div>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{unansweredQuestions}</div>
            <div className="text-sm text-red-800">Unanswered</div>
          </div>
        </Card>
      </div>

      {/* Question Navigator */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigator</h3>
        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2 mb-4">
          {questions.map((question, index) => {
            const status = getQuestionStatus(index);
            return (
              <Button
                key={question.id}
                variant="ghost"
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 p-0 text-xs ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : getStatusColor(status)
                }`}
              >
                {index + 1}
                {status === 'review' && <Flag className="w-2 h-2 absolute top-0 right-0" />}
              </Button>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-gray-600">Answered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded"></div>
            <span className="text-gray-600">Marked for Review</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
            <span className="text-gray-600">Unanswered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-gray-600">Current</span>
          </div>
        </div>
      </Card>

      {/* Current Question Review */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-sm">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
              <Badge className={`text-xs ${
                currentQuestion.question_type === 'mcq' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {currentQuestion.question_type === 'mcq' ? 'Multiple Choice' : 'Coding'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {currentQuestion.points} points
              </Badge>
              {markedForReview.has(currentQuestion.id) && (
                <Badge className="bg-orange-100 text-orange-800">
                  <Flag className="w-3 h-3 mr-1" />
                  Marked for Review
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center space-x-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {currentQuestion.question_text}
            </h4>
            
            {currentQuestion.question_type === 'mcq' && currentQuestion.options && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Available Options:</p>
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className={`p-2 rounded border ${
                      answers[currentQuestion.id] === option
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          answers[currentQuestion.id] === option
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300'
                        }`}></div>
                        <span className="text-gray-800">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Your Answer:</p>
              {renderAnswerPreview(currentQuestion, answers[currentQuestion.id])}
            </div>
          </div>
        </div>
      </Card>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Unanswered Questions</h3>
              </div>
              <p className="text-gray-600 mb-6">
                You have {unansweredQuestions} unanswered questions. Are you sure you want to submit?
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowWarning(false)}
                >
                  Review Questions
                </Button>
                <Button
                  onClick={() => {
                    setShowWarning(false);
                    handleSubmit();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit Anyway
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Final Confirmation */}
      <Card className="border-blue-200 bg-blue-50">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Final Submission</h3>
          </div>
          <p className="text-blue-800 mb-4">
            Once you submit, you cannot make any changes. Please ensure you have reviewed all your answers carefully.
          </p>
          
          <div className="flex items-center space-x-3 mb-6">
            <Checkbox
              id="confirm-submit"
              checked={confirmSubmit}
              onCheckedChange={(checked) => setConfirmSubmit(checked as boolean)}
            />
            <Label htmlFor="confirm-submit" className="text-blue-900">
              I confirm that I have reviewed all my answers and want to submit this assessment.
            </Label>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Test</span>
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!confirmSubmit}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
            >
              <span>Submit Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}