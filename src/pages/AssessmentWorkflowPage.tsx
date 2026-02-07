import React, { useState } from 'react';
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AssessmentWorkflow, AssessmentResults as AssessmentResultsType } from "@/components/assessment/AssessmentWorkflow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, Users, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function AssessmentWorkflowPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isStarted, setIsStarted] = useState(false);
  const [completedResults, setCompletedResults] = useState<AssessmentResultsType | null>(null);

  const handleAssessmentComplete = (results: AssessmentResultsType) => {
    setCompletedResults(results);
    toast({
      title: 'Assessment Completed!',
      description: `You scored ${results.percentage}% on the assessment.`,
      variant: results.passed ? 'success' : 'default'
    });
  };

  const handleAssessmentCancel = () => {
    setIsStarted(false);
    navigate('/assessments');
  };

  const startAssessment = () => {
    setIsStarted(true);
  };

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: 'Comprehensive Evaluation',
      description: 'Multi-step assessment process with detailed question analysis'
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: 'Timed Assessment',
      description: 'Real-time timer with auto-save and session management'
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: 'Instant Results',
      description: 'Immediate feedback with detailed performance analytics'
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: 'Secure & Fair',
      description: 'Proctoring features ensure academic integrity'
    }
  ];

  if (isStarted && !completedResults) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <AssessmentWorkflow
            userId={user?.id || ''}
            onComplete={handleAssessmentComplete}
            onCancel={handleAssessmentCancel}
          />
        </div>
      </ProtectedRoute>
    );
  }

  if (completedResults) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-6xl mx-auto p-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment Complete!</h1>
              <p className="text-xl text-gray-600">Great job on completing your assessment.</p>
            </div>
            
            <AssessmentResults
              results={completedResults}
              assessment={completedResults.assessment}
              onFinish={() => {
                setCompletedResults(null);
                setIsStarted(false);
                navigate('/assessments');
              }}
            />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Assessment Workflow
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our comprehensive 5-step assessment process designed to evaluate your skills 
            with precision, security, and detailed analytics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Process Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            5-Step Assessment Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: 1,
                title: 'Select Assessment',
                description: 'Browse and choose from available assessments',
                color: 'bg-blue-100 text-blue-800'
              },
              {
                step: 2,
                title: 'Instructions',
                description: 'Review guidelines and accept terms',
                color: 'bg-green-100 text-green-800'
              },
              {
                step: 3,
                title: 'Start Test',
                description: 'Answer questions with timer and auto-save',
                color: 'bg-purple-100 text-purple-800'
              },
              {
                step: 4,
                title: 'Review Answers',
                description: 'Check and confirm your responses',
                color: 'bg-orange-100 text-orange-800'
              },
              {
                step: 5,
                title: 'Results',
                description: 'Get instant feedback and analytics',
                color: 'bg-red-100 text-red-800'
              }
            ].map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="p-6 text-center h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${step.color} mb-4`}>
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </Card>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Real-time timer with auto-submit on timeout</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Auto-save answers every 30 seconds</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Mark questions for review</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Secure session management</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Proctoring and anti-cheat measures</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Detailed performance analytics</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Assessment Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Multiple Choice Questions</span>
                <Badge variant="outline">MCQ</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Coding Challenges</span>
                <Badge variant="outline">Coding</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">Technical Assessments</span>
                <Badge variant="outline">Technical</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="font-medium">Behavioral Questions</span>
                <Badge variant="outline">Behavioral</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start?</h3>
            <p className="text-xl mb-6 opacity-90">
              Take your assessment with our advanced 5-step workflow and get instant, detailed results.
            </p>
            <Button
              onClick={startAssessment}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Begin Assessment Workflow
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}