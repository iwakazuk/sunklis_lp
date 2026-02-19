import { useState } from 'react';
import AdvisorIcon from './AdvisorIcon';

interface ResultWithSubmissionSectionProps {
  answers: Record<number, string>;
  onRestart: () => void;
}

export default function ResultWithSubmissionSection({ answers, onRestart }: ResultWithSubmissionSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getResultType = () => {
    const q1Answer = answers[1] || '';
    const q2Answer = answers[2] || '';

    const resultByKey = {
      growth: {
        type: '将来性重視・成長志向タイプ',
        description: 'キャリアアップや仕事内容を重視するあなた。成長機会のある環境を選ぶことで、将来の選択肢を広げやすくなります。',
        emoji: '🚀',
      },
      stability: {
        type: '安定志向・長期キャリアタイプ',
        description: '働く環境やワークライフバランスを重視するあなた。長く安心して働ける職場との相性が高いタイプです。',
        emoji: '🛡️',
      },
      income: {
        type: '収入重視・実力派タイプ',
        description: '年収・待遇を優先するあなた。市場価値に見合う評価を受けられる職場を選ぶことで、収入アップが期待できます。',
        emoji: '💰',
      },
      balance: {
        type: '将来性を重視しつつ、安定も欲しいタイプ',
        description: 'まだ優先順位を整理中のあなた。条件を比較しながら、成長と安定のバランスが取れた選択が向いています。',
        emoji: '⚖️',
      },
    } as const;

    if (q2Answer === '年収・待遇') {
      return resultByKey.income;
    }

    if (q2Answer === '働く環境（人間関係・社風）' || q2Answer === 'ワークライフバランス') {
      return resultByKey.stability;
    }

    if (q2Answer === '仕事内容') {
      return resultByKey.growth;
    }

    if (q1Answer === 'キャリアアップを目指したい') {
      return resultByKey.growth;
    }

    if (q1Answer === 'より良い環境があれば検討したい') {
      return resultByKey.stability;
    }

    return resultByKey.balance;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'お名前を入力してください';
    if (!formData.age.trim()) newErrors.age = '年齢を入力してください';
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    if (!formData.phone.trim()) newErrors.phone = '電話番号を入力してください';
    if (formData.message.length > 500) newErrors.message = '500文字以内で入力してください';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('age', formData.age);
      params.append('email', formData.email);
      params.append('phone', formData.phone);
      if (formData.message) params.append('message', formData.message);

      await fetch('https://readdy.ai/api/form/d6aql4fmvg9ih2c7ap10', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      setIsSubmitted(true);
    } catch {
      setErrors({ submit: '送信に失敗しました。もう一度お試しください。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const result = getResultType();

  if (isSubmitted) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 px-4 pt-4 pb-3 overflow-y-auto space-y-3">
          <div className="flex justify-end animate-slideInRight">
            <div className="bg-[var(--accent)] text-white rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%] shadow-sm">
              <p className="text-sm leading-relaxed">情報を送信しました！</p>
            </div>
          </div>
          <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center flex-shrink-0 shadow-sm">
              <AdvisorIcon className="w-5 h-5" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
              <p className="text-sm text-gray-800 leading-relaxed">
                ありがとうございます！🎉<br /><br />
                ご登録いただいたメールアドレス宛に詳しい求人情報をお送りいたします。<br /><br />
                担当者より<strong className="text-[var(--accent)]">2営業日以内</strong>にご連絡させていただきます。お楽しみに！
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 pt-2 animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
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
    <div className="flex flex-col h-full">
      <div className="flex-1 px-4 pt-4 pb-3 overflow-y-auto space-y-3">
        <div className="flex items-end gap-2 animate-slideInLeft">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center flex-shrink-0 shadow-sm">
            <AdvisorIcon className="w-5 h-5" />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed">
              回答ありがとうございます！<br />診断結果が出ました 🎉
            </p>
          </div>
        </div>

        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-4 max-w-[85%] shadow-sm">
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
          </div>
        </div>

        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed mb-2.5">
              あなたにぴったりの求人をご紹介できます👇
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs">✅</span>
                <p className="text-xs text-gray-600">あなたの志向や状況に合わせてマッチング</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">✅</span>
                <p className="text-xs text-gray-600">専任アドバイザーが方向性を整理しながらサポート</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">✅</span>
                <p className="text-xs text-gray-600">ご希望に合わせて柔軟に対応</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed">
              あなたに合った求人を無料でお届けします📩<br />
              以下の情報を教えてください。
            </p>
          </div>
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
          <form id="career-diagnosis-form" data-readdy-form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3 ml-10">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                お名前 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all bg-gray-50"
                placeholder="山田 太郎"
              />
              {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                年齢 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all bg-gray-50"
                placeholder="28"
              />
              {errors.age && <p className="text-[10px] text-red-500 mt-1">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                メールアドレス <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all bg-gray-50"
                placeholder="example@email.com"
              />
              {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                電話番号 <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all bg-gray-50"
                placeholder="090-1234-5678"
              />
              {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                相談内容（任意）
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
