import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../home/components/ProgressBar';
import QuestionSection from '../home/components/QuestionSection';
import ResultWithSubmissionSection from '../home/components/ResultWithSubmissionSection';
import AdvisorIcon from '../home/components/AdvisorIcon';
import PageBackground from '../../components/PageBackground';
import {
  DIAGNOSIS_QUESTIONS,
  getFirstQuestionOption,
  isValidFirstAnswerId,
  type DiagnosisAnswer,
} from '../../features/diagnosis/config';

interface DiagnosisLocationState {
  firstAnswerId?: string;
}

export default function DiagnosisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, DiagnosisAnswer>>({});
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const hasAppliedInitialAnswer = useRef(false);

  const totalQuestions = DIAGNOSIS_QUESTIONS.length;

  const handleAnswer = (questionIndex: number, answer: DiagnosisAnswer) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    navigate('/');
  };

  const isQuestion = currentStep >= 1 && currentStep <= totalQuestions;
  const isResult = currentStep === totalQuestions + 1;
  const currentQuestion = isQuestion ? DIAGNOSIS_QUESTIONS[currentStep - 1] : null;
  const previousMessages = useMemo(() => {
    const messages: { question: string; answer: string }[] = [];
    for (let i = 1; i < currentStep; i++) {
      const answer = answers[i];
      if (!answer) continue;
      messages.push({
        question: DIAGNOSIS_QUESTIONS[i - 1].question,
        answer: answer.label,
      });
    }
    return messages;
  }, [answers, currentStep]);

  const scrollChat = useCallback((to: 'top' | 'bottom', behavior: ScrollBehavior = 'auto') => {
    if (!chatScrollRef.current) return;
    const top = to === 'top' ? 0 : chatScrollRef.current.scrollHeight;
    chatScrollRef.current.scrollTo({ top, behavior });
  }, []);

  useEffect(() => {
    if (!isResult) return;
    scrollChat('top', 'auto');
  }, [isResult, scrollChat]);

  useEffect(() => {
    if (!isQuestion) return;
    const rafId = requestAnimationFrame(() => {
      scrollChat('bottom', 'smooth');
    });
    return () => cancelAnimationFrame(rafId);
  }, [currentStep, isQuestion, scrollChat]);

  useEffect(() => {
    if (hasAppliedInitialAnswer.current) return;

    const state = location.state as DiagnosisLocationState | null;
    const firstAnswerId = state?.firstAnswerId;

    if (!firstAnswerId) {
      hasAppliedInitialAnswer.current = true;
      return;
    }

    if (!isValidFirstAnswerId(firstAnswerId)) {
      hasAppliedInitialAnswer.current = true;
      return;
    }

    const firstAnswerOption = getFirstQuestionOption(firstAnswerId);
    if (!firstAnswerOption) {
      hasAppliedInitialAnswer.current = true;
      return;
    }

    setAnswers({
      1: {
        id: firstAnswerOption.id,
        label: firstAnswerOption.label,
      },
    });
    setCurrentStep(2);
    hasAppliedInitialAnswer.current = true;
  }, [location.state]);

  return (
    <PageBackground className="h-[100dvh] flex items-center justify-center py-3 px-4">
      <div className="w-full max-w-[480px] h-full flex flex-col relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col flex-1 min-h-0">
          <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] px-4 py-3 flex items-center gap-3">
            {isQuestion && currentStep > 1 && (
              <button
                onClick={handleBack}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
                aria-label="前の質問に戻る"
              >
                <i className="ri-arrow-left-line text-lg text-white"></i>
              </button>
            )}
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <AdvisorIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">キャリアアドバイザー</p>
              <p className="text-[10px] text-[var(--accent-on-dark)]">自動診断</p>
            </div>
          </div>

          {isQuestion && (
            <ProgressBar current={currentStep} total={totalQuestions} />
          )}

          <div
            ref={chatScrollRef}
            className="flex-1 min-h-0 bg-gradient-to-b from-gray-50/80 to-gray-50 overflow-y-auto"
          >
            {currentQuestion && (
              <QuestionSection
                key={currentStep}
                questionNumber={currentQuestion.number}
                question={currentQuestion.question}
                options={currentQuestion.options}
                inputType={currentQuestion.inputType}
                prefectureOptions={currentQuestion.prefectureOptions}
                onAnswer={(answer) => handleAnswer(currentStep, answer)}
                previousMessages={previousMessages}
                currentAnswer={answers[currentStep]}
              />
            )}

            {isResult && (
              <ResultWithSubmissionSection
                answers={answers}
                onRestart={handleRestart}
              />
            )}
          </div>
        </div>

      </div>
    </PageBackground>
  );
}
