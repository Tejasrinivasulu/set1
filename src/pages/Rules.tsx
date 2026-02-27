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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-900 via-indigo-900 to-slate-900 px-4">
      <Card className="w-full max-w-3xl bg-slate-950/95 border-primary/50 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50">
            Quiz Rules
          </CardTitle>
          <p className="text-sm md:text-base text-slate-200">
            Please read carefully before starting. Tab switching is strictly monitored.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-sky-400/60 bg-sky-500/15 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-sky-200">Questions</p>
              <p className="mt-1 text-xl font-semibold">30</p>
              <p className="text-xs text-sky-100/80">25 MCQs + 5 picture based</p>
            </div>
            <div className="rounded-xl border border-emerald-400/60 bg-emerald-500/15 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-emerald-200">Time Limit</p>
              <p className="mt-1 text-xl font-semibold">30 minutes</p>
              <p className="text-xs text-emerald-100/80">Timer starts immediately</p>
            </div>
            <div className="rounded-xl border border-amber-400/60 bg-amber-500/15 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-amber-200">Team Size</p>
              <p className="mt-1 text-xl font-semibold">1 – 2 members</p>
              <p className="text-xs text-amber-100/80">One attempt only</p>
            </div>
          </div>

          <ul className="space-y-2 text-sm md:text-base leading-relaxed">
            <li>📌 The quiz consists of <strong>30 questions</strong> (25 MCQs + 5 picture-based questions).</li>
            <li>⏱️ The total time limit is <strong>30 minutes</strong> and the timer starts immediately.</li>
            <li>🚫 The quiz <strong>cannot be paused or restarted</strong> once started.</li>
            <li>👥 Each team can have <strong>1 or 2 members only</strong>.</li>
            <li>🧭 Questions can be navigated using the <strong>question number panel</strong> on the left.</li>
            <li>🖥️ <strong>Tab switching is monitored:</strong></li>
            <li className="pl-4">• 1st switch → Warning</li>
            <li className="pl-4">• 2nd switch → Warning</li>
            <li className="pl-4">• 3rd switch → <strong>Auto-submit</strong></li>
            <li>⏳ The quiz will be <strong>auto-submitted</strong> when time ends or on the 3rd tab switch.</li>
            <li>📊 After submission, a <strong>scorecard</strong> is displayed showing your marks and time.</li>
            <li>📸 Participants must <strong>take a screenshot</strong> of the scorecard.</li>
            <li>📝 Participants must <strong>fill the submission form and upload the scorecard screenshot</strong> as proof of completion.</li>
          </ul>

          <div className="flex items-center gap-3 pt-2">
            <Checkbox id="accept" checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} />
            <label htmlFor="accept" className="text-sm md:text-base font-medium cursor-pointer select-none text-slate-100">
              I have read and understood the rules and agree to follow them during the quiz.
            </label>
          </div>

          <Button
            className="w-full md:w-auto md:px-10 bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 text-slate-950 hover:from-emerald-300 hover:via-cyan-300 hover:to-sky-300 font-semibold"
            size="lg"
            disabled={!accepted}
            onClick={handleStart}
          >
            START QUIZ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
