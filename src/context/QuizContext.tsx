import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { questions as quizQuestions } from "@/data/questions";

interface Participant {
  name: string;
  rollNumber: string;
}

interface QuizState {
  participant: Participant | null;
  answers: Record<number, string>;
  currentQuestion: number;
  timeRemaining: number; // seconds
  quizStarted: boolean;
  quizSubmitted: boolean;
  score: number | null;
  startTime: number | null;
  tabSwitchCount: number;
  submissionReason: "manual" | "timeout" | "tabSwitch" | null;
}

interface QuizContextType extends QuizState {
  setParticipant: (p: Participant) => void;
  setAnswer: (questionIndex: number, answer: string) => void;
  setCurrentQuestion: (index: number) => void;
  startQuiz: () => void;
  submitQuiz: (opts?: { reason?: "manual" | "timeout" | "tabSwitch" }) => void;
  registerTabSwitch: () => number;
  timeRemaining: number;
}

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [submissionReason, setSubmissionReason] = useState<"manual" | "timeout" | "tabSwitch" | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabSwitchCountRef = useRef(0);

  const setAnswer = useCallback((questionIndex: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  }, []);

  const startQuiz = useCallback(() => {
    setQuizStarted(true);
    setStartTime(Date.now());
    setTimeRemaining(30 * 60);
    setTabSwitchCount(0);
    tabSwitchCountRef.current = 0;
    setSubmissionReason(null);
    sessionStorage.removeItem("quizTabSwitchCount");
    sessionStorage.removeItem("quizSubmissionReason");
  }, []);

  const submitQuiz = useCallback((opts?: { reason?: "manual" | "timeout" | "tabSwitch" }) => {
    if (quizSubmitted) return;
    const reason = opts?.reason ?? "manual";
    setQuizSubmitted(true);
    setSubmissionReason(reason);
    sessionStorage.setItem("quizSubmissionReason", reason);
    if (timerRef.current) clearInterval(timerRef.current);

    let correct = 0;
    quizQuestions.forEach((q, i) => {
      const userAnswer = answers[i]?.trim().toLowerCase() || "";
      if (userAnswer === q.correctAnswer.trim().toLowerCase()) correct++;
    });
    setScore(correct);

    // Save to localStorage for admin
    const timeTaken = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    const result = {
      name: participant?.name || "",
      rollNumber: participant?.rollNumber || "",
      timeTaken,
      score: correct,
      total: quizQuestions.length,
      date: new Date().toISOString(),
      tabSwitchCount: tabSwitchCountRef.current,
      autoSubmitted: reason !== "manual",
      submissionReason: reason,
    };
    const existing = JSON.parse(localStorage.getItem("quizResults") || "[]");
    existing.push(result);
    localStorage.setItem("quizResults", JSON.stringify(existing));
    sessionStorage.removeItem("quizTabSwitchCount");
  }, [quizSubmitted, answers, startTime, participant]);

  const registerTabSwitch = useCallback(() => {
    tabSwitchCountRef.current += 1;
    setTabSwitchCount(tabSwitchCountRef.current);
    sessionStorage.setItem("quizTabSwitchCount", String(tabSwitchCountRef.current));
    return tabSwitchCountRef.current;
  }, []);

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto-submit
            submitQuiz({ reason: "timeout" });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [quizStarted, quizSubmitted, submitQuiz]);

  // Prevent page refresh during quiz
  useEffect(() => {
    if (quizStarted && !quizSubmitted) {
      const handler = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
      };
      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
    }
  }, [quizStarted, quizSubmitted]);

  return (
    <QuizContext.Provider
      value={{
        participant,
        answers,
        currentQuestion,
        timeRemaining,
        quizStarted,
        quizSubmitted,
        score,
        startTime,
        tabSwitchCount,
        submissionReason,
        setParticipant,
        setAnswer,
        setCurrentQuestion,
        startQuiz,
        submitQuiz,
        registerTabSwitch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
