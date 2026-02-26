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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight">QUIZ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roll">Roll Number</Label>
              <Input id="roll" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="Enter your roll number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </div>
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            <Button type="submit" className="w-full" size="lg">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
