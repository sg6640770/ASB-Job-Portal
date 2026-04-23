export default function JobSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-5 shadow-sm border border-[#E2E8F0] animate-pulse"
        >
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-200" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-3 w-1/3 bg-gray-200 rounded" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded-full" />
                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                <div className="h-5 w-14 bg-gray-200 rounded-full" />
              </div>
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
