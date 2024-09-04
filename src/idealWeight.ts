interface IdealWeightInput {
  height: number; // 신장 (cm)
  weight: number; // 체중 (kg)
  gender: "male" | "female"; // 성별
}

interface IdealWeightOutput {
  idealWeight: number; // 표준 체중 (kg)
  obesityRate: number; // 비만도 (%)
}

/**
 * 적정 체중 계산기
 * @param input - 적정 체중 계산을 위한 입력 정보
 * @returns 표준체중과 비만도 결과
 */
export function calculateIdealWeight(
  input: IdealWeightInput
): IdealWeightOutput {
  const { height, weight, gender } = input;

  // 표준 체중 계산 (성별에 따른 계산 공식)
  const heightInMeters = height / 100; // 신장을 미터 단위로 변환
  let idealWeight: number;

  if (gender === "male") {
    idealWeight = 22 * Math.pow(heightInMeters, 2); // 남성 표준 체중 공식
  } else {
    idealWeight = 21 * Math.pow(heightInMeters, 2); // 여성 표준 체중 공식
  }

  // 비만도 계산
  const obesityRate = ((weight - idealWeight) / idealWeight) * 100;

  return {
    idealWeight: parseFloat(idealWeight.toFixed(2)), // 소수점 두 자리까지 반올림
    obesityRate: parseFloat(obesityRate.toFixed(2)), // 소수점 두 자리까지 반올림
  };
}
