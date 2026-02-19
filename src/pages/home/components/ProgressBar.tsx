
interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 py-2.5 sticky top-0 z-10">
      <div className="mb-1.5 text-right">
        <span className="text-xs font-medium text-gray-500">
          質問 {current} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[var(--accent-soft)] to-[var(--accent)] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
