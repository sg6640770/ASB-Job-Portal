import { MapPin, Clock, ArrowRight } from 'lucide-react';
import type { Job } from '@/lib/supabase';
import {
  getRoleCategory,
  getWorkMode,
  getRelativeDate,
  getCompanyAvatarColor,
  getCompanyInitials,
} from '@/data/jobData';

export default function JobCard({ job }: { job: Job }) {
  const roleCategory = getRoleCategory(job.job_title);
  const workMode = getWorkMode(job.job_title, job.location);
  const dateLabel = getRelativeDate(job.date_posted);
  const avatarColor = getCompanyAvatarColor(job.company_name || '');
  const initials = getCompanyInitials(job.company_name || '');
  const seniority = job.seniority_level && job.seniority_level.trim() !== '' ? job.seniority_level : 'Not Specified';
  const employmentType = job.employment_type && job.employment_type.trim() !== '' ? job.employment_type : 'Not Specified';

  const truncatedLocation =
    job.location && job.location.length > 35 ? job.location.slice(0, 35) + '…' : job.location;

  const workModeColors: Record<string, string> = {
    Remote: 'bg-green-100 text-green-800',
    Hybrid: 'bg-blue-100 text-blue-800',
    Onsite: 'bg-gray-100 text-gray-700',
  };

  return (
    <article className="bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition border border-[#E2E8F0]">
      <div className="flex gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-[#1E3A5F] leading-snug break-words">
                {job.job_title}
              </h3>
              <p className="text-sm text-[#64748B] mt-0.5">{job.company_name}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                <Badge className="bg-[#1E3A5F] text-white">{roleCategory}</Badge>
                <Badge className="bg-gray-100 text-gray-700">{seniority}</Badge>
                <Badge className={workModeColors[workMode]}>{workMode}</Badge>
                <Badge className="bg-purple-100 text-purple-800">{employmentType}</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-[#64748B]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {truncatedLocation || 'Not specified'}
                </span>
                {dateLabel && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {dateLabel}
                  </span>
                )}
                <span className="italic text-[#94A3B8]">via LinkedIn</span>
              </div>
            </div>

            <a
              href={job.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA670C] text-white font-medium rounded-lg text-sm transition whitespace-nowrap"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Badge({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
