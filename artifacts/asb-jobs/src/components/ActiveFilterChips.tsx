import { X } from 'lucide-react';

export type Chip = { key: string; label: string; onRemove: () => void };

type Props = { chips: Chip[]; onClearAll: () => void };

export default function ActiveFilterChips({ chips, onClearAll }: Props) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316] hover:bg-[#EA670C] text-white text-xs font-medium transition"
        >
          <span>{chip.label}</span>
          <X className="w-3 h-3" />
        </button>
      ))}
      {chips.length >= 2 && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-[#1E3A5F] underline hover:text-[#F97316]"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
