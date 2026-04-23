export default function Footer() {
  return (
    <footer className="bg-[#1E3A5F] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-center md:text-left">
        <div className="text-blue-100">© 2026 Apex School of Business</div>
        <div className="text-center text-white font-medium">Built for Apex Students</div>
        <div className="text-blue-100 md:text-right">
          Job data sourced from LinkedIn • Updated daily
        </div>
      </div>
    </footer>
  );
}
