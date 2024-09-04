interface SeverancePayInput {
  startDate: Date; // 입사일
  endDate: Date; // 퇴사일
  lastThreeMonthsSalaries: number[]; // 최근 3개월간 월급 (세전) 배열 (원)
  annualBonus?: number; // 연간 상여금 (선택) (원)
  annualLeaveAllowance?: number; // 연차수당 (선택) (원)
}

interface SeverancePayOutput {
  expectedSeverancePay: number; // 예상 퇴직금 (원)
  averageDailyWage: number; // 1일 평균 임금 (원)
}

/**
 * 퇴직금 계산기
 * @param input - 퇴직금 계산을 위한 입력 정보
 * @returns 예상 퇴직금과 1일 평균 임금
 */
export function calculateSeverancePay(
  input: SeverancePayInput
): SeverancePayOutput {
  const {
    startDate,
    endDate,
    lastThreeMonthsSalaries,
    annualBonus = 0,
    annualLeaveAllowance = 0,
  } = input;

  // 총 근속일수 계산
  const totalServiceDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 최근 3개월의 급여 총액 계산
  const totalSalaryForThreeMonths = lastThreeMonthsSalaries.reduce(
    (acc, salary) => acc + salary,
    0
  );

  // 최근 3개월 총 급여 + 연간 상여금의 1/12 + 연차수당의 1/12
  const totalIncludedSalary =
    totalSalaryForThreeMonths + annualBonus / 12 + annualLeaveAllowance / 12;

  // 최근 3개월의 근무일수 (평균 30일로 가정)
  const averageWorkingDays = 90; // 3개월 = 90일 (30일 * 3개월)

  // 1일 평균 임금 계산
  const averageDailyWage = totalIncludedSalary / averageWorkingDays;

  // 예상 퇴직금 계산
  const expectedSeverancePay = (averageDailyWage * 30 * totalServiceDays) / 365;

  return {
    expectedSeverancePay: Math.round(expectedSeverancePay),
    averageDailyWage: Math.round(averageDailyWage),
  };
}
