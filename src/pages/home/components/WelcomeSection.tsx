
import AdvisorIcon from './AdvisorIcon';

interface WelcomeSectionProps {
  onStart: () => void;
}

export default function WelcomeSection({ onStart }: WelcomeSectionProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-4 pt-6 pb-4 space-y-3">
        {/* アドバイザーからの挨拶 */}
        <div className="flex items-end gap-2 animate-slideInLeft">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <AdvisorIcon className="w-5 h-5" />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed">
              こんにちは！👋<br />キャリアアドバイザーです。
            </p>
          </div>
        </div>

        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed">
              簡単な質問に答えるだけで、あなたに最適な<strong className="text-teal-600">キャリアプラン</strong>を診断します。
            </p>
          </div>
        </div>

        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-xs text-teal-600"></i>
                </div>
                <p className="text-xs text-gray-600">所要時間：<strong className="text-gray-800">約2分</strong></p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-xs text-teal-600"></i>
                </div>
                <p className="text-xs text-gray-600"><strong className="text-gray-800">完全無料</strong>・登録不要</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-questionnaire-line text-xs text-teal-600"></i>
                </div>
                <p className="text-xs text-gray-600">全<strong className="text-gray-800">6問</strong>の質問に回答</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-2 animate-slideInLeft" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-sm">
            <p className="text-sm text-gray-800 leading-relaxed">
              さっそく始めてみましょう！😊
            </p>
          </div>
        </div>
      </div>

      {/* 開始ボタン */}
      <div className="px-4 pb-4 pt-2 animate-fadeIn" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
        >
          診断をはじめる
          <i className="ri-arrow-right-line ml-2"></i>
        </button>
      </div>
    </div>
  );
}
