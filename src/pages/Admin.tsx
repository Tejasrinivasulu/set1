import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Result {
  name: string;
  rollNumber: string;
  timeTaken: number;
  score: number;
  total: number;
  date: string;
}

const ADMIN_PASSWORD = "Admin@123";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const results: Result[] = JSON.parse(localStorage.getItem("quizResults") || "[]");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect admin password.");
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  const downloadCSV = () => {
    const header = "Name,Roll Number,Time Taken,Score\n";
    const rows = results.map((r) => `"${r.name}","${r.rollNumber}","${formatTime(r.timeTaken)}","${r.score}/${r.total}"`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Quiz Results</h1>
          <Button onClick={downloadCSV} disabled={results.length === 0}>Download CSV</Button>
        </div>

        {results.length === 0 ? (
          <p className="text-muted-foreground">No results yet.</p>
        ) : (
          <div className="border border-border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Time Taken</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.rollNumber}</TableCell>
                    <TableCell>{formatTime(r.timeTaken)}</TableCell>
                    <TableCell>{r.score}/{r.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
