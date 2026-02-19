export interface DiagnosisFormData {
  name: string;
  age: string;
  email: string;
  phone: string;
  message: string;
}

export const DIAGNOSIS_FORM_ENDPOINT = 'https://readdy.ai/api/form/d6aql4fmvg9ih2c7ap10';

export function validateDiagnosisForm(formData: DiagnosisFormData): Record<string, string> {
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

  return newErrors;
}

export function buildDiagnosisFormBody(formData: DiagnosisFormData): string {
  const params = new URLSearchParams();
  params.append('name', formData.name);
  params.append('age', formData.age);
  params.append('email', formData.email);
  params.append('phone', formData.phone);
  if (formData.message) params.append('message', formData.message);
  return params.toString();
}
