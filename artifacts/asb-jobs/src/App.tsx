import { useEffect, useMemo, useState } from 'react';
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
import { useJobs } from '@/hooks/useJobs';
import {
  getDaysSince,
  getRoleCategory,
  getWorkMode,
} from '@/data/jobData';
import { SlidersHorizontal, X } from 'lucide-react';

type SortKey = 'newest' | 'oldest' | 'company';

function App() {
  const { jobs, loading, error, refetch } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>('newest');
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const seniorityOptions = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) {
      const v = j.seniority_level && j.seniority_level.trim() !== '' ? j.seniority_level : 'Not Specified';
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
        const s = j.seniority_level && j.seniority_level.trim() !== '' ? j.seniority_level : 'Not Specified';
        if (!filters.seniorityLevels.includes(s)) return false;
      }

      if (filters.workMode !== 'All') {
        const wm = getWorkMode(j.job_title, j.location);
        if (wm !== filters.workMode) return false;
      }

      if (filters.employmentType !== 'All') {
        if ((j.employment_type || '').toLowerCase() !== filters.employmentType.toLowerCase()) return false;
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

  // Reset to page 1 when filter/search/sort changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters, sort]);

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

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans text-[#0F172A]">
      <Navbar jobCount={jobs.length} />
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        jobCount={jobs.length}
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

      <Footer />
    </div>
  );
}

export default App;
