interface RetirementFundResult {
  retirementStartAge: number; // 연금 개시 나이
  retirementPeriod: number; // 연금 수령 기간
  totalRequiredAmount: number; // 필요한 총 금액 (현재 나이 기준 계산)
  monthlyPension: number; // 매월 받을 연금액
  retirementEndAge: number; // 연금 종료 나이
}

/**
 * 은퇴자금 계산기 (현재 나이 기준)
 * @param currentAge - 현재 나이
 * @param desiredMonthlyPension - 희망하는 월 연금액 (만원 단위)
 * @param pensionStartAge - 연금 개시 나이 (기본값 60세)
 * @param pensionDuration - 연금 수령 기간 (기본값 30년)
 * @param averageAnnualReturn - 연평균 수익률 (소수로 입력, 예: 0.05 = 5%)
 * @returns 필요한 총 금액 및 매월 받을 연금액
 */
export function calculateRetirementFund(
  currentAge: number,
  desiredMonthlyPension: number,
  pensionStartAge: number = 60,
  pensionDuration: number = 30, // 90세까지 수령
  averageAnnualReturn: number = 0.05 // 연평균 수익률 5% 기본값
): RetirementFundResult {
  const retirementPeriod = pensionDuration;
  const totalRequiredAmount = desiredMonthlyPension * 12 * retirementPeriod; // 매월 받는 연금액 x 12개월 x 수령 기간

  // 현재 나이부터 연금 개시 나이까지의 저축 기간
  const savingPeriodYears = pensionStartAge - currentAge;

  // 연평균 수익률을 적용한 미래 가치 계산
  const futureValueFactor = Math.pow(
    1 + averageAnnualReturn,
    savingPeriodYears
  );
  const presentValueOfRequiredAmount = totalRequiredAmount / futureValueFactor; // 현재 가치로 환산

  return {
    retirementStartAge: pensionStartAge,
    retirementPeriod,
    totalRequiredAmount: parseFloat(presentValueOfRequiredAmount.toFixed(0)), // 결과를 정수로 반올림
    monthlyPension: desiredMonthlyPension,
    retirementEndAge: pensionStartAge + pensionDuration,
  };
}

interface MonthlySavingsResult {
  currentAge: number; // 현재 나이
  currentAssets: number; // 현재 보유 자산
  monthlySavings: number; // 매월 저축 금액
  savingPeriod: number; // 저축 기간 (년 단위)
  savingEndAge: number; // 저축 종료 나이
  totalAmountAtRetirement: number; // 60세 시점에 모으는 금액
  monthlyPension: number; // 은퇴 종료 나이까지 매월 받는 연금액
  pensionStartAge: number; // 연금 수령 시작 나이
  pensionEndAge: number; // 연금 수령 종료 나이
}

/**
 * 적립액 계산기
 * @param currentAge - 현재 나이
 * @param currentFinancialAssets - 현재 보유 금융 자산 (만원 단위)
 * @param monthlySavings - 매월 저축 금액 (만원 단위)
 * @param savingPeriod - 저축 기간 (년 단위)
 * @param averageAnnualReturn - 매년 평균 수익률 (소수로 입력, 예: 0.03 = 3%)
 * @returns 은퇴 시점에 모이는 금액 및 매월 받을 연금액
 */
export function calculateMonthlySavings(
  currentAge: number,
  currentFinancialAssets: number,
  monthlySavings: number,
  savingPeriod: number,
  averageAnnualReturn: number
): MonthlySavingsResult {
  const savingEndAge = currentAge + savingPeriod; // 저축 종료 나이
  const pensionStartAge = 60; // 연금 수령 시작 나이
  const pensionEndAge = 90; // 연금 수령 종료 나이

  const monthsOfSaving = savingPeriod * 12; // 저축 기간을 월 단위로 변환
  const monthlyRate = averageAnnualReturn / 12; // 월 수익률로 변환

  // 현재 자산의 미래 가치 계산 (저축 종료 시점까지)
  const futureValueOfCurrentAssets =
    currentFinancialAssets * Math.pow(1 + monthlyRate, monthsOfSaving);

  // 매월 저축액의 미래 가치 계산
  const futureValueOfSavings =
    monthlySavings *
    ((Math.pow(1 + monthlyRate, monthsOfSaving) - 1) / monthlyRate);

  // 은퇴 시점에 모이는 총 금액
  const totalAmountAtRetirement =
    futureValueOfCurrentAssets + futureValueOfSavings;

  // 연금 수령 기간 (연금 개시 나이부터 종료 나이까지)
  const pensionPeriod = (pensionEndAge - pensionStartAge) * 12;

  // 은퇴 시점부터 매월 받을 연금액 계산
  const monthlyPension = totalAmountAtRetirement / pensionPeriod;

  return {
    currentAge,
    currentAssets: currentFinancialAssets,
    monthlySavings,
    savingPeriod,
    savingEndAge,
    totalAmountAtRetirement: parseFloat(totalAmountAtRetirement.toFixed(0)), // 결과를 정수로 반올림
    monthlyPension: parseFloat(monthlyPension.toFixed(0)), // 매월 받을 연금액을 정수로 반올림
    pensionStartAge,
    pensionEndAge,
  };
}

interface MonthlyPensionResult {
  interestRate: number; // 수익률
  currentAssets: number; // 현재 보유 자산
  monthlySavings: number; // 매월 모으는 돈
  savingPeriod: number; // 저축 기간
  totalAmountAtRetirement: number; // 은퇴 시점 모은 총 금액
  monthlyPension: number; // 은퇴 종료까지 매월 받는 금액
}

/**
 * 연금액 계산기
 * @param currentAge - 현재 나이
 * @param currentFinancialAssets - 현재 보유 금융 자산
 * @param monthlySavings - 매월 저축 금액
 * @param savingPeriod - 저축 기간
 * @param averageAnnualReturn - 매년 평균 수익율 (소수로 입력, 예: 0.05 = 5%)
 * @returns 은퇴 시점 모은 총 금액 및 매월 받을 연금액
 */
export function calculateMonthlyPension(
  currentAge: number,
  currentFinancialAssets: number,
  monthlySavings: number,
  savingPeriod: number,
  averageAnnualReturn: number
): MonthlyPensionResult {
  const pensionStartAge = 60;
  const months = (pensionStartAge - currentAge) * 12; // 현재 나이부터 은퇴 나이까지 저축 기간
  const monthlyRate = averageAnnualReturn / 12;

  const futureValueOfCurrentAssets =
    currentFinancialAssets * Math.pow(1 + monthlyRate, months);
  const futureValueOfSavings =
    monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const totalAmountAtRetirement =
    futureValueOfCurrentAssets + futureValueOfSavings;

  return {
    interestRate: averageAnnualReturn,
    currentAssets: currentFinancialAssets,
    monthlySavings,
    savingPeriod,
    totalAmountAtRetirement,
    monthlyPension: totalAmountAtRetirement / (30 * 12), // 90세까지 수령
  };
}

interface LumpSumResult {
  averageInterestRate: number; // 평균 수익률
  monthlySavings: number; // 매월 저축 금액
  savingPeriod: number; // 저축 기간
  totalAmountAtRetirement: number; // 은퇴 시점에 받는 금액
  monthlyPension: number; // 은퇴 종료까지 매월 받는 금액
}

/**
 * 목돈 계산기
 * @param currentAge - 현재 나이
 * @param monthlySavings - 매월 저축 금액
 * @param savingPeriod - 저축 기간
 * @param averageAnnualReturn - 매년 평균 수익률 (소수로 입력, 예: 0.05 = 5%)
 * @returns 은퇴 시점에 모이는 금액 및 매월 받을 연금액
 */
export function calculateLumpSum(
  currentAge: number,
  monthlySavings: number,
  savingPeriod: number,
  averageAnnualReturn: number
): LumpSumResult {
  const pensionStartAge = 60;
  const months = (pensionStartAge - currentAge) * 12; // 현재 나이부터 은퇴 나이까지 저축 기간
  const monthlyRate = averageAnnualReturn / 12;

  const futureValueOfSavings =
    monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return {
    averageInterestRate: averageAnnualReturn,
    monthlySavings,
    savingPeriod,
    totalAmountAtRetirement: futureValueOfSavings,
    monthlyPension: futureValueOfSavings / (30 * 12), // 90세까지 수령
  };
}
