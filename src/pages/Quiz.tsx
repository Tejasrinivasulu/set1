import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Quiz = () => {
  const navigate = useNavigate();
  const { answers, currentQuestion, timeRemaining, quizSubmitted, setAnswer, setCurrentQuestion, submitQuiz, quizStarted } = useQuiz();
  const q = questions[currentQuestion];

  useEffect(() => {
    if (!quizStarted) navigate("/");
    if (quizSubmitted) navigate("/score");
  }, [quizSubmitted, quizStarted, navigate]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (!q) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-muted/30 p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Questions</h2>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuestion(i)}
              className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
                i === currentQuestion
                  ? "bg-primary text-primary-foreground"
                  : answers[i]
                  ? "bg-accent text-accent-foreground ring-1 ring-primary/30"
                  : "bg-background text-foreground border border-border hover:bg-muted"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-auto text-xs text-muted-foreground">
          Answered: {Object.keys(answers).length} / {questions.length}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Timer bar */}
        <header className="flex items-center justify-between border-b border-border px-6 py-3">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className={`text-lg font-bold tabular-nums ${timeRemaining <= 60 ? "text-destructive" : "text-foreground"}`}>
            ⏱ {formatTime(timeRemaining)}
          </span>
        </header>

        {/* Question */}
        <div className="flex-1 p-6 max-w-2xl">
          <p className="text-lg font-medium text-foreground mb-6">
            <span className="text-muted-foreground mr-2">Q{currentQuestion + 1}.</span>
            {q.question}
          </p>

          {q.type === "mcq" && q.options ? (
            <RadioGroup value={answers[currentQuestion] || ""} onValueChange={(v) => setAnswer(currentQuestion, v)} className="space-y-3">
              {q.options.map((opt) => (
                <div key={opt} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={opt} id={`opt-${opt}`} />
                  <Label htmlFor={`opt-${opt}`} className="cursor-pointer flex-1">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Input
              placeholder="Type your answer here..."
              value={answers[currentQuestion] || ""}
              onChange={(e) => setAnswer(currentQuestion, e.target.value)}
              className="max-w-md"
            />
          )}
        </div>

        {/* Navigation */}
        <footer className="flex items-center justify-between border-t border-border px-6 py-4">
          <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(currentQuestion - 1)}>
            Previous
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Submit Quiz</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
                <AlertDialogDescription>
                  You have answered {Object.keys(answers).length} out of {questions.length} questions. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={submitQuiz}>Submit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button disabled={currentQuestion === questions.length - 1} onClick={() => setCurrentQuestion(currentQuestion + 1)}>
            Next
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Quiz;
