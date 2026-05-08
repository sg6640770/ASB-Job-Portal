import { useEffect, useRef, useState } from 'react';
import type { Job } from '@/lib/supabase';
import JobCard from './JobCard';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

type SortKey = 'newest' | 'oldest' | 'company';
type ListingType = 'all' | 'jobs' | 'internships';

type Props = {
  jobs: Job[];
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  onClearFilters: () => void;
};

function filterByType(jobs: Job[], type: ListingType): Job[] {
  if (type === 'internships') {
    return jobs.filter((j) =>
      (j.employment_type ?? '').toLowerCase().includes('intern'),
    );
  }
  if (type === 'jobs') {
    return jobs.filter(
      (j) => !(j.employment_type ?? '').toLowerCase().includes('intern'),
    );
  }
  return jobs;
}

const TABS: { key: ListingType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'internships', label: 'Internships' },
];

export default function JobList({
  jobs,
  page,
  pageSize,
  onPageChange,
  sort,
  onSortChange,
  onClearFilters,
}: Props) {
  const [listingType, setListingType] = useState<ListingType>('all');

  const filtered = filterByType(jobs, listingType);
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [safePage]);

  useEffect(() => {
    onPageChange(1);
  }, [listingType]);

  return (
    <div ref={topRef}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-lg font-bold text-[#0F172A]">
            {totalCount}{' '}
            <span className="text-[#6B31F5]">
              {totalCount === 1
                ? listingType === 'internships'
                  ? 'internship'
                  : 'job'
                : listingType === 'internships'
                  ? 'internships'
                  : 'jobs'}
            </span>{' '}
            found
          </h2>

          <div className="flex items-center bg-[#F3F0FF] rounded-lg p-0.5 gap-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setListingType(tab.key)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  listingType === tab.key
                    ? 'bg-[#6B31F5] text-white shadow-sm'
                    : 'text-[#6B31F5] hover:bg-[#EDE9FE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-md text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B31F5]/20"
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
