import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Admin@1";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [scoreMin, setScoreMin] = useState<number | "">("");
  const [scoreMax, setScoreMax] = useState<number | "">("");
  const [tabMin, setTabMin] = useState<number | "">("");
  const [tabMax, setTabMax] = useState<number | "">("");
  const [autoFilter, setAutoFilter] = useState<"all" | "yes" | "no">("all");
  const [confirmExportType, setConfirmExportType] = useState<"csv" | "xlsx" | null>(null);

  const results: Result[] = JSON.parse(localStorage.getItem("quizResults") || "[]");
  const rankedResults = useMemo(() => {
    const safe = Array.isArray(results) ? results : [];
    // One attempt per roll number (keep best according to ranking rules)
    const byRoll = new Map<string, Result>();
    safe.forEach((r) => {
      const existing = byRoll.get(r.rollNumber);
      if (!existing) {
        byRoll.set(r.rollNumber, r);
        return;
      }
      const scoreDiff = (r.score ?? 0) - (existing.score ?? 0);
      const timeDiff = (r.timeTaken ?? 0) - (existing.timeTaken ?? 0);
      const tabDiff = (r.tabSwitchCount ?? 0) - (existing.tabSwitchCount ?? 0);
      if (
        scoreDiff > 0 ||
        (scoreDiff === 0 && timeDiff < 0) ||
        (scoreDiff === 0 && timeDiff === 0 && tabDiff < 0)
      ) {
        byRoll.set(r.rollNumber, r);
      }
    });

    return [...byRoll.values()].sort((a, b) => {
      const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      const timeDiff = (a.timeTaken ?? 0) - (b.timeTaken ?? 0);
      if (timeDiff !== 0) return timeDiff;
      const tabDiff = (a.tabSwitchCount ?? 0) - (b.tabSwitchCount ?? 0);
      if (tabDiff !== 0) return tabDiff;
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

  const leastTabSwitchResults = useMemo(() => {
    const safe = Array.isArray(results) ? results : [];
    return [...safe].sort((a, b) => {
      const tabDiff = (a.tabSwitchCount ?? 0) - (b.tabSwitchCount ?? 0);
      if (tabDiff !== 0) return tabDiff;
      const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      const timeDiff = (a.timeTaken ?? 0) - (b.timeTaken ?? 0);
      if (timeDiff !== 0) return timeDiff;
      return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
    });
  }, [results]);

  const filteredResults = useMemo(() => {
    let data = rankedResults;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.rollNumber.toLowerCase().includes(q),
      );
    }
    if (scoreMin !== "") {
      data = data.filter((r) => r.score >= scoreMin);
    }
    if (scoreMax !== "") {
      data = data.filter((r) => r.score <= scoreMax);
    }
    if (tabMin !== "") {
      data = data.filter((r) => (r.tabSwitchCount ?? 0) >= tabMin);
    }
    if (tabMax !== "") {
      data = data.filter((r) => (r.tabSwitchCount ?? 0) <= tabMax);
    }
    if (autoFilter !== "all") {
      data = data.filter((r) =>
        autoFilter === "yes"
          ? (r.autoSubmitted ?? false)
          : !(r.autoSubmitted ?? false),
      );
    }
    return data;
  }, [rankedResults, search, scoreMin, scoreMax, tabMin, tabMax, autoFilter]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedUser = username.trim().toLowerCase();
    if (normalizedUser === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
      sessionStorage.setItem("quizAdminAuthed", "true");
    } else {
      setError("Incorrect admin credentials.");
    }
  };

  if (!authed && sessionStorage.getItem("quizAdminAuthed") === "true") {
    setAuthed(true);
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const buildExportRows = (data: Result[]) =>
    data.map((r, idx) =>
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
    );

  const downloadCSV = () => {
    const header = "Rank,Name,Roll Number,Time Taken (mm:ss),Time Taken (seconds),Score,Total,Tab Switch Count,Auto Submitted,Date\n";
    const rows = buildExportRows(filteredResults).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadXLSX = () => {
    const rows = filteredResults.map((r, idx) => ({
      Rank: idx + 1,
      Name: r.name,
      "Roll Number": r.rollNumber,
      "Time Taken (mm:ss)": formatTime(r.timeTaken),
      "Time Taken (seconds)": r.timeTaken,
      Score: r.score,
      Total: r.total,
      "Tab Switch Count": r.tabSwitchCount ?? 0,
      "Auto Submitted": (r.autoSubmitted ?? false) ? "Yes" : "No",
      Date: r.date,
    }));
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Results");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz_results.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md shadow-xl border-2 border-border/70">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (admin)"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (Admin@1)"
              />
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
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-foreground">Quiz Results Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              disabled={filteredResults.length === 0}
              onClick={() => setConfirmExportType("csv")}
            >
              Download CSV
            </Button>
            <Button
              disabled={filteredResults.length === 0}
              onClick={() => setConfirmExportType("xlsx")}
            >
              Download Excel
            </Button>
          </div>
        </div>

        <AlertDialog open={confirmExportType !== null} onOpenChange={(open) => !open && setConfirmExportType(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Export results?</AlertDialogTitle>
              <AlertDialogDescription>
                This will download all participant records currently visible in the table, sorted by rank.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (confirmExportType === "csv") downloadCSV();
                  if (confirmExportType === "xlsx") downloadXLSX();
                  setConfirmExportType(null);
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {rankedResults.length === 0 ? (
          <p className="text-muted-foreground">No results yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Least Tab Switch</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">{leastTabSwitchResults[0].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {leastTabSwitchResults[0].tabSwitchCount ?? 0} switches • {leastTabSwitchResults[0].score}/{leastTabSwitchResults[0].total}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border border-border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  placeholder="Search by name or roll number"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min={0}
                    max={30}
                    value={scoreMin}
                    onChange={(e) => setScoreMin(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Min score"
                  />
                  <Input
                    type="number"
                    min={0}
                    max={30}
                    value={scoreMax}
                    onChange={(e) => setScoreMax(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Max score"
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min={0}
                    value={tabMin}
                    onChange={(e) => setTabMin(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Min tab switch"
                  />
                  <Input
                    type="number"
                    min={0}
                    value={tabMax}
                    onChange={(e) => setTabMax(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Max tab switch"
                  />
                </div>
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={autoFilter}
                  onChange={(e) => setAutoFilter(e.target.value as "all" | "yes" | "no")}
                >
                  <option value="all">All attempts</option>
                  <option value="yes">Auto-submitted only</option>
                  <option value="no">Manual submit only</option>
                </select>
              </div>
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
                  {filteredResults.map((r, i) => (
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
