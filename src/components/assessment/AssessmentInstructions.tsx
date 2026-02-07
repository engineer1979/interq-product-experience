import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Ban, 
  Users, 
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

interface AssessmentInstructionsProps {
  assessment: Assessment;
  onAccept: () => void;
  onBack: () => void;
  accepted: boolean;
  onAcceptChange: (accepted: boolean) => void;
}

export function AssessmentInstructions({ 
  assessment, 
  onAccept, 
  onBack, 
  accepted, 
  onAcceptChange 
}: AssessmentInstructionsProps) {
  const [showProctoringWarning, setShowProctoringWarning] = useState(false);

  const guidelines = [
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: 'Time Management',
      description: `You have ${assessment.duration_minutes} minutes to complete this assessment. The timer cannot be paused once started.`,
      important: true
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: 'Passing Score',
      description: `You need to score at least ${assessment.passing_score}% to pass this assessment.`,
      important: true
    },
    {
      icon: <Eye className="w-5 h-5 text-purple-600" />,
      title: 'Proctoring',
      description: 'This assessment may include proctoring features such as tab switching detection and time monitoring.',
      important: false
    },
    {
      icon: <Ban className="w-5 h-5 text-red-600" />,
      title: 'Academic Integrity',
      description: 'Copy-paste functionality is disabled. Any attempts to cheat will be recorded and may result in disqualification.',
      important: true
    },
    {
      icon: <Users className="w-5 h-5 text-orange-600" />,
      title: 'One Attempt Only',
      description: 'You can only take this assessment once. Make sure you are ready before proceeding.',
      important: true
    },
    {
      icon: <Award className="w-5 h-5 text-indigo-600" />,
      title: 'Results',
      description: 'Your results will be available immediately after completion. You can review your answers and see detailed feedback.',
      important: false
    }
  ];

  const handleAcceptance = (checked: boolean) => {
    onAcceptChange(checked);
    if (!checked) {
      setShowProctoringWarning(true);
    } else {
      setShowProctoringWarning(false);
    }
  };

  const handleContinue = () => {
    if (!accepted) {
      setShowProctoringWarning(true);
      return;
    }
    onAccept();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Instructions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please read these instructions carefully before starting your assessment. Understanding these guidelines will help you perform your best.
        </p>
      </div>

      {/* Assessment Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{assessment.title}</h3>
              <p className="text-gray-600 mt-1">{assessment.description}</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                assessment.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                assessment.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {assessment.difficulty === 'easy' ? '⭐' : assessment.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'} {assessment.difficulty}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{assessment.total_questions}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{assessment.duration_minutes}</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{assessment.passing_score}%</div>
              <div className="text-sm text-gray-600">Passing Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{assessment.category}</div>
              <div className="text-sm text-gray-600">Category</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Important Warning */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="w-5 h-5 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Important:</strong> Once you start the assessment, you cannot pause or restart it. Make sure you have a stable internet connection and are in a quiet environment.
        </AlertDescription>
      </Alert>

      {/* Guidelines */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Assessment Guidelines</h3>
        
        {guidelines.map((guideline, index) => (
          <Card key={index} className={`border-l-4 ${
            guideline.important ? 'border-l-red-400 bg-red-50' : 'border-l-blue-400 bg-blue-50'
          }`}>
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {guideline.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{guideline.title}</h4>
                    {guideline.important && (
                      <Badge variant="destructive" className="text-xs">Important</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{guideline.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Proctoring Warning */}
      {showProctoringWarning && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <AlertDescription className="text-red-800">
            You must accept all instructions and guidelines to proceed with the assessment. Please read and check the agreement box above.
          </AlertDescription>
        </Alert>
      )}

      {/* Agreement Checkbox */}
      <Card className="border-gray-200 bg-gray-50">
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreement"
              checked={accepted}
              onCheckedChange={handleAcceptance}
              className="mt-1"
            />
            <div className="flex-1">
              <label htmlFor="agreement" className="text-sm font-medium text-gray-900 cursor-pointer">
                I have read, understood, and agree to all the instructions and guidelines provided above.
              </label>
              <p className="text-xs text-gray-500 mt-1">
                By checking this box, you confirm that you will follow all assessment rules and understand the consequences of any violations.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Technical Requirements */}
      <Card className="border-gray-200">
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Technical Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Stable internet connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Updated web browser</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Quiet environment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Uninterrupted time slot</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Selection</span>
        </Button>

        <Button
          onClick={handleContinue}
          disabled={!accepted}
          className="flex items-center space-x-2"
        >
          <span>Start Assessment</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}