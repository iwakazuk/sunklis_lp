import type { CSSProperties, ReactNode } from 'react';
import AdvisorIcon from './AdvisorIcon';

interface AdvisorMessageProps {
  children: ReactNode;
  className?: string;
  bubbleClassName?: string;
  hideAvatar?: boolean;
  style?: CSSProperties;
}

interface UserMessageProps {
  children: ReactNode;
  className?: string;
  bubbleClassName?: string;
  style?: CSSProperties;
}

function AdvisorAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center flex-shrink-0 shadow-sm">
      <AdvisorIcon className="w-5 h-5" />
    </div>
  );
}

export function AdvisorMessage({
  children,
  className = '',
  bubbleClassName = '',
  hideAvatar = false,
  style,
}: AdvisorMessageProps) {
  return (
    <div className={`flex items-end gap-2 ${className}`} style={style}>
      {hideAvatar ? <div className="w-8 h-8 flex-shrink-0"></div> : <AdvisorAvatar />}
      <div className={`bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm ${bubbleClassName}`}>
        {children}
      </div>
    </div>
  );
}

export function UserMessage({
  children,
  className = '',
  bubbleClassName = '',
  style,
}: UserMessageProps) {
  return (
    <div className={`flex justify-end ${className}`} style={style}>
      <div className={`bg-[var(--accent)] text-white rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%] shadow-sm ${bubbleClassName}`}>
        {children}
      </div>
    </div>
  );
}
