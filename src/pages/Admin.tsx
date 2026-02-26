import { useMemo, useState } from "react";
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
  tabSwitchCount?: number;
  autoSubmitted?: boolean;
  submissionReason?: "manual" | "timeout" | "tabSwitch";
}

const ADMIN_PASSWORD = "Admin@123";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const results: Result[] = JSON.parse(localStorage.getItem("quizResults") || "[]");
  const rankedResults = useMemo(() => {
    const safe = Array.isArray(results) ? results : [];
    return [...safe].sort((a, b) => {
      const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      const timeDiff = (a.timeTaken ?? 0) - (b.timeTaken ?? 0);
      if (timeDiff !== 0) return timeDiff;
      return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
    });
  }, [results]);

  const fastestResults = useMemo(() => {
    const safe = Array.isArray(results) ? results : [];
    return [...safe].sort((a, b) => {
      const timeDiff = (a.timeTaken ?? 0) - (b.timeTaken ?? 0);
      if (timeDiff !== 0) return timeDiff;
      const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
    });
  }, [results]);

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
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const downloadCSV = () => {
    const header = "Rank,Name,Roll Number,Time Taken (mm:ss),Time Taken (seconds),Score,Total,Tab Switch Count,Auto Submitted,Date\n";
    const rows = rankedResults
      .map((r, idx) =>
        [
          idx + 1,
          `"${r.name}"`,
          `"${r.rollNumber}"`,
          `"${formatTime(r.timeTaken)}"`,
          r.timeTaken,
          r.score,
          r.total,
          r.tabSwitchCount ?? 0,
          (r.autoSubmitted ?? false) ? "Yes" : "No",
          `"${r.date}"`,
        ].join(",")
      )
      .join("\n");
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
          <Button onClick={downloadCSV} disabled={rankedResults.length === 0}>Download CSV</Button>
        </div>

        {rankedResults.length === 0 ? (
          <p className="text-muted-foreground">No results yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold tabular-nums">{rankedResults.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">{rankedResults[0].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {rankedResults[0].score}/{rankedResults[0].total} • {formatTime(rankedResults[0].timeTaken)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fastest Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">{fastestResults[0].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(fastestResults[0].timeTaken)} • {fastestResults[0].score}/{fastestResults[0].total}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border border-border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Time Taken</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Tab Switch</TableHead>
                    <TableHead>Auto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankedResults.map((r, i) => (
                    <TableRow key={`${r.rollNumber}-${r.date}-${i}`}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{r.name}</TableCell>
                      <TableCell>{r.rollNumber}</TableCell>
                      <TableCell>{formatTime(r.timeTaken)}</TableCell>
                      <TableCell>{r.score}/{r.total}</TableCell>
                      <TableCell>{r.tabSwitchCount ?? 0}</TableCell>
                      <TableCell>{(r.autoSubmitted ?? false) ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
