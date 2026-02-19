export interface DiagnosisOption {
  id: string;
  label: string;
}

export interface DiagnosisQuestionDefinition {
  number: number;
  question: string;
  options: DiagnosisOption[];
  inputType?: 'buttons' | 'prefecture';
  prefectureOptions?: string[];
}

export interface DiagnosisAnswer {
  id: string;
  label: string;
}

export interface DiagnosisResultType {
  type: string;
  description: string;
  emoji: string;
}

export const PREFECTURES = [
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
] as const;

export const FIRST_QUESTION_OPTIONS: DiagnosisOption[] = [
  { id: 'q1_career_up', label: 'キャリアアップを目指したい' },
  { id: 'q1_better_env', label: 'より良い環境があれば検討したい' },
  { id: 'q1_unsure_direction', label: '方向性に少し迷っている' },
  { id: 'q1_not_thinking', label: 'まだ具体的には考えていない' },
];

export const DIAGNOSIS_QUESTIONS: DiagnosisQuestionDefinition[] = [
  {
    number: 1,
    question: '今後の働き方について、どのように考えていますか？',
    options: FIRST_QUESTION_OPTIONS,
  },
  {
    number: 2,
    question: '今後の働き方で、優先したいことは何ですか？',
    options: [
      { id: 'q2_compensation', label: '年収・待遇' },
      { id: 'q2_job_content', label: '仕事内容' },
      { id: 'q2_work_env', label: '働く環境（人間関係・社風）' },
      { id: 'q2_wlb', label: 'ワークライフバランス' },
      { id: 'q2_not_clear', label: 'まだはっきりしていない' },
    ],
  },
  {
    number: 3,
    question: 'いつごろから働きたいですか？',
    options: [
      { id: 'q3_asap', label: 'できるだけ早く（1ヶ月以内）' },
      { id: 'q3_3months', label: '3ヶ月以内' },
      { id: 'q3_6months', label: '半年以内' },
      { id: 'q3_not_decided', label: 'まだ決めていない' },
    ],
  },
  {
    number: 4,
    question: '現在の状況を教えてください',
    options: [
      { id: 'q4_employed_fulltime', label: '在職中（正社員）' },
      { id: 'q4_employed_contract', label: '在職中（契約・アルバイトなど）' },
      { id: 'q4_unemployed', label: '離職中' },
      { id: 'q4_student', label: '学生' },
      { id: 'q4_other', label: 'その他' },
    ],
  },
  {
    number: 5,
    question: '希望している勤務地はありますか？',
    options: [{ id: 'q5_no_preference', label: '特に決めていない' }],
    inputType: 'prefecture',
    prefectureOptions: [...PREFECTURES],
  },
  {
    number: 6,
    question: '理想の年収イメージはありますか？',
    options: [
      { id: 'q6_lt_300', label: '300万未満' },
      { id: 'q6_300_400', label: '300–400万' },
      { id: 'q6_400_500', label: '400–500万' },
      { id: 'q6_ge_500', label: '500万以上' },
      { id: 'q6_no_preference', label: '特に決めていない' },
    ],
  },
];

const RESULT_BY_KEY = {
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

export function isValidFirstAnswerId(answerId?: string): boolean {
  if (!answerId) return false;
  return FIRST_QUESTION_OPTIONS.some((option) => option.id === answerId);
}

export function getFirstQuestionOption(answerId: string): DiagnosisOption | undefined {
  return FIRST_QUESTION_OPTIONS.find((option) => option.id === answerId);
}

export function getDiagnosisResultByAnswerIds(q1Id?: string, q2Id?: string): DiagnosisResultType {
  if (q2Id === 'q2_compensation') {
    return RESULT_BY_KEY.income;
  }

  if (q2Id === 'q2_work_env' || q2Id === 'q2_wlb') {
    return RESULT_BY_KEY.stability;
  }

  if (q2Id === 'q2_job_content') {
    return RESULT_BY_KEY.growth;
  }

  if (q1Id === 'q1_career_up') {
    return RESULT_BY_KEY.growth;
  }

  if (q1Id === 'q1_better_env') {
    return RESULT_BY_KEY.stability;
  }

  return RESULT_BY_KEY.balance;
}
