"use client";

import { useCallback, useState } from "react";
import Footer from "./components/Footer";
import UploadZone from "./components/UploadZone";
import { AppState } from "./types";
import clsx from "clsx";
import { analyzePaper, ApiError } from "./lib/api";
import { Skeleton } from "./components/Skeleton";
import ErrorView from "./components/ErrorView";
import ResultsView from "./components/ResultsView";

const initialState: AppState = {
  status: "idle",
  result: null,
  error: null,
  fileName: null,
};

export default function Home() {
  const [state, setState] = useState<AppState>(initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isLoading =
    state.status === "uploading" || state.status === "analyzing";

  const canAnalyze = selectedFile !== null && state.status === "idle";

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setState((s) => ({
      ...s,
      status: "idle",
      result: null,
      error: null,
      fileName: file.name,
    }));
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;

    setState((s) => ({ ...s, status: "uploading", result: null, error: null }));
    await new Promise((resolve) => setTimeout(resolve, 600));
    setState((s) => ({ ...s, status: "analyzing" }));

    try {
      const result = await analyzePaper(selectedFile);
      setState((s) => ({ ...s, status: "success", result }));
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setState((s) => ({ ...s, status: "error", error: errorMessage }));
    }
  }, [selectedFile]);

  const handleResetState = () => {
    setState(initialState);
    setSelectedFile(null);
  };

  const handleDismissError = () => {
    setState((s) => ({ ...s, status: "idle", error: null }));
  };

  return (
    <>
      <div className="flex-1">
        <header className="max-w-7xl mx-auto px-2 md:px-5 border-b border-accent-dark-grey">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="font-semibold tracking-tight text-md">
                AI Research Copilot
              </span>
              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-zinc-300 text-black font-semibold">
                BETA
              </span>
            </div>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
          {state.status !== "success" && !isLoading && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-2 bg-neutral-950 border border-accent-dark-grey text-xs font-medium mb-2">
                <span className="w-2 h-2 rounded-full text-sm bg-emerald-400 animate-pulse" />
                Powered by GPT-4
              </div>

              <h1 className="mt-5 md:mt-2 font-semibold text-2xl md:text-4xl">
                Understand research papers
                <br />
                <span className="text-accent">in seconds.</span>
              </h1>
              <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Upload any PDF and get a structured breakdown —
                summary, key findings, and actionable insights.
              </p>
            </div>
          )}

          {state.status !== "success" && !isLoading && (
            <div className="space-y-4 animate-slide-up">
              <UploadZone
                onFileSelect={handleFileSelect}
                disabled={isLoading}
                selectedFileName={selectedFile?.name}
              />
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className={clsx(
                  "w-full h-14 rounded-2xl text-base font-medium transition-all duration-200",
                  "flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",

                  canAnalyze
                    ? "bg-accent text-white hover:bg-accent/90 active:scale-[0.98] shadow-[0_0_20px_rgba(99,102,241,0.2)] cursor-pointer"
                    : "bg-neutral-900 text-neutral-500 border border-neutral-800 opacity-50 cursor-not-allowed",
                )}
              >
                <svg
                  className={clsx(
                    "w-5 h-5",
                    canAnalyze
                      ? "text-white animate-pulse"
                      : "text-neutral-500",
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
                Analyze Paper
              </button>
            </div>
          )}

          {isLoading && <Skeleton />}

          {state.status === "error" && state.error && (
            <ErrorView handleClose={handleDismissError} message={state.error} />
          )}

          {state.status === "success" && state.result && (
            <div className="space-y-4">
              <ResultsView result={state.result} fileName={state.fileName} />
              <button
                onClick={handleResetState}
                className={clsx(
                  "bg-neutral-950 text-neutral-500 border border-neutral-900 hover:bg-neutral-900 hover:text-text-secondary cursor-pointer",
                  "w-full h-14 rounded-2xl text-base font-medium",
                  "flex items-center justify-center gap-2",
                  "transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:bg-neutral-900 focus-visible:text-text-secondary",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 animate-pulse"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                New Analyze
              </button>
            </div>
          )}

          {state.status === "idle" && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 animate-slide-up stagger-3">
              {[
                {
                  id: 1,
                  icon: "📄",
                  title: "PDF Extraction",
                  desc: "Advanced text extraction preserving document structure",
                },
                {
                  id: 2,
                  icon: "🧠",
                  title: "LLM Analysis",
                  desc: "GPT-4 powered understanding of complex academic language",
                },
                {
                  id: 3,
                  icon: "⚡",
                  title: "Instant Results",
                  desc: "Structured insights in seconds, not hours",
                },
              ].map((f) => (
                <div
                  key={f.id}
                  className="rounded-2xl bg-accent-dark-grey p-4 flex items-start gap-3"
                >
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <p className="text-sm md:text-base font-semibold mb-1">{f.title}</p>
                    <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
