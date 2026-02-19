
import AdvisorIcon from './AdvisorIcon';

interface ResultSectionProps {
  answers: Record<number, string>;
  onNext: () => void;
}

export default function ResultSection({ answers, onNext }: ResultSectionProps) {
  const getResultType = () => {
    const q3Answer = answers[3] || '';
    const q2Answer = answers[2] || '';

    if (q3Answer.includes('スキル') || q2Answer.includes('スキル')) {
      return {
        type: '将来性重視・成長志向タイプ',
        description: 'スキルアップを重視し、自己成長を求めるあなた。今の環境を変えることで、より高い年収とキャリアアップが実現できる可能性があります。',
        emoji: '🚀',
      };
    } else if (q3Answer.includes('安定') || q3Answer.includes('長く')) {
      return {
        type: '安定志向・長期キャリアタイプ',
        description: '安定した環境で長く働きたいあなた。適切な企業選びで、安定性と年収アップの両立が可能です。',
        emoji: '🛡️',
      };
    } else if (q3Answer.includes('年収')) {
      return {
        type: '収入重視・実力派タイプ',
        description: '年収アップを最優先するあなた。市場価値を正しく評価してくれる企業への転職で、大幅な年収アップが期待できます。',
        emoji: '💰',
      };
    } else {
      return {
        type: '将来性を重視しつつ、安定も欲しいタイプ',
        description: 'バランスの取れたキャリアを求めるあなた。今の環境を変えるだけで年収UPできる可能性があります。',
        emoji: '⚖️',
      };
    }
  };

  const result = getResultType();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-4 pt-4 pb-3 overflow-y-auto space-y-3">
        {/* アドバイザーの分析中メッセージ */}
        <div className="flex items-end gap-2 animate-slideInLeft">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <AdvisorIcon className="w-5 h-5" />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed">
              回答ありがとうございます！<br />診断結果が出ました 🎉
            </p>
          </div>
        </div>

        {/* 診断結果カード */}
        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-4 max-w-[85%] shadow-sm">
            <p className="text-xs text-gray-500 mb-2">あなたの診断結果</p>
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 mb-3 border border-teal-100">
              <p className="text-2xl mb-2 text-center">{result.emoji}</p>
              <p className="text-sm font-bold text-teal-700 text-center leading-relaxed">
                「{result.type}」
              </p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {result.description}
            </p>
          </div>
        </div>

        {/* メリット紹介 */}
        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed mb-2.5">
              あなたにぴったりの求人をご紹介できます👇
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs">✅</span>
                <p className="text-xs text-gray-600">平均50〜100万円の年収アップ実績</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">✅</span>
                <p className="text-xs text-gray-600">あなたの希望に合った企業をマッチング</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">✅</span>
                <p className="text-xs text-gray-600">専任アドバイザーが完全無料でサポート</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed">
              詳しい求人情報を無料でお届けしますので、下のボタンから情報を入力してください 📩
            </p>
          </div>
        </div>
      </div>

      {/* CTAボタン */}
      <div className="px-4 pb-4 pt-2 animate-fadeIn" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
        <button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
        >
          無料で詳しい求人を見る
          <i className="ri-arrow-right-line ml-2"></i>
        </button>
      </div>
    </div>
  );
}
