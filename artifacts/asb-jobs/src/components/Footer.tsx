import { Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/asb-icon.png" alt="APEX" className="h-10 w-10 object-contain" />
              <div className="leading-tight">
                <div className="font-bold text-base tracking-wide">APEX</div>
                <div className="text-xs text-gray-400 tracking-widest">SCHOOL OF BUSINESS</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Learn practical business skills, automation systems and execution frameworks that turn you into an industry-ready professional.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href="https://www.linkedin.com/company/apexschoolof-business/" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:business@theapexschoolofbusiness.com"
                className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links — Support only */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white">Quick Links</h4>
            <a href="https://apexschoolofbusiness.com/Support/"
              className="text-gray-400 hover:text-white text-sm transition">
              Support
            </a>
          </div>

          {/* Get Started */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white">Get Started</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ready to launch your career in the AI-driven business world?
            </p>
            <a
              href="https://apexschoolofbusiness.com/form/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B31F5] hover:bg-[#5B21DC] text-white font-semibold rounded-lg transition text-sm w-fit"
            >
              Enroll Now ↗
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#6B31F5] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-medium">Phone</div>
                  <a href="tel:+917410148196" className="text-gray-400 text-sm hover:text-[#6B31F5] transition">+91 7410148196</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#6B31F5] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-medium">Email</div>
                  <a href="mailto:business@theapexschoolofbusiness.com" className="text-gray-400 text-sm hover:text-[#6B31F5] transition">business@theapexschoolofbusiness.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#6B31F5] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-medium">Address</div>
                  <div className="text-gray-400 text-sm">Rainmakers Workspace, J.P Nagar, 3rd Phase, Bangalore, Karnataka India 560078</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <div>
            <div>© 2026 Apex School of Business</div>
            <div>Owned by Hubcredo Solutions Private Limited</div>
          </div>
          <div className="flex items-center gap-4">
            
            
            
            <a href="https://apexschoolofbusiness.com/Support/" className="hover:text-gray-300 transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
