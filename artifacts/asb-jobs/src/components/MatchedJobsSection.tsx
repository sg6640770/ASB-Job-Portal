import type { Job } from '@/lib/supabase';
import JobCard from './JobCard';

export type MatchedJob = Job & {
  match_score: number;
  match_reason?: string;
  matching_skills?: string[];
};

export type CandidateInfo = {
  name?: string;
  email?: string;
  skills_count?: number;
  experience_years?: number;
  total_jobs_scanned?: number;
  matched_jobs_count?: number;
};

type Props = {
  matches: MatchedJob[];
  candidate: CandidateInfo | null;
  onViewAll: () => void;
};

function scoreColor(score: number): string {
  if (score >= 85) return 'bg-emerald-500';
  if (score >= 70) return 'bg-[#F97316]';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-slate-500';
}

export default function MatchedJobsSection({
  matches,
  candidate,
  onViewAll,
}: Props) {
  return (
    <section className="bg-gradient-to-br from-[#F1F5F9] to-white border-2 border-[#F97316]/30 rounded-2xl p-4 sm:p-6 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E3A5F]">
            ✨ Jobs Matched to Your Resume
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            {matches.length === 0
              ? 'No strong matches found. Try updating your resume with more relevant skills.'
              : `${matches.length} ${matches.length === 1 ? 'match' : 'matches'} sorted by relevance`}
          </p>

          {candidate && (
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {candidate.name && (
                <span className="px-2.5 py-1 rounded-full bg-[#1E3A5F] text-white font-medium">
                  {candidate.name}
                </span>
              )}
              {typeof candidate.experience_years === 'number' && (
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A]">
                  {candidate.experience_years} yr
                  {candidate.experience_years === 1 ? '' : 's'} experience
                </span>
              )}
              {typeof candidate.skills_count === 'number' && (
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A]">
                  {candidate.skills_count} skills detected
                </span>
              )}
              {typeof candidate.total_jobs_scanned === 'number' && (
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#64748B]">
                  Scanned {candidate.total_jobs_scanned} jobs
                </span>
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center justify-center px-4 py-2 bg-white border border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white rounded-md text-sm font-medium transition flex-shrink-0"
        >
          View All Jobs
        </button>
      </div>

      {matches.length > 0 && (
        <div className="space-y-4">
          {matches.map((job, idx) => (
            <div
              key={`${job.job_id}-${idx}`}
              className="relative bg-white rounded-lg"
            >
              <div
                className={`absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full ${scoreColor(
                  job.match_score,
                )} text-white text-xs font-bold shadow-md`}
              >
                {Math.round(job.match_score)}% Match
              </div>

              <JobCard job={job} />

              {(job.match_reason ||
                (job.matching_skills && job.matching_skills.length > 0)) && (
                <div className="px-4 sm:px-5 pb-4 -mt-2">
                  {job.match_reason && (
                    <p className="text-sm text-[#0F172A] bg-[#F1F5F9] border-l-4 border-[#F97316] rounded-r px-3 py-2 mb-2">
                      <span className="font-semibold text-[#1E3A5F]">
                        Why it matches:
                      </span>{' '}
                      {job.match_reason}
                    </p>
                  )}
                  {job.matching_skills && job.matching_skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-medium text-[#64748B] py-0.5">
                        Matching skills:
                      </span>
                      {job.matching_skills.slice(0, 8).map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200"
                        >
                          {s}
                        </span>
                      ))}
                      {job.matching_skills.length > 8 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                          +{job.matching_skills.length - 8} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
