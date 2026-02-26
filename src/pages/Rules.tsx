import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Rules = () => {
  const navigate = useNavigate();
  const { startQuiz } = useQuiz();
  const [accepted, setAccepted] = useState(false);

  const handleStart = () => {
    startQuiz();
    navigate("/quiz");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight">Quiz Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>Team Size: <strong>1 – 2 Members</strong></li>
            <li>Total Questions: <strong>30</strong>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>25 MCQs</li>
                <li>5 Fill in the Blanks</li>
              </ul>
            </li>
            <li>Total Quiz Time: <strong>30 Minutes</strong></li>
            <li>Once the quiz starts, the timer <strong>cannot be paused</strong></li>
            <li>Questions must be answered within the given time</li>
            <li><strong>Auto-submit</strong> when time ends</li>
          </ul>

          <div className="flex items-center gap-3">
            <Checkbox id="accept" checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} />
            <label htmlFor="accept" className="text-sm font-medium cursor-pointer select-none">
              I have read and understood the rules
            </label>
          </div>

          <Button className="w-full" size="lg" disabled={!accepted} onClick={handleStart}>
            START QUIZ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
