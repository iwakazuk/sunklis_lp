interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const rawPercentage = total > 0 ? (current / total) * 100 : 0;
  const percentage = Math.min(100, Math.max(0, rawPercentage));

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 py-2.5 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="flex-1 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[var(--accent-soft)] to-[var(--accent)] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
          質問 {current} / {total}
        </span>
      </div>
    </div>
  );
}
