interface BmiResult {
  bmi: number; // BMI 지수
  category: string; // 비만도 결과 (저체중, 정상, 과체중, 비만)
}

/**
 * BMI 계산기
 * @param heightCm - 신장 (cm)
 * @param weightKg - 체중 (kg)
 * @returns BMI 지수와 비만도 결과
 */
export function calculateBmi(heightCm: number, weightKg: number): BmiResult {
  // 신장을 미터 단위로 변환
  const heightM = heightCm / 100;

  // BMI 지수 계산
  const bmi = weightKg / (heightM * heightM);

  // 비만도 결과 결정
  let category = "";

  if (bmi < 18.5) {
    category = "저체중";
  } else if (bmi >= 18.5 && bmi < 23) {
    category = "정상";
  } else if (bmi >= 23 && bmi < 25) {
    category = "과체중";
  } else {
    category = "비만";
  }

  return {
    bmi: parseFloat(bmi.toFixed(2)), // BMI 지수를 소수점 두 자리까지 표시
    category,
  };
}
