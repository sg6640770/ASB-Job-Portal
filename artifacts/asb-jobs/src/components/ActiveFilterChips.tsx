import { X } from 'lucide-react';

export type Chip = { key: string; label: string; onRemove: () => void };

type Props = { chips: Chip[]; onClearAll: () => void };

export default function ActiveFilterChips({ chips, onClearAll }: Props) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {chips.map((chip) => (
        <button key={chip.key} type="button" onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B31F5]/10 border border-[#6B31F5]/20 hover:bg-[#6B31F5]/20 text-[#6B31F5] text-xs font-medium transition">
          <span>{chip.label}</span>
          <X className="w-3 h-3" />
        </button>
      ))}
      {chips.length >= 2 && (
        <button type="button" onClick={onClearAll} className="text-xs text-[#64748B] underline hover:text-[#0F172A]">
          Clear all
        </button>
      )}
    </div>
  );
}
