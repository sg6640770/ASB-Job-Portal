import { useCallback, useEffect, useRef, useState } from 'react';
import { X, UploadCloud, FileText, Loader2 } from 'lucide-react';

const WEBHOOK_URL =
  'https://shreyahubcredo.app.n8n.cloud/webhook-test/get-resume-based-filtering';
const TIMEOUT_MS = 30000;

type Props = {
  open: boolean;
  onClose: () => void;
  onMatched: (rawResponse: unknown) => void;
};

export default function ResumeUploadModal({ open, onClose, onMatched }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setError(null);
      setIsUploading(false);
      setIsDragging(false);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isUploading) onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, isUploading, onClose]);

  const setSelectedFile = useCallback((f: File | null) => {
    if (!f) return;
    const isPdf =
      f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setError('Please upload a PDF file only');
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setSelectedFile(dropped);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      let data: unknown = null;
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : [];
      } catch {
        data = text;
      }

      onMatched(data);
      onClose();
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Analysis is taking longer than expected. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      setIsUploading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
        onClick={() => !isUploading && onClose()}
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-5 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1E3A5F]">
              Find Jobs Matching Your Resume
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Upload your resume and we'll match you with the best jobs
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className="p-1.5 rounded-md text-[#64748B] hover:bg-gray-100 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="w-10 h-10 text-[#F97316] animate-spin mb-4" />
              <p className="text-[#0F172A] font-medium">
                Analyzing your resume &amp; finding matches...
              </p>
              <p className="text-sm text-[#64748B] mt-2">
                This may take up to 30 seconds.
              </p>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition ${
                  isDragging
                    ? 'border-[#F97316] bg-orange-50'
                    : 'border-[#E2E8F0] hover:border-[#1E3A5F] hover:bg-[#F1F5F9]'
                }`}
              >
                {file ? (
                  <>
                    <FileText className="w-10 h-10 text-[#1E3A5F] mb-2" />
                    <p className="text-sm font-medium text-[#0F172A] break-all">
                      {file.name}
                    </p>
                    <p className="text-xs text-[#64748B] mt-1">
                      {(file.size / 1024).toFixed(1)} KB · Click to change
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-[#64748B] mb-2" />
                    <p className="text-sm font-medium text-[#0F172A]">
                      Drag &amp; drop your resume here or click to browse
                    </p>
                    <p className="text-xs text-[#64748B] mt-1">PDF only</p>
                  </>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                />
              </button>

              {error && (
                <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!file}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#F97316] hover:bg-[#EA670C] text-white font-semibold rounded-lg transition disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] disabled:cursor-not-allowed"
              >
                <span>🔍 Get Matched Jobs</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
