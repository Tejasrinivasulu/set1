import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const { setParticipant } = useQuiz();
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rollNumber.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== "Quiz@1") {
      setError("Incorrect password. Please try again.");
      return;
    }
    // Check one-login-per-session
    if (sessionStorage.getItem("quizLoggedIn")) {
      setError("You have already attempted the quiz in this session.");
      return;
    }
    sessionStorage.setItem("quizLoggedIn", "true");

    try {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
    } catch {
      // If auth fails, quiz can still run, but Firestore rules may block writes.
    }

    setParticipant({ name: name.trim(), rollNumber: rollNumber.trim() });
    navigate("/rules");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-sky-900 to-emerald-800 px-4">
      <Card className="w-full max-w-xl shadow-2xl border border-cyan-400/80 bg-slate-950/95 backdrop-blur-xl">
        <CardHeader className="text-center space-y-3">
          <p className="text-sm md:text-base font-medium tracking-[0.25em] text-cyan-300">
            WELCOME TO THE QUIZ
          </p>
          <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">
            QUIZ LOGIN
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg md:text-xl font-semibold text-cyan-100">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="h-12 md:h-14 text-lg md:text-xl bg-slate-900 border-cyan-400/70 text-slate-50 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roll" className="text-lg md:text-xl font-semibold text-cyan-100">
                Roll Number
              </Label>
              <Input
                id="roll"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter your roll number"
                className="h-12 md:h-14 text-lg md:text-xl bg-slate-900 border-cyan-400/70 text-slate-50 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg md:text-xl font-semibold text-cyan-100">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="h-12 md:h-14 text-lg md:text-xl bg-slate-900 border-cyan-400/70 text-slate-50 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
              />
            </div>
            {error && (
              <p className="text-base md:text-lg text-destructive font-semibold bg-destructive/10 border border-destructive/40 rounded-md px-3 py-2">
                {error}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full text-xl md:text-2xl py-4 md:py-5 font-semibold bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 hover:from-cyan-400 hover:via-sky-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/40"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
