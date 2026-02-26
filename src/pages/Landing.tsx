import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 overflow-hidden">
      <img
        src="/bg/landing-bg.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-52 w-52 md:h-64 md:w-64 rounded-full border-4 border-border bg-background shadow-sm overflow-hidden flex items-center justify-center">
            <img src="/logos/iste.png" alt="ISTE logo" className="h-full w-full object-contain" />
          </div>
          <span className="text-4xl md:text-5xl font-bold text-destructive">✕</span>
          <div className="h-52 w-52 md:h-64 md:w-64 rounded-full border-4 border-border bg-background shadow-sm overflow-hidden flex items-center justify-center">
            <img src="/logos/acm.png" alt="ACM logo" className="h-full w-full object-contain" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-10">
          QUIZ
        </h1>

        <Button size="lg" className="text-xl md:text-2xl px-14 py-8 md:px-16 md:py-9" onClick={() => navigate("/login")}>
          START QUIZ
        </Button>
      </div>
    </div>
  );
};

export default Landing;
