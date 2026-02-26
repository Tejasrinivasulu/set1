import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex items-center gap-6 mb-8">
        <div className="h-28 w-28 rounded-2xl border-2 border-border bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
          LOGO 1
        </div>
        <span className="text-3xl font-bold text-destructive">✕</span>
        <div className="h-28 w-28 rounded-2xl border-2 border-border bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
          LOGO 2
        </div>
      </div>

      <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-10">
        QUIZ
      </h1>

      <Button size="lg" className="text-lg px-10 py-6" onClick={() => navigate("/login")}>
        START QUIZ
      </Button>
    </div>
  );
};

export default Landing;
