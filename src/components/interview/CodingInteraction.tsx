import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodingQuestion } from "@/data/interview-questions";
import { Code, Play } from 'lucide-react';

interface CodingInteractionProps {
  question: CodingQuestion;
  onComplete: () => void;
}

export function CodingInteraction({ question, onComplete }: CodingInteractionProps) {

  // In a real scenario, this would involve a proper code editor component (e.g., Monaco Editor)
  // and a backend service to execute the code against test cases.
  // For this simulation, we use a simple textarea and mock the result.

  return (
    <div className="w-full space-y-6">
      <div className="bg-background/80 p-4 rounded-lg border font-mono text-sm overflow-x-auto">
        <pre><code>{question.starter_code}</code></pre>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg"><Code className="mr-2"/> Test Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.test_cases.map((test, index) => (
            <div key={index} className="text-sm p-3 bg-muted rounded-md">
              <p><strong>Description:</strong> {test.description}</p>
              <p><strong>Expected Output:</strong> <span className="font-mono text-primary">{test.expected_output}</span></p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button size="lg" onClick={onComplete}>
          <Play className="mr-2"/> Run & Submit Code
        </Button>
      </div>
    </div>
  );
}
