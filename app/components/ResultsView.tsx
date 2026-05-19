import { formatFileName } from "../lib/formatters";
import ResultCard from "./ResultCard";
import { BookIcon, LightbulbIcon, ListIcon } from "./Icons";
import { AnalysisResult } from "../types";

interface ResultsViewProps {
  result: AnalysisResult;
  fileName: string;
}

function ResultsView({ result, fileName }: ResultsViewProps) {
  return (
    <div className="w-full space-y-4">
      {fileName && (
        <div className="animate-slide-up anim-delay-1 flex items-center gap-3 mb-6">
          <span className="bg-accent/10 px-3 py-1 text-xs text-accent font-medium rounded-full cursor-pointer">
            {formatFileName(fileName)}
          </span>
          <div className="bg-accent-dark-grey h-px flex-1"></div>
          <span className="text-xs text-text-muted">Analysis complete</span>
        </div>
      )}

      {/* Summary */}
      <section className="animate-slide-up anim-delay-2">
        <ResultCard icon={<BookIcon />} label="summary" accenntColor="indigo">
          <p className="text-sm text-text-secondary leading-6">
            {result.summary}
          </p>
        </ResultCard>
      </section>

      {/* Key Points */}
      <section className="animate-slide-up anim-delay-3">
        <ResultCard
          icon={<ListIcon />}
          label="key points"
          count={result.key_points.length}
          accenntColor="violet"
        >
          <ul className="flex flex-col gap-3">
            {result.key_points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-md bg-violet-500/10 border border-violet-500/20 text-[10px] text-violet-300 font-semibold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-sm text-text-secondary leading-6">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </ResultCard>
      </section>

      {/* Insights */}
      <section className="animate-slide-up anim-delay-4">
        <ResultCard
          icon={<LightbulbIcon />}
          label="insights"
          count={result.insights.length}
          accenntColor="amber"
        >
          <ul className="flex flex-col gap-3">
            {result.insights.map((insight, index) => (
              <li key={index} className="flex itema-start gap-3">
                <span className="mt-1 text-amber-400 flex-shrink-0">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                </span>
                <span className="text-sm text-text-secondary leading-6">
                  {insight}
                </span>
              </li>
            ))}
          </ul>
        </ResultCard>
      </section>
    </div>
  );
}

export default ResultsView;
