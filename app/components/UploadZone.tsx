"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
  selectedFileName: string | null;
}

const ACCEPTED_TYPES = ["application/pdf"];
const MAX_SIZE_MB = 20;

function UploadZone({
  onFileSelect,
  disabled,
  selectedFileName,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateAndEmit = useCallback(
    (file: File) => {
      setLocalError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setLocalError("Only PDF files are supported.");
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setLocalError(`File too large. Maximum size is ${MAX_SIZE_MB} MB.`);
        return;
      }

      onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) validateAndEmit(file);
    },
    [validateAndEmit],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) validateAndEmit(file);
    },
    [validateAndEmit],
  );

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload PDF research paper"
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={clsx(
          "relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer",
          "flex flex-col items-center justify-center gap-4 p-10 text-center",
          isDragging
            ? "border-accent bg-accent/10 scale-[1.01] glow-accent"
            : selectedFileName
              ? "border-accent/40 bg-accent/5"
              : "border-uploadzone-border",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <div
          className={clsx(
            "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300",
            isDragging ? "bg-accent/20 scale-110" : "bg-accent-dark-grey",
          )}
        >
          <PdfIcon className={clsx("w-8 h-8 transition-colors duration-300")} />
        </div>

        {selectedFileName ? (
          <div className="space-y-1">
            <p className="text-sm md:text-lg font-semibold text-accent">
              {selectedFileName}
            </p>
            <p className="text-xs md:text-sm text-text-muted">Click or drag to replace</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm md:text-lg font-medium">
              {isDragging
                ? "Drop your paper here"
                : "Drop PDF here or click to browse"}
            </p>
            <p className="text-xs md:text-sm text-text-muted">
              Supports research papers up to {MAX_SIZE_MB} MB
            </p>
          </div>
        )}

        <input
          type="file"
          ref={inputRef}
          disabled={disabled}
          accept=".pdf,application/pdf"
          className="sr-only"
          onChange={handleChange}
        />

        {localError && (
          <p className="mt-2 text-sm text-red-400 text-center animate-fade-in">
            {localError}
          </p>
        )}
      </div>
    </div>
  );
}

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

export default UploadZone;
