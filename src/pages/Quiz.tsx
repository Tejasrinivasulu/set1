import { useEffect, useRef, useState } from "react";
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
  const { answers, currentQuestion, timeRemaining, quizSubmitted, setAnswer, setCurrentQuestion, submitQuiz, quizStarted, registerTabSwitch, tabSwitchCount } = useQuiz();
  const q = questions[currentQuestion];
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningLevel, setWarningLevel] = useState<1 | 2 | 3 | null>(null);
  const lastViolationAtRef = useRef(0);

  useEffect(() => {
    if (!quizStarted) navigate("/");
    if (quizSubmitted) navigate("/score");
  }, [quizSubmitted, quizStarted, navigate]);

  useEffect(() => {
    if (!quizStarted || quizSubmitted) return;

    const recordViolation = () => {
      if (quizSubmitted) return;

      const now = Date.now();
      if (now - lastViolationAtRef.current < 900) return;
      lastViolationAtRef.current = now;

      const nextCount = registerTabSwitch();
      if (nextCount === 1) {
        setWarningLevel(1);
        setWarningOpen(true);
      } else if (nextCount === 2) {
        setWarningLevel(2);
        setWarningOpen(true);
      } else if (nextCount >= 3) {
        setWarningLevel(3);
        setWarningOpen(true);
        submitQuiz({ reason: "tabSwitch" });
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) recordViolation();
    };

    const onBlur = () => {
      recordViolation();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onBlur);
    };
  }, [quizStarted, quizSubmitted, registerTabSwitch, submitQuiz]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (!q) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <AlertDialog
        open={warningOpen}
        onOpenChange={(next) => {
          // Do not allow closing by clicking outside / escape.
          if (next) setWarningOpen(true);
        }}
      >
        <AlertDialogContent className="max-w-xl md:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl md:text-3xl font-extrabold">
              {warningLevel === 1 && "WARNING 1 ⚠️"}
              {warningLevel === 2 && "WARNING 2 ⚠️"}
              {warningLevel === 3 && "WARNING 3 ❌"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg md:text-xl">
              {warningLevel === 1 && (
                <>
                  You are not allowed to switch tabs.
                  <br />
                  This is your first warning.
                </>
              )}
              {warningLevel === 2 && (
                <>
                  Tab switching detected again.
                  <br />
                  One more attempt will auto-submit your quiz.
                </>
              )}
              {warningLevel === 3 && (
                <>
                  You violated quiz rules.
                  <br />
                  Quiz will be auto-submitted.
                </>
              )}
              {warningLevel !== null && warningLevel !== 3 && (
                <div className="mt-4 text-sm md:text-base text-muted-foreground font-medium">
                  Violations: {tabSwitchCount} / 3
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {warningLevel !== 3 && (
            <AlertDialogFooter className="sm:justify-center">
              <AlertDialogAction
                onClick={() => {
                  setWarningOpen(false);
                }}
                className="text-lg md:text-xl px-8 md:px-10 py-3 md:py-4"
              >
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>

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
        <div className="flex-1 p-6 max-w-3xl">
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-8 leading-snug">
            <span className="text-muted-foreground mr-3 text-xl md:text-2xl">Q{currentQuestion + 1}.</span>
            {q.question}
          </p>

          {q.type === "mcq" && q.options ? (
            <RadioGroup value={answers[currentQuestion] || ""} onValueChange={(v) => setAnswer(currentQuestion, v)} className="space-y-4">
              {q.options.map((opt) => (
                <div key={opt} className="flex items-center gap-4 rounded-lg border border-border p-4 md:p-5 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={opt} id={`opt-${opt}`} className="h-5 w-5 md:h-6 md:w-6" />
                  <Label htmlFor={`opt-${opt}`} className="cursor-pointer flex-1 text-lg md:text-xl">
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Input
              placeholder="Type your answer here..."
              value={answers[currentQuestion] || ""}
              onChange={(e) => setAnswer(currentQuestion, e.target.value)}
              className="max-w-xl h-12 md:h-14 text-lg md:text-xl"
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
                <AlertDialogAction onClick={() => submitQuiz({ reason: "manual" })}>Submit</AlertDialogAction>
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
