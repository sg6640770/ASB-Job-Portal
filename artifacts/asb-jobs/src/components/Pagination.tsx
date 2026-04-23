import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  pageSize: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  pageSize,
}: Props) {
  if (totalPages <= 1) {
    return (
      <div className="text-sm text-[#64748B] text-center py-4">
        Showing {totalCount === 0 ? 0 : 1}–{totalCount} of {totalCount} jobs
      </div>
    );
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`e-${i}`} className="px-2 text-[#64748B] text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p as number)}
              className={`min-w-[36px] px-2 py-1.5 text-sm rounded-md border transition ${
                p === currentPage
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                  : 'border-[#E2E8F0] text-[#0F172A] hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="text-sm text-[#64748B]">
        Showing {start}–{end} of {totalCount} jobs
      </div>
    </div>
  );
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [];
  pages.push(1);
  let left = Math.max(2, current - 1);
  let right = Math.min(total - 1, current + 1);
  if (current <= 3) {
    left = 2;
    right = 4;
  }
  if (current >= total - 2) {
    left = total - 3;
    right = total - 1;
  }
  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  pages.push(total);
  return pages;
}
