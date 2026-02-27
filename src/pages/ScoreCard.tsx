import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FORM_URL = "https://forms.gle/CAYSPkdtnpmZ5ssaA";

const ScoreCard = () => {
  const navigate = useNavigate();
  const { participant, score, submissionReason, tabSwitchCount, timeRemaining } = useQuiz();

  const totalSeconds = 30 * 60;
  const timeTakenSeconds = Math.max(0, totalSeconds - timeRemaining);
  const minutes = Math.floor(timeTakenSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeTakenSeconds % 60).toString().padStart(2, "0");
  const timeTakenFormatted = `${minutes}:${seconds}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-900 via-indigo-900 to-slate-900 px-4">
      <Card className="w-full max-w-2xl text-center bg-slate-900/95 backdrop-blur border-primary/60 shadow-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">
            Quiz Result
          </CardTitle>
          <p className="text-sm md:text-base text-slate-200">
            Thank you for participating!
          </p>
        </CardHeader>
        <CardContent className="space-y-6 md:space-y-8">
          {submissionReason === "tabSwitch" && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/15 px-4 py-3 text-sm md:text-base text-destructive font-semibold">
              Auto-submitted due to tab switching (violations: {tabSwitchCount}).
            </div>
          )}
          <div className="space-y-1">
            <p className="text-base md:text-lg text-slate-200">
              Participant:{" "}
              <span className="text-slate-50 font-semibold">
                {participant?.name}
              </span>
            </p>
            <p className="text-base md:text-lg text-slate-200">
              Roll Number:{" "}
              <span className="text-slate-50 font-semibold">
                {participant?.rollNumber}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="rounded-xl border-2 border-yellow-400/80 bg-gradient-to-br from-yellow-300 via-amber-300 to-orange-300 px-4 py-6 flex flex-col items-center justify-center shadow-lg">
              <p className="text-sm uppercase tracking-wide text-primary-foreground/80">
                Your Score
              </p>
              <p className="mt-1 text-5xl md:text-6xl font-black text-slate-900 drop-shadow-sm">
                {score}
              </p>
              <p className="mt-1 text-sm md:text-base font-semibold text-slate-800">
                out of {questions.length}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-5 flex flex-col items-center justify-center">
              <p className="text-sm uppercase tracking-wide text-emerald-200">
                Time Taken
              </p>
              <p className="mt-2 text-3xl md:text-4xl font-bold text-emerald-300 tabular-nums">
                {timeTakenFormatted}
              </p>
            </div>
            <div className="rounded-xl border border-indigo-400/40 bg-indigo-500/10 px-4 py-5 flex flex-col items-center justify-center">
              <p className="text-sm uppercase tracking-wide text-indigo-200">
                Tab Switches
              </p>
              <p className="mt-2 text-3xl md:text-4xl font-bold text-indigo-300">
                {tabSwitchCount}
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full md:w-auto md:px-12 md:text-lg font-semibold bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 text-slate-950 hover:from-emerald-300 hover:via-cyan-300 hover:to-sky-300"
            onClick={() => {
              if (FORM_URL) {
                window.open(FORM_URL, "_blank", "noopener,noreferrer");
              }
            }}
          >
            Fill the Form
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreCard;
