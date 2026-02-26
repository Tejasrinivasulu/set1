import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
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

  const handleLogin = (e: React.FormEvent) => {
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
    setParticipant({ name: name.trim(), rollNumber: rollNumber.trim() });
    navigate("/rules");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-xl shadow-xl border-2 border-border/60">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tight">QUIZ LOGIN</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg md:text-xl font-semibold">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="h-12 md:h-14 text-lg md:text-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roll" className="text-lg md:text-xl font-semibold">Roll Number</Label>
              <Input
                id="roll"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter your roll number"
                className="h-12 md:h-14 text-lg md:text-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg md:text-xl font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="h-12 md:h-14 text-lg md:text-xl"
              />
            </div>
            {error && <p className="text-base md:text-lg text-destructive font-semibold">{error}</p>}
            <Button type="submit" className="w-full text-xl md:text-2xl py-4 md:py-5" size="lg">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
