import { useEffect, useRef } from 'react';
import type { Job } from '@/lib/supabase';
import JobCard from './JobCard';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

type SortKey = 'newest' | 'oldest' | 'company';

type Props = {
  jobs: Job[];
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  onClearFilters: () => void;
};

export default function JobList({
  jobs,
  page,
  pageSize,
  onPageChange,
  sort,
  onSortChange,
  onClearFilters,
}: Props) {
  const totalCount = jobs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const visible = jobs.slice(start, start + pageSize);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [safePage]);

  return (
    <div ref={topRef}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold text-[#1E3A5F]">
          {totalCount} {totalCount === 1 ? 'job' : 'jobs'} found
        </h2>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-md text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="company">Company A–Z</option>
        </select>
      </div>

      {totalCount === 0 ? (
        <EmptyState onClear={onClearFilters} />
      ) : (
        <div className="space-y-3">
          {visible.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      )}

      {totalCount > 0 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalCount={totalCount}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
