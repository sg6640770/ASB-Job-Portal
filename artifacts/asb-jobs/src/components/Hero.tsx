import { Search, Target } from 'lucide-react';

type Props = {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  jobCount: number;
  onOpenResumeModal: () => void;
};

export default function Hero({
  searchQuery,
  onSearchChange,
  jobCount,
  onOpenResumeModal,
}: Props) {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-[#E2E8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight text-[#0F172A]">
          Find Your Business Career
        </h1>
        <p className="text-base sm:text-lg text-[#64748B] mb-8">
          SDR, BDR, Account Executive &amp; more - curated for Apex students
        </p>

        <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl p-2 shadow-md border border-[#E2E8F0]">
          <div className="flex items-center flex-1 px-3">
            <Search className="w-5 h-5 text-[#64748B] flex-shrink-0" />
            <input
              type="search"
              placeholder="Search by job title, company, or location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2.5 text-[#0F172A] placeholder-[#64748B] outline-none bg-transparent"
            />
          </div>
          <button
            type="button"
            className="px-6 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium rounded-lg transition"
          >
            Search
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="button"
            onClick={onOpenResumeModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#6B31F5] hover:bg-[#5B21DC] text-white font-semibold rounded-lg shadow transition"
          >
            <Target className="w-5 h-5 text-white/80" />
            <span>🎯 Get Resume-Based Jobs</span>
          </button>
          <span className="text-[#64748B] text-sm">
            Upload your resume to get matched with the best-fit roles instantly
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <StatPill label={`${jobCount} Jobs Live`} />
          <StatPill label="India-wide" />
          <StatPill label="Updated Daily" />
        </div>
      </div>
    </section>
  );
}

function StatPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1F5F9] text-[#0F172A] text-sm border border-[#E2E8F0]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#6B31F5]" />
      {label}
    </span>
  );
}
