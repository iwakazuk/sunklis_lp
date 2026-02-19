
import { useState, useEffect } from 'react';
import AdvisorIcon from './AdvisorIcon';

interface ChatBubbleProps {
  type: 'advisor' | 'user';
  children: React.ReactNode;
  delay?: number;
  showTyping?: boolean;
}

export default function ChatBubble({ type, children, delay = 0, showTyping = false }: ChatBubbleProps) {
  const [visible, setVisible] = useState(delay === 0 && !showTyping);
  const [typing, setTyping] = useState(showTyping);

  useEffect(() => {
    if (showTyping) {
      const typingTimer = setTimeout(() => {
        setTyping(false);
        setVisible(true);
      }, delay || 800);
      return () => clearTimeout(typingTimer);
    }
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay, showTyping]);

  if (typing) {
    return (
      <div className="flex items-end gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <AdvisorIcon className="w-5 h-5" />
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <div className="flex gap-1.5">
            <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-typingDots inline-block"></span>
            <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-typingDots inline-block"></span>
            <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-typingDots inline-block"></span>
          </div>
        </div>
      </div>
    );
  }

  if (!visible) return null;

  if (type === 'advisor') {
    return (
      <div className="flex items-end gap-2 mb-3 animate-slideInLeft">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <AdvisorIcon className="w-5 h-5" />
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end mb-3 animate-slideInRight">
      <div className="bg-teal-500 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[85%] shadow-sm">
        {children}
      </div>
    </div>
  );
}
