import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface MCQQuestionProps {
  question: {
    id: string;
    question_text: string;
    difficulty: string;
    points: number;
    options?: any;
    correct_answer?: string;
  };
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
}

export function MCQQuestion({ question, selectedAnswer, onAnswerChange }: MCQQuestionProps) {
  const getOptions = () => {
    if (Array.isArray(question.options)) return question.options;
    if (typeof question.options === 'string') {
      try {
        return JSON.parse(question.options);
      } catch {
        return [];
      }
    }
    return [];
  };

  const options = getOptions();

  return (
    <div className="space-y-8">
      {/* Question Heading */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px] py-0">Analytical Inquiry</Badge>
          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">{question.points} PTS</Badge>
        </div>
        <h3 className="text-2xl font-black tracking-tight leading-snug text-foreground/90">{question.question_text}</h3>
      </div>

      {/* Options Grid */}
      <RadioGroup
        value={selectedAnswer}
        onValueChange={onAnswerChange}
        className="grid gap-3"
      >
        {options.map((option: string, index: number) => {
          const isSelected = selectedAnswer === option;
          return (
            <motion.div
              key={index}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <Label
                htmlFor={`option-${question.id}-${index}`}
                className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${isSelected
                    ? "border-primary bg-primary/5 shadow-glow-sm"
                    : "border-border/50 bg-secondary/20 hover:border-primary/30 hover:bg-secondary/40"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all duration-300 ${isSelected ? "bg-primary text-white" : "bg-card border border-border text-muted-foreground"
                    }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={`text-sm font-bold tracking-tight transition-colors ${isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {option}
                  </span>
                </div>

                <div className="flex items-center">
                  <RadioGroupItem
                    value={option}
                    id={`option-${question.id}-${index}`}
                    className="sr-only"
                  />
                  {isSelected ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="text-primary" size={20} />
                    </motion.div>
                  ) : (
                    <ChevronRight className="text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all" size={18} />
                  )}
                </div>
              </Label>
            </motion.div>
          );
        })}
      </RadioGroup>

      {/* Logic Hint */}
      <div className="p-4 bg-muted/30 rounded-2xl border border-dashed border-border flex gap-3 items-center">
        <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-primary border border-border">
          <span className="text-[10px] font-black">i</span>
        </div>
        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Multiple choices are weighted equally in this assessment module.</p>
      </div>
    </div>
  );
}