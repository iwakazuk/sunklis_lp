import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../home/components/ProgressBar';
import QuestionSection from '../home/components/QuestionSection';
import ResultWithSubmissionSection from '../home/components/ResultWithSubmissionSection';
import AdvisorIcon from '../home/components/AdvisorIcon';

interface QuestionDefinition {
  number: number;
  question: string;
  options: string[];
  inputType?: 'buttons' | 'prefecture';
  prefectureOptions?: string[];
}

const prefectures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
];

const questions: QuestionDefinition[] = [
  {
    number: 1,
    question: '今後の働き方について、どのように考えていますか？',
    options: ['キャリアアップを目指したい', 'より良い環境があれば検討したい', '方向性に少し迷っている', 'まだ具体的には考えていない'],
  },
  {
    number: 2,
    question: '今後の働き方で、優先したいことは何ですか？',
    options: ['年収・待遇', '仕事内容', '働く環境（人間関係・社風）', 'ワークライフバランス', 'まだはっきりしていない'],
  },
  {
    number: 3,
    question: 'いつごろから働きたいですか？',
    options: ['できるだけ早く（1ヶ月以内）', '3ヶ月以内', '半年以内', 'まだ決めていない'],
  },
  {
    number: 4,
    question: '現在のご状況に近いものを教えてください。',
    options: ['在職中（正社員）', '在職中（契約・アルバイトなど）', '離職中', '学生', 'その他'],
  },
  {
    number: 5,
    question: '希望している勤務地はありますか？',
    options: ['特に決めていない'],
    inputType: 'prefecture',
    prefectureOptions: prefectures,
  },
  {
    number: 6,
    question: '理想の年収イメージはありますか？',
    options: ['300万未満', '300–400万', '400–500万', '500万以上', '特に決めていない'],
  },
];

interface DiagnosisLocationState {
  firstAnswer?: string;
}

export default function DiagnosisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const hasAppliedInitialAnswer = useRef(false);

  const totalQuestions = questions.length;

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (!chatScrollRef.current) return;
    chatScrollRef.current.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior,
    });
  };

  const handleRestart = () => {
    navigate('/');
  };

  const getPreviousMessages = (upTo: number) => {
    const msgs: { question: string; answer: string }[] = [];
    for (let i = 1; i < upTo; i++) {
      if (answers[i]) {
        msgs.push({
          question: questions[i - 1].question,
          answer: answers[i],
        });
      }
    }
    return msgs;
  };

  const isQuestion = currentStep >= 1 && currentStep <= totalQuestions;
  const isResult = currentStep === totalQuestions + 1;

  useEffect(() => {
    if (!isResult) return;
    chatScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [isResult]);

  useEffect(() => {
    if (!isQuestion) return;
    const rafId = requestAnimationFrame(() => {
      scrollToBottom('smooth');
    });
    return () => cancelAnimationFrame(rafId);
  }, [currentStep, isQuestion]);

  useEffect(() => {
    if (hasAppliedInitialAnswer.current) return;

    const state = location.state as DiagnosisLocationState | null;
    const firstAnswer = state?.firstAnswer;

    if (!firstAnswer) {
      hasAppliedInitialAnswer.current = true;
      return;
    }

    if (!questions[0].options.includes(firstAnswer)) {
      hasAppliedInitialAnswer.current = true;
      return;
    }

    setAnswers({ 1: firstAnswer });
    setCurrentStep(2);
    hasAppliedInitialAnswer.current = true;
  }, [location.state]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[var(--accent-bg-1)] via-[var(--accent-bg-2)] to-slate-100 flex items-center justify-center py-3 px-4" style={{ height: '100dvh' }}>
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--accent-a35)] blur-3xl"></div>
      <div className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full bg-[var(--accent-a25)] blur-3xl"></div>

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

          <div ref={chatScrollRef} className="flex-1 min-h-0 bg-gradient-to-b from-gray-50/80 to-gray-50 overflow-y-auto">
            {isQuestion && (
              <QuestionSection
                key={currentStep}
                questionNumber={questions[currentStep - 1].number}
                question={questions[currentStep - 1].question}
                options={questions[currentStep - 1].options}
                inputType={questions[currentStep - 1].inputType}
                prefectureOptions={questions[currentStep - 1].prefectureOptions}
                onAnswer={(answer) => handleAnswer(currentStep, answer)}
                onSelectAnswer={scrollToBottom}
                previousMessages={getPreviousMessages(currentStep)}
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
    </div>
  );
}
