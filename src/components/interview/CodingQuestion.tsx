import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodingQuestionProps {
  question: {
    id: string;
    question_text: string;
    difficulty: string;
    points: number;
    starter_code?: string;
    test_cases?: any[];
    time_limit_minutes?: number;
    language_options?: string[];
  };
  code?: { code: string; language: string };
  onCodeChange: (data: { code: string; language: string }) => void;
}

export function CodingQuestion({ question, code, onCodeChange }: CodingQuestionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    code?.language || question.language_options?.[0] || 'javascript'
  );
  const [codeValue, setCodeValue] = useState(
    code?.code || question.starter_code || ''
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    onCodeChange({ code: codeValue, language });
  };

  const handleCodeChange = (newCode: string) => {
    setCodeValue(newCode);
    onCodeChange({ code: newCode, language: selectedLanguage });
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Coding Challenge</h3>
          <div className="flex gap-2">
            <Badge variant={
              question.difficulty === 'easy' ? 'default' :
              question.difficulty === 'medium' ? 'secondary' : 'destructive'
            }>
              {question.difficulty}
            </Badge>
            <Badge variant="outline">{question.points} points</Badge>
            {question.time_limit_minutes && (
              <Badge variant="outline">{question.time_limit_minutes} min</Badge>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="problem" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="problem">Problem</TabsTrigger>
          <TabsTrigger value="testcases">Test Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="problem" className="mt-4">
          <div className="prose prose-sm max-w-none mb-4">
            <p className="text-foreground whitespace-pre-wrap">{question.question_text}</p>
          </div>
        </TabsContent>
        
        <TabsContent value="testcases" className="mt-4">
          <div className="space-y-3">
            {Array.isArray(question.test_cases) ? question.test_cases.map((testCase: any, index: number) => (
              <Card key={index} className="p-4 bg-muted/50">
                <p className="text-sm font-medium mb-2">Test Case {index + 1}</p>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Input:</span> {testCase.input}</p>
                  <p><span className="font-medium">Expected:</span> {testCase.expected_output}</p>
                  {testCase.description && (
                    <p className="text-muted-foreground">{testCase.description}</p>
                  )}
                </div>
              </Card>
            )) : <p className="text-sm text-muted-foreground">No test cases available</p>}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Your Solution</label>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(question.language_options) ? question.language_options.map((lang: string) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              )) : null}
            </SelectContent>
          </Select>
        </div>
        
        <Textarea
          value={codeValue}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder="Write your code here..."
          className="font-mono min-h-[300px] text-sm"
        />
      </div>
    </Card>
  );
}