import { useNavigate } from 'react-router-dom';
import carrerImage from '../../assets/carrer.png';
import topImage from '../../assets/top.png';
import topConditionImage from '../../assets/top_conditon.png';

const firstQuestionOptions = [
  'キャリアアップを目指したい',
  'より良い環境があれば検討したい',
  '方向性に少し迷っている',
  'まだ具体的には考えていない',
];

export default function Home() {
  const navigate = useNavigate();

  const handleStart = (firstAnswer: string) => {
    navigate('/diagnosis', { state: { firstAnswer } });
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-gradient-to-b from-[var(--accent-bg-1)] via-[var(--accent-bg-2)] to-slate-100 flex justify-center py-6 px-4">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--accent-a35)] blur-3xl"></div>
      <div className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full bg-[var(--accent-a25)] blur-3xl"></div>

      <div className="w-full max-w-[520px] relative z-10">
        <div className="mb-6 flex justify-center">
          <img src={carrerImage} alt="carrer" className="w-full max-h-12 object-contain" />
        </div>

        <div className="mb-24 flex justify-center">
          <img src={topImage} alt="top" className="block w-full h-auto" />
        </div>

        <div className="relative rounded-3xl border border-white/70 bg-white/60 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,23,42,0.12)] px-6 py-10 sm:px-8 sm:py-12">
          <img
            src={topConditionImage}
            alt="top condition"
            className="pointer-events-none select-none absolute -top-16 right-1 w-60 sm:-top-16 sm:-right-1 sm:w-60 object-contain"
          />
          <p className="text-xl font-semibold text-slate-800 leading-relaxed">
            今後の働き方について、<br />
            どのように考えていますか？
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {firstQuestionOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleStart(option)}
                className="w-full min-h-[84px] flex items-center justify-center text-center px-3 py-4 rounded-xl border border-slate-200 bg-white hover:border-[var(--accent)] hover:bg-[var(--accent-tint-1)] transition-all duration-200 cursor-pointer text-sm font-semibold leading-snug text-slate-700"
              >
                <span className="whitespace-pre-line">
                  {option === 'より良い環境があれば検討したい' ? 'より良い環境があれば\n検討したい' : option}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/60 bg-white/45 backdrop-blur-2xl p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-800">
            SUNKLIS株式会社が運営しています
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-700">
            ニイゼロキャリアは、正社員未経験や正社員歴が短い方々の
            お仕事探しを9年以上サポートしています。
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-700">
          <span className="underline decoration-slate-400/70 underline-offset-2">利用規約</span>
          <span className="underline decoration-slate-400/70 underline-offset-2">プライバシーポリシー</span>
          <a
            href="https://sunklis.co.jp/contact/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-slate-500/80 underline-offset-2 hover:text-slate-900 transition-colors"
          >
            お問い合せ
          </a>
          <a
            href="https://sunklis.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-slate-500/80 underline-offset-2 hover:text-slate-900 transition-colors"
          >
            運営会社
          </a>
        </div>

        <p className="text-center mt-4">
          <a
            href="https://sunklis.co.jp/"
            className="text-4xl text-slate-800 hover:text-slate-900 transition-colors"
            style={{ fontFamily: 'Arial', fontWeight: 700, textDecoration: 'underline', letterSpacing: '0.02em' }}
          >
            SUNKLIS
          </a>
        </p>

        <p className="text-center text-[10px] text-slate-500/80 mt-3">
          &copy; SUNKLIS, inc. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
