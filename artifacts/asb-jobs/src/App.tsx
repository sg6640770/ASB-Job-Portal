import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import FilterSidebar, {
  DEFAULT_FILTERS,
  type FiltersState,
} from '@/components/FilterSidebar';
import JobList from '@/components/JobList';
import ActiveFilterChips, { type Chip } from '@/components/ActiveFilterChips';
import JobSkeleton from '@/components/JobSkeleton';
import ResumeUploadModal from '@/components/ResumeUploadModal';
import MatchedJobsSection, {
  type MatchedJob,
  type CandidateInfo,
} from '@/components/MatchedJobsSection';
import { useJobs } from '@/hooks/useJobs';
import {
  getDaysSince,
  getRoleCategory,
  getWorkMode,
} from '@/data/jobData';
import type { Job } from '@/lib/supabase';
import { SlidersHorizontal, X } from 'lucide-react';

type SortKey = 'newest' | 'oldest' | 'company';

function App() {
  const { jobs, loading, error, refetch } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>('newest');
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[] | null>(null);
  const [candidate, setCandidate] = useState<CandidateInfo | null>(null);
  const matchedRef = useRef<HTMLDivElement>(null);

  const seniorityOptions = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) {
      const v =
        j.seniority_level && j.seniority_level.trim() !== ''
          ? j.seniority_level
          : 'Not Specified';
      set.add(v);
    }
    return Array.from(set).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const locQ = filters.locationQuery.trim().toLowerCase();

    let out = jobs.filter((j) => {
      if (q) {
        const hay = `${j.job_title} ${j.company_name} ${j.location}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (filters.roleCategories.length > 0) {
        const cat = getRoleCategory(j.job_title);
        if (!filters.roleCategories.includes(cat)) return false;
      }

      if (filters.seniorityLevels.length > 0) {
        const s =
          j.seniority_level && j.seniority_level.trim() !== ''
            ? j.seniority_level
            : 'Not Specified';
        if (!filters.seniorityLevels.includes(s)) return false;
      }

      if (filters.workMode !== 'All') {
        const wm = getWorkMode(j.job_title, j.location);
        if (wm !== filters.workMode) return false;
      }

      if (filters.employmentType !== 'All') {
        if ((j.employment_type || '').toLowerCase() !== filters.employmentType.toLowerCase())
          return false;
      }

      if (filters.datePosted !== 'Any time') {
        const days = getDaysSince(j.date_posted);
        if (filters.datePosted === 'Last 24 hours' && days > 1) return false;
        if (filters.datePosted === 'Last 7 days' && days > 7) return false;
        if (filters.datePosted === 'Last 30 days' && days > 30) return false;
      }

      if (locQ) {
        if (!(j.location || '').toLowerCase().includes(locQ)) return false;
      }

      return true;
    });

    out = [...out].sort((a, b) => {
      if (sort === 'company') return (a.company_name || '').localeCompare(b.company_name || '');
      const ad = new Date(a.date_posted).getTime() || 0;
      const bd = new Date(b.date_posted).getTime() || 0;
      return sort === 'newest' ? bd - ad : ad - bd;
    });

    return out;
  }, [jobs, searchQuery, filters, sort]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters, sort]);

  useEffect(() => {
    if (matchedJobs && matchedRef.current) {
      matchedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [matchedJobs]);

  const chips: Chip[] = useMemo(() => {
    const c: Chip[] = [];
    filters.roleCategories.forEach((rc) =>
      c.push({
        key: `rc:${rc}`,
        label: `Role: ${rc}`,
        onRemove: () =>
          setFilters((f) => ({
            ...f,
            roleCategories: f.roleCategories.filter((x) => x !== rc),
          })),
      }),
    );
    filters.seniorityLevels.forEach((s) =>
      c.push({
        key: `sl:${s}`,
        label: `Level: ${s}`,
        onRemove: () =>
          setFilters((f) => ({
            ...f,
            seniorityLevels: f.seniorityLevels.filter((x) => x !== s),
          })),
      }),
    );
    if (filters.workMode !== 'All')
      c.push({
        key: 'wm',
        label: `Mode: ${filters.workMode}`,
        onRemove: () => setFilters((f) => ({ ...f, workMode: 'All' })),
      });
    if (filters.employmentType !== 'All')
      c.push({
        key: 'et',
        label: `Type: ${filters.employmentType}`,
        onRemove: () => setFilters((f) => ({ ...f, employmentType: 'All' })),
      });
    if (filters.datePosted !== 'Any time')
      c.push({
        key: 'dp',
        label: `Date: ${filters.datePosted}`,
        onRemove: () => setFilters((f) => ({ ...f, datePosted: 'Any time' })),
      });
    if (filters.locationQuery.trim() !== '')
      c.push({
        key: 'lq',
        label: `Location: ${filters.locationQuery}`,
        onRemove: () => setFilters((f) => ({ ...f, locationQuery: '' })),
      });
    if (searchQuery.trim() !== '')
      c.push({
        key: 'sq',
        label: `Search: ${searchQuery}`,
        onRemove: () => setSearchQuery(''),
      });
    return c;
  }, [filters, searchQuery]);

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery('');
  };

  const handleMatched = (raw: unknown) => {
    const { matches, candidate: cand } = normalizeMatches(raw, jobs);
    setMatchedJobs(matches);
    setCandidate(cand);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans text-[#0F172A]">
      <Navbar jobCount={jobs.length} />
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        jobCount={jobs.length}
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm">Failed to load jobs. Please try again.</span>
            <button
              type="button"
              onClick={refetch}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {matchedJobs && (
          <div ref={matchedRef}>
            <MatchedJobsSection
              matches={matchedJobs}
              candidate={candidate}
              onViewAll={() => {
                setMatchedJobs(null);
                setCandidate(null);
              }}
            />
          </div>
        )}

        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-sm font-medium text-[#1E3A5F] shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {chips.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#F97316] text-white rounded-full text-xs">
                {chips.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-20">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                seniorityOptions={seniorityOptions}
                onClearAll={clearAll}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <ActiveFilterChips chips={chips} onClearAll={clearAll} />
            {loading ? (
              <JobSkeleton />
            ) : (
              <JobList
                jobs={filteredJobs}
                page={page}
                pageSize={15}
                onPageChange={setPage}
                sort={sort}
                onSortChange={setSort}
                onClearFilters={clearAll}
              />
            )}
          </div>
        </div>
      </main>

      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-[85%] h-full bg-[#F1F5F9] overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1E3A5F]">Filters</h3>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-md hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              seniorityOptions={seniorityOptions}
              onClearAll={clearAll}
            />
          </div>
        </div>
      )}

      <ResumeUploadModal
        open={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onMatched={handleMatched}
      />

      <Footer />
    </div>
  );
}

function normalizeMatches(
  raw: unknown,
  allJobs: Job[],
): { matches: MatchedJob[]; candidate: CandidateInfo | null } {
  // Unwrap outer array (n8n often wraps payloads as [ { ... } ])
  let root: unknown = raw;
  if (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === 'object') {
    root = raw[0];
  }

  let arr: unknown[] = [];
  let candidate: CandidateInfo | null = null;

  if (Array.isArray(root)) {
    arr = root;
  } else if (root && typeof root === 'object') {
    const obj = root as Record<string, unknown>;
    if (Array.isArray(obj.matched_jobs)) arr = obj.matched_jobs as unknown[];
    else if (Array.isArray(obj.matches)) arr = obj.matches as unknown[];
    else if (Array.isArray(obj.jobs)) arr = obj.jobs as unknown[];
    else if (Array.isArray(obj.data)) arr = obj.data as unknown[];
    else if (Array.isArray(obj.results)) arr = obj.results as unknown[];

    if (obj.candidate && typeof obj.candidate === 'object') {
      const c = obj.candidate as Record<string, unknown>;
      candidate = {
        name: typeof c.name === 'string' ? c.name : undefined,
        email: typeof c.email === 'string' ? c.email : undefined,
        skills_count:
          typeof c.skills_count === 'number' ? c.skills_count : undefined,
        experience_years:
          typeof c.experience_years === 'number'
            ? c.experience_years
            : undefined,
        total_jobs_scanned:
          typeof obj.total_jobs_scanned === 'number'
            ? obj.total_jobs_scanned
            : undefined,
        matched_jobs_count:
          typeof obj.matched_jobs_count === 'number'
            ? obj.matched_jobs_count
            : undefined,
      };
    }
  }

  const byId = new Map(allJobs.map((j) => [String(j.job_id), j]));
  const seen = new Set<string>();

  const result: MatchedJob[] = [];
  for (const item of arr) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;

    const score = pickScore(o);

    const id =
      (o.job_id as string | undefined) ??
      (o.id as string | undefined) ??
      (o.jobId as string | undefined);

    const idKey = id != null ? String(id) : `match-${result.length}`;
    if (seen.has(idKey)) continue;
    seen.add(idKey);

    const existing = id != null ? byId.get(String(id)) : undefined;

    const job: Job = {
      job_id: idKey,
      job_title: String(o.job_title ?? o.title ?? existing?.job_title ?? ''),
      company_name: String(
        o.company_name ?? o.company ?? existing?.company_name ?? '',
      ),
      location: String(o.location ?? existing?.location ?? ''),
      date_posted: String(
        o.date_posted ?? existing?.date_posted ?? new Date().toISOString(),
      ),
      employment_type: String(
        o.employment_type ?? existing?.employment_type ?? '',
      ),
      apply_link: String(
        o.apply_link ?? o.url ?? existing?.apply_link ?? '#',
      ),
      seniority_level: String(
        o.seniority_level ?? existing?.seniority_level ?? '',
      ),
    };

    if (!job.job_title) continue;

    const matchingSkills = Array.isArray(o.matching_skills)
      ? (o.matching_skills as unknown[]).filter(
          (s): s is string => typeof s === 'string',
        )
      : undefined;

    result.push({
      ...job,
      match_score: score,
      match_reason:
        typeof o.match_reason === 'string' ? o.match_reason : undefined,
      matching_skills: matchingSkills,
    });
  }

  result.sort((a, b) => b.match_score - a.match_score);
  return { matches: result, candidate };
}

function pickScore(o: Record<string, unknown>): number {
  const candidates = [
    'match_score',
    'matchScore',
    'score',
    'match',
    'match_percentage',
    'matchPercentage',
    'percentage',
    'similarity',
  ];
  for (const k of candidates) {
    const v = o[k];
    if (typeof v === 'number') return v <= 1 ? v * 100 : v;
    if (typeof v === 'string' && v.trim() !== '') {
      const n = parseFloat(v.replace('%', ''));
      if (!Number.isNaN(n)) return n <= 1 ? n * 100 : n;
    }
  }
  return 0;
}

export default App;
