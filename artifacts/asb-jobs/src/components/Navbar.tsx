type Props = { jobCount: number };

export default function Navbar({ jobCount }: Props) {
  return (
    <nav className="sticky top-0 z-30 bg-white shadow-sm border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/asb-icon.png"
            alt="Apex School of Business logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <div className="border-l border-[#D1D5DB] pl-3 leading-tight">
            <div className="text-lg sm:text-xl font-extrabold text-[#0A0A0A] tracking-wide">
              APEX
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-[#6B7280] tracking-widest uppercase">
              School of Business
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6B31F5] text-white text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {jobCount} Live Jobs
          </span>
        </div>
      </div>
    </nav>
  );
}
