interface UnemploymentInput {
  age: number; // 나이 (만 나이)
  isDisabled: boolean; // 장애인 여부
  employmentInsurancePeriod: number; // 고용보험 총 가입기간 (개월)
  recentThreeMonthsSalaries: number[]; // 최근 3개월 월급 (원)
  averageWorkDays: number; // 최근 3개월의 월평균 근무일수
  dailyWorkHours: number; // 1일 소정근로시간 (시간)
}

interface UnemploymentOutput {
  dailyBenefitAmount: number; // 1일 구직 급여일액
  expectedPaymentDays: number; // 예상 지급일수
  totalExpectedAmount: number; // 총 예상 지급액
}

/**
 * 실업급여 계산기
 * @param input - 실업급여 계산을 위한 입력 정보
 * @returns 실업급여 결과 (1일 구직 급여일액, 예상 지급일수, 총 예상 지급액)
 */
export function calculateUnemploymentBenefit(
  input: UnemploymentInput
): UnemploymentOutput {
  const {
    age,
    isDisabled,
    employmentInsurancePeriod,
    recentThreeMonthsSalaries,
    averageWorkDays,
    dailyWorkHours,
  } = input;

  // 최근 3개월의 월 평균임금 계산
  const totalSalary = recentThreeMonthsSalaries.reduce(
    (acc, salary) => acc + salary,
    0
  );
  const averageMonthlySalary = totalSalary / 3;

  // 1일 평균 급여액 계산
  const dailyAverageWage = averageMonthlySalary / averageWorkDays;

  // 소정 근로시간에 따른 기초일액 계산
  const dailyBaseWage = dailyWorkHours * (dailyAverageWage / dailyWorkHours);

  // 실업급여의 1일 지급액: 기초일액의 60% (상한선 적용)
  const maxDailyBenefit = 66360; // 2024년 기준 상한액 (66,360원, 8시간 기준)
  const minDailyBenefit = Math.max(
    0.8 * 9620 * dailyWorkHours,
    61568 * (dailyWorkHours / 8)
  ); // 최저임금의 80% 기준

  const dailyBenefitAmount = Math.min(
    Math.max(dailyBaseWage * 0.6, minDailyBenefit),
    maxDailyBenefit
  );

  // 예상 지급일수 (소정급여일수)
  let expectedPaymentDays = 0;
  if (employmentInsurancePeriod < 12) {
    expectedPaymentDays = 120;
  } else if (employmentInsurancePeriod < 36) {
    expectedPaymentDays = age < 50 ? 150 : 180;
  } else if (employmentInsurancePeriod < 60) {
    expectedPaymentDays = age < 50 ? 180 : 210;
  } else {
    expectedPaymentDays = age < 50 ? 210 : 240;
  }

  // 장애인의 경우 지급일수 추가
  if (isDisabled) {
    expectedPaymentDays += 30; // 장애인 추가 지급일수
  }

  // 총 예상 지급액
  const totalExpectedAmount = dailyBenefitAmount * expectedPaymentDays;

  return {
    dailyBenefitAmount: Math.round(dailyBenefitAmount),
    expectedPaymentDays,
    totalExpectedAmount: Math.round(totalExpectedAmount),
  };
}
