type Props = { onClear: () => void };

export default function EmptyState({ onClear }: Props) {
  return (
    <div className="bg-white rounded-xl p-12 text-center border border-[#E2E8F0]">
      <svg
        className="mx-auto mb-4"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <h3 className="text-lg font-semibold text-[#0F172A] mb-1">No jobs match your filters</h3>
      <p className="text-sm text-[#64748B] mb-6">
        Try adjusting your search or clearing some filters
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center px-5 py-2 bg-[#F97316] hover:bg-[#EA670C] text-white font-medium rounded-md text-sm transition"
      >
        Clear All Filters
      </button>
    </div>
  );
}
