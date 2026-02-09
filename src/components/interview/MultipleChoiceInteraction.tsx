import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MultipleChoiceQuestion } from "@/data/interview-questions";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

interface MultipleChoiceInteractionProps {
  question: MultipleChoiceQuestion;
  onAnswer: (answer: string) => void;
}

export function MultipleChoiceInteraction({ question, onAnswer }: MultipleChoiceInteractionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <RadioGroup value={selectedOption ?? undefined} onValueChange={setSelectedOption} className="space-y-4">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RadioGroupItem value={option} id={`option-${index}`} className="sr-only" />
            <Label
              htmlFor={`option-${index}`}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedOption === option ? 'border-primary bg-primary/10' : 'border-border'}`}>
              <div className="w-5 h-5 rounded-full border-2 border-primary mr-4 flex-shrink-0 flex items-center justify-center">
                {selectedOption === option && <div className="w-2.5 h-2.5 rounded-full bg-primary"/>}
              </div>
              <span className="flex-grow">{option}</span>
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
      <div className="text-center">
        <Button size="lg" onClick={handleSubmit} disabled={!selectedOption}>
          Submit Answer <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
