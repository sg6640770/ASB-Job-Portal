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
    <section
      className="text-white py-12 sm:py-16"
      style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #2D5A8E 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          Find Your Business Career
        </h1>
        <p className="text-base sm:text-lg text-blue-100 mb-8">
          SDR, BDR, Account Executive &amp; more - curated for Apex students
        </p>

        <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl p-2 shadow-lg">
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
            className="px-6 py-2.5 bg-[#F97316] hover:bg-[#EA670C] text-white font-medium rounded-lg transition"
          >
            Search
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="button"
            onClick={onOpenResumeModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F2440] hover:bg-[#091A30] text-white font-semibold rounded-lg shadow-lg transition border border-white/10"
          >
            <Target className="w-5 h-5 text-[#F97316]" />
            <span> Get Resume-Based Jobs</span>
          </button>
          <span className="text-blue-100 text-sm">
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
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm border border-white/20">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
      {label}
    </span>
  );
}
