import { useState, type CSSProperties } from 'react';
import { getDiagnosisResultByAnswerIds, type DiagnosisAnswer } from '../../../features/diagnosis/config';
import {
  DIAGNOSIS_FORM_ENDPOINT,
  buildDiagnosisFormBody,
  validateDiagnosisForm,
  type DiagnosisFormData,
} from '../../../features/diagnosis/form';
import { AdvisorMessage, UserMessage } from './ChatMessage';

interface ResultWithSubmissionSectionProps {
  answers: Record<number, DiagnosisAnswer>;
  onRestart: () => void;
}

const REQUIRED_TEXT_FIELDS: Array<{
  key: keyof Omit<DiagnosisFormData, 'message'>;
  label: string;
  type: 'text' | 'email' | 'tel';
  placeholder: string;
}> = [
  { key: 'name', label: 'お名前', type: 'text', placeholder: '山田 太郎' },
  { key: 'age', label: '年齢', type: 'text', placeholder: '28' },
  { key: 'email', label: 'メールアドレス', type: 'email', placeholder: 'example@email.com' },
  { key: 'phone', label: '電話番号', type: 'tel', placeholder: '090-1234-5678' },
];

const RESULT_SUPPORT_POINTS = [
  'あなたの志向や状況に合わせてマッチング',
  '専任アドバイザーが方向性を整理しながらサポート',
  'ご希望に合わせて柔軟に対応',
] as const;

function withAnimationDelay(seconds: number): CSSProperties {
  return {
    animationDelay: `${seconds}s`,
    animationFillMode: 'both',
  };
}

export default function ResultWithSubmissionSection({ answers, onRestart }: ResultWithSubmissionSectionProps) {
  const [formData, setFormData] = useState<DiagnosisFormData>({
    name: '',
    age: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormField = (key: keyof DiagnosisFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateDiagnosisForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await fetch(DIAGNOSIS_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: buildDiagnosisFormBody(formData),
      });
      setIsSubmitted(true);
    } catch {
      setErrors({ submit: '送信に失敗しました。もう一度お試しください。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const result = getDiagnosisResultByAnswerIds(answers[1]?.id, answers[2]?.id);

  if (isSubmitted) {
    return (
      <div className="flex min-h-full flex-col">
        <div className="flex-1 px-4 pt-4 pb-3 space-y-3">
          <UserMessage className="animate-slideInRight">
            <p className="text-sm leading-relaxed">情報を送信しました！</p>
          </UserMessage>
          <AdvisorMessage className="animate-slideInLeft" style={withAnimationDelay(0.3)}>
            <p className="text-sm text-gray-800 leading-relaxed">
              ありがとうございます！🎉<br /><br />
              ご登録いただいたメールアドレス宛に詳しい求人情報をお送りいたします。<br /><br />
              担当者より<strong className="text-[var(--accent)]">2営業日以内</strong>にご連絡させていただきます。お楽しみに！
            </p>
          </AdvisorMessage>
        </div>
        <div className="px-4 pb-4 pt-2 animate-fadeIn" style={withAnimationDelay(0.6)}>
          <button
            onClick={onRestart}
            className="w-full bg-gray-100 text-gray-600 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
          >
            最初に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="px-4 pt-4 pb-3 space-y-3">
        <AdvisorMessage className="animate-slideInLeft">
          <p className="text-sm text-gray-800 leading-relaxed">
            回答ありがとうございます！<br />診断結果が出ました 🎉
          </p>
        </AdvisorMessage>

        <AdvisorMessage
          className="animate-slideInLeft"
          hideAvatar
          bubbleClassName="py-4"
          style={withAnimationDelay(0.3)}
        >
          <p className="text-xs text-gray-500 mb-2">あなたの診断結果</p>
          <div className="bg-gradient-to-r from-[var(--accent-tint-1)] to-[var(--accent-tint-2)] rounded-xl p-4 mb-3 border border-[var(--accent-tint-3)]">
            <p className="text-2xl mb-2 text-center">{result.emoji}</p>
            <p className="text-sm font-bold text-[var(--accent-dark)] text-center leading-relaxed">
              「{result.type}」
            </p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {result.description}
          </p>
        </AdvisorMessage>

        <AdvisorMessage className="animate-slideInLeft" hideAvatar style={withAnimationDelay(0.6)}>
          <p className="text-sm text-gray-800 leading-relaxed mb-2.5">
            あなたにぴったりの求人をご紹介できます👇
          </p>
          <div className="space-y-2">
            {RESULT_SUPPORT_POINTS.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <span className="text-xs">✅</span>
                <p className="text-xs text-gray-600">{point}</p>
              </div>
            ))}
          </div>
        </AdvisorMessage>

        <AdvisorMessage className="animate-slideInLeft" hideAvatar style={withAnimationDelay(0.9)}>
          <p className="text-sm text-gray-800 leading-relaxed">
            あなたに合った求人を無料でお届けします📩<br />
            以下の情報を教えてください。
          </p>
        </AdvisorMessage>

        <div className="animate-fadeIn" style={withAnimationDelay(1.2)}>
          <form id="career-diagnosis-form" data-readdy-form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3 ml-10">
            {REQUIRED_TEXT_FIELDS.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {field.label} <span className="text-red-400">*</span>
                </label>
                <input
                  type={field.type}
                  name={field.key}
                  value={formData[field.key]}
                  onChange={(e) => updateFormField(field.key, e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder={field.placeholder}
                />
                {errors[field.key] && <p className="text-[10px] text-red-500 mt-1">{errors[field.key]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                相談内容（任意）
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => updateFormField('message', e.target.value)}
                maxLength={500}
                rows={3}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all resize-none bg-gray-50"
                placeholder="ご相談内容があればご記入ください"
              />
              <p className="text-[10px] text-gray-400 mt-0.5 text-right">{formData.message.length}/500</p>
              {errors.message && <p className="text-[10px] text-red-500 mt-0.5">{errors.message}</p>}
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <p className="text-xs text-red-600">{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-white font-semibold py-3 px-6 rounded-xl hover:from-[var(--accent-dark)] hover:to-[var(--accent-darker)] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer text-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  送信中...
                </span>
              ) : (
                <span>
                  送信する
                  <i className="ri-send-plane-fill ml-2"></i>
                </span>
              )}
            </button>

            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              送信いただいた情報は求人紹介のためにのみ使用し、第三者に提供することはありません。
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
