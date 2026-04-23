type Props = { jobCount: number };

export default function Navbar({ jobCount }: Props) {
  return (
    <nav className="sticky top-0 z-30 bg-white shadow-sm border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1E3A5F]">ASB</span>
            <span className="text-xl font-semibold text-[#F97316]">Job Portal</span>
          </div>
          <span className="text-xs text-[#64748B] hidden sm:block">
            Apex School of Business
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3A5F] text-white text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            {jobCount} Live Jobs
          </span>
        </div>
      </div>
    </nav>
  );
}
