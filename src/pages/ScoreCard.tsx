import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ScoreCard = () => {
  const navigate = useNavigate();
  const { participant, score, submissionReason, tabSwitchCount } = useQuiz();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold tracking-tight">QUIZ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {submissionReason === "tabSwitch" && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Auto-submitted due to tab switching (violations: {tabSwitchCount}).
            </div>
          )}
          <p className="text-muted-foreground">Participant: <span className="text-foreground font-medium">{participant?.name}</span></p>
          <p className="text-muted-foreground">Roll Number: <span className="text-foreground font-medium">{participant?.rollNumber}</span></p>
          <div className="py-6">
            <p className="text-lg text-muted-foreground">You scored:</p>
            <p className="text-5xl font-extrabold text-primary">{score} / {questions.length}</p>
          </div>
          <Button size="lg" className="w-full" onClick={() => navigate("/")}>OK</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreCard;
