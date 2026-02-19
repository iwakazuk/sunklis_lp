import { useState, useEffect, useRef } from 'react';
import type { DiagnosisAnswer, DiagnosisOption } from '../../../features/diagnosis/config';
import { AdvisorMessage, UserMessage } from './ChatMessage';

interface QuestionSectionProps {
  questionNumber: number;
  question: string;
  options: DiagnosisOption[];
  inputType?: 'buttons' | 'prefecture';
  prefectureOptions?: string[];
  onAnswer: (answer: DiagnosisAnswer) => void;
  previousMessages?: { question: string; answer: string }[];
  currentAnswer?: DiagnosisAnswer;
}

const ANSWER_TRANSITION_MS = 180;

export default function QuestionSection({
  questionNumber,
  question,
  options,
  inputType = 'buttons',
  prefectureOptions = [],
  onAnswer,
  previousMessages = [],
  currentAnswer,
}: QuestionSectionProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(currentAnswer?.id || null);
  const [selectedOptionLabel, setSelectedOptionLabel] = useState<string | null>(currentAnswer?.label || null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const fallbackPrefectureOption = options[0];
  const messageScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollMessagesToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (!messageScrollRef.current) return;
    messageScrollRef.current.scrollTo({
      top: messageScrollRef.current.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    setSelectedOptionId(currentAnswer?.id || null);
    setSelectedOptionLabel(currentAnswer?.label || null);
    setIsAnswering(false);
    if (inputType === 'prefecture' && currentAnswer && prefectureOptions.includes(currentAnswer.label)) {
      setSelectedPrefecture(currentAnswer.label);
      return;
    }
    setSelectedPrefecture('');
  }, [currentAnswer, inputType, prefectureOptions]);

  useEffect(() => {
    if (!selectedOptionId) return;
    scrollMessagesToBottom('smooth');
  }, [selectedOptionId]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      scrollMessagesToBottom('auto');
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleSelect = (answer: DiagnosisAnswer) => {
    if (isAnswering) return;
    setSelectedOptionId(answer.id);
    setSelectedOptionLabel(answer.label);
    setIsAnswering(true);
    setTimeout(() => onAnswer(answer), ANSWER_TRANSITION_MS);
  };

  const handlePrefectureSubmit = () => {
    if (!selectedPrefecture || isAnswering) return;
    handleSelect({
      id: `q5_prefecture_${selectedPrefecture}`,
      label: selectedPrefecture,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={messageScrollRef} className="flex-1 px-4 pt-4 pb-3 overflow-y-auto space-y-3">
        {/* 過去のやり取り */}
        {previousMessages.map((msg, idx) => (
          <div key={idx} className="space-y-2">
            <AdvisorMessage bubbleClassName="py-2.5">
              <p className="text-sm text-gray-800 leading-relaxed">{msg.question}</p>
            </AdvisorMessage>
            <UserMessage>
              <p className="text-sm leading-relaxed">{msg.answer}</p>
            </UserMessage>
          </div>
        ))}

        {/* 現在の質問 */}
        <AdvisorMessage className="animate-slideInLeft">
          <span
            className="inline-block text-[10px] font-bold text-[var(--accent)] bg-[var(--accent-tint-1)] px-2 py-0.5 rounded-full mb-1.5"
            style={{ fontFamily: 'Montserrat' }}
          >
            Q{questionNumber}
          </span>
          <p className="text-sm font-medium text-gray-800 leading-relaxed">{question}</p>
        </AdvisorMessage>

        {/* ユーザーの選択済み回答 */}
        {selectedOptionLabel && (
          <UserMessage className="animate-slideInRight">
            <p className="text-sm leading-relaxed">{selectedOptionLabel}</p>
          </UserMessage>
        )}
      </div>

      {/* 選択肢エリア */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50/50 animate-fadeIn">
        {inputType === 'prefecture' ? (
          <>
            <div className="space-y-2">
              <div className="flex items-stretch gap-2">
                <div className="relative flex-1">
                  <select
                    value={selectedPrefecture}
                    onChange={(e) => setSelectedPrefecture(e.target.value)}
                    disabled={isAnswering}
                    className="w-full appearance-none px-4 pr-12 py-3 rounded-xl border border-gray-200 bg-white text-[15px] leading-[1.4] font-normal text-gray-700 focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <option value="">都道府県を選択</option>
                    {prefectureOptions.map((prefecture) => (
                      <option key={prefecture} value={prefecture}>
                        {prefecture}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>

                <button
                  onClick={handlePrefectureSubmit}
                  disabled={isAnswering || !selectedPrefecture}
                  className="px-4 py-3 rounded-xl border border-[var(--accent)] bg-[var(--accent)] text-white text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  この勤務地で回答
                </button>
              </div>

              {fallbackPrefectureOption && (
                <button
                  onClick={() => handleSelect({ id: fallbackPrefectureOption.id, label: fallbackPrefectureOption.label })}
                  disabled={isAnswering}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-[15px] leading-[1.4] font-normal transition-all duration-200 ${
                    selectedOptionId === fallbackPrefectureOption.id
                      ? 'border-[var(--accent)] bg-[var(--accent-tint-1)] text-gray-900'
                      : 'border-gray-200 bg-white hover:border-[var(--accent)] hover:bg-[var(--accent-tint-1-60)] text-gray-700'
                  } ${isAnswering ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                >
                  {fallbackPrefectureOption.label}
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              {options.map((option, index) => {
                const isSelected = selectedOptionId === option.id;

                return (
                  <button
                    key={option.id || index}
                    onClick={() => handleSelect({ id: option.id, label: option.label })}
                    disabled={isAnswering}
                    className={`w-full h-[56px] px-3 py-1.5 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--accent-tint-1)]'
                        : 'border-gray-200 bg-white hover:border-[var(--accent)] hover:bg-[var(--accent-tint-1-60)]'
                    } ${isAnswering ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                  >
                    <span
                      className={`block text-sm leading-snug text-center whitespace-pre-line transition-colors ${
                        isSelected ? 'text-gray-900 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
