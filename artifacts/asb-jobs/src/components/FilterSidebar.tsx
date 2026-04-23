import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ROLE_CATEGORIES } from '@/data/jobData';

export type FiltersState = {
  roleCategories: string[];
  seniorityLevels: string[];
  workMode: 'All' | 'Remote' | 'Hybrid' | 'Onsite';
  employmentType: 'All' | 'Full-time' | 'Internship' | 'Contract';
  datePosted: 'Any time' | 'Last 24 hours' | 'Last 7 days' | 'Last 30 days';
  locationQuery: string;
};

export const DEFAULT_FILTERS: FiltersState = {
  roleCategories: [],
  seniorityLevels: [],
  workMode: 'All',
  employmentType: 'All',
  datePosted: 'Any time',
  locationQuery: '',
};

type Props = {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
  seniorityOptions: string[];
  onClearAll: () => void;
};

export default function FilterSidebar({
  filters,
  onChange,
  seniorityOptions,
  onClearAll,
}: Props) {
  return (
    <aside className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-[#1E3A5F]">Filters</h2>
      </div>

      <Section title="Role Category">
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {ROLE_CATEGORIES.map((rc) => (
            <Checkbox
              key={rc}
              label={rc}
              checked={filters.roleCategories.includes(rc)}
              onChange={(checked) => {
                onChange({
                  ...filters,
                  roleCategories: checked
                    ? [...filters.roleCategories, rc]
                    : filters.roleCategories.filter((x) => x !== rc),
                });
              }}
            />
          ))}
        </div>
      </Section>

      <Section title="Seniority Level">
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {seniorityOptions.map((s) => (
            <Checkbox
              key={s}
              label={s}
              checked={filters.seniorityLevels.includes(s)}
              onChange={(checked) => {
                onChange({
                  ...filters,
                  seniorityLevels: checked
                    ? [...filters.seniorityLevels, s]
                    : filters.seniorityLevels.filter((x) => x !== s),
                });
              }}
            />
          ))}
        </div>
      </Section>

      <Section title="Work Mode">
        <div className="space-y-2">
          {(['All', 'Remote', 'Hybrid', 'Onsite'] as const).map((m) => (
            <Radio
              key={m}
              name="workMode"
              label={m}
              checked={filters.workMode === m}
              onChange={() => onChange({ ...filters, workMode: m })}
            />
          ))}
        </div>
      </Section>

      <Section title="Employment Type">
        <div className="space-y-2">
          {(['All', 'Full-time', 'Internship', 'Contract'] as const).map((m) => (
            <Radio
              key={m}
              name="employmentType"
              label={m}
              checked={filters.employmentType === m}
              onChange={() => onChange({ ...filters, employmentType: m })}
            />
          ))}
        </div>
      </Section>

      <Section title="Date Posted">
        <div className="space-y-2">
          {(['Any time', 'Last 24 hours', 'Last 7 days', 'Last 30 days'] as const).map((m) => (
            <Radio
              key={m}
              name="datePosted"
              label={m}
              checked={filters.datePosted === m}
              onChange={() => onChange({ ...filters, datePosted: m })}
            />
          ))}
        </div>
      </Section>

      <Section title="Location Search" defaultOpen>
        <input
          type="text"
          value={filters.locationQuery}
          onChange={(e) => onChange({ ...filters, locationQuery: e.target.value })}
          placeholder="e.g. Bengaluru, Mumbai..."
          className="w-full px-3 py-2 border border-[#E2E8F0] rounded-md text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
        />
      </Section>

      <button
        type="button"
        onClick={onClearAll}
        className="w-full mt-4 px-4 py-2 border-2 border-[#F97316] text-[#F97316] rounded-md text-sm font-medium hover:bg-[#F97316] hover:text-white transition"
      >
        Clear All Filters
      </button>
    </aside>
  );
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E2E8F0] py-3 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left text-sm font-semibold text-[#0F172A] mb-2"
      >
        <span>{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="mt-1">{children}</div>}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-[#0F172A] cursor-pointer hover:text-[#1E3A5F]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-[#E2E8F0] text-[#1E3A5F] focus:ring-[#1E3A5F]"
      />
      <span>{label}</span>
    </label>
  );
}

function Radio({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-[#0F172A] cursor-pointer hover:text-[#1E3A5F]">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 border-[#E2E8F0] text-[#1E3A5F] focus:ring-[#1E3A5F]"
      />
      <span>{label}</span>
    </label>
  );
}
