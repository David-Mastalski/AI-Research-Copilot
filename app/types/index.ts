export interface AnalysisResult {
  summary: string;
  key_points: string[];
  insights: string[];
}

export type AnalysisStatus =
  | "idle"
  | "uploading"
  | "analyzing"
  | "success"
  | "error";

export interface AppState {
  status: AnalysisStatus;
  result: AnalysisResult | null;
  error: null | string;
  fileName: null | string;
}
