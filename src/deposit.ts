interface DepositCalculationResult {
  totalSavings: number; // 총 저축 금액
  interestByTaxType: {
    regular: number; // 일반 세율
    preferential: number; // 세금 우대
    taxFree: number; // 비과세
  };
}

/**
 * 최초 납입액 기준 예금 계산기 (단리)
 * @param initialDeposit - 최초 납입 금액 (원)
 * @param termYears - 적립 기간 (년 단위)
 * @param annualRate - 연 이자율 (소수로 입력, 예: 0.03 = 3%)
 * @returns 총 저축 금액과 세율별 총 이자액
 */
export function calculateDepositByInitial(
  initialDeposit: number,
  termYears: number,
  annualRate: number
): DepositCalculationResult {
  const totalSavings = initialDeposit * (1 + annualRate * termYears);
  const interest = totalSavings - initialDeposit;

  // 세율 적용
  const taxRegular = interest * 0.154; // 일반 세율 15.4%
  const taxPreferential = interest * 0.095; // 세금 우대 9.5%

  return {
    totalSavings: Math.round(totalSavings),
    interestByTaxType: {
      regular: Math.round(interest - taxRegular),
      preferential: Math.round(interest - taxPreferential),
      taxFree: Math.round(interest),
    },
  };
}

/**
 * 최종 목표 금액 기준 예금 계산기 (단리)
 * @param targetAmount - 목표 금액 (원)
 * @param termYears - 적립 기간 (년 단위)
 * @param annualRate - 연 이자율 (소수로 입력, 예: 0.03 = 3%)
 * @returns 목표 금액을 달성하기 위해 필요한 최초 납입액과 세율별 총 납입액
 */
export function calculateDepositByTarget(
  targetAmount: number,
  termYears: number,
  annualRate: number
): {
  initialDeposit: number;
  savingsByTaxType: { regular: number; preferential: number; taxFree: number };
} {
  const initialDeposit = targetAmount / (1 + annualRate * termYears);

  // 세율 적용
  const interest = targetAmount - initialDeposit;
  const taxRegular = interest * 0.154; // 일반 세율 15.4%
  const taxPreferential = interest * 0.095; // 세금 우대 9.5%

  return {
    initialDeposit: Math.round(initialDeposit),
    savingsByTaxType: {
      regular: Math.round(initialDeposit + (interest - taxRegular)),
      preferential: Math.round(initialDeposit + (interest - taxPreferential)),
      taxFree: Math.round(initialDeposit + interest),
    },
  };
}

interface SavingsCalculationResult {
  totalSavings: number; // 총 저축 금액
  interestByTaxType: {
    regular: number; // 일반 세율
    preferential: number; // 세금 우대
    taxFree: number; // 비과세
  };
}

/**
 * 최초 납입액 기준 적금 계산기
 * @param initialDeposit - 최초 납입 금액 (원)
 * @param termYears - 적립 기간 (년 단위)
 * @param annualRate - 연 이자율 (소수로 입력, 예: 0.03 = 3%)
 * @param isCompound - 복리 여부 (true: 복리, false: 단리)
 * @returns 총 저축 금액과 세율별 총 이자액
 */
export function calculateSavingsByInitial(
  initialDeposit: number,
  termYears: number,
  annualRate: number,
  isCompound: boolean
): SavingsCalculationResult {
  const totalPeriods = termYears * 12;
  let totalSavings: number;

  if (isCompound) {
    // 복리 계산 (월 단위 복리)
    totalSavings = initialDeposit * Math.pow(1 + annualRate / 12, totalPeriods);
  } else {
    // 단리 계산
    totalSavings = initialDeposit * (1 + annualRate * termYears);
  }

  const interest = totalSavings - initialDeposit;

  // 세율 적용
  const taxRegular = interest * 0.154; // 일반 세율 15.4%
  const taxPreferential = interest * 0.095; // 세금 우대 9.5%

  return {
    totalSavings: Math.round(totalSavings),
    interestByTaxType: {
      regular: Math.round(interest - taxRegular),
      preferential: Math.round(interest - taxPreferential),
      taxFree: Math.round(interest),
    },
  };
}

/**
 * 최종 목표 금액 기준 적금 계산기
 * @param targetAmount - 목표 금액 (원)
 * @param termYears - 적립 기간 (년 단위)
 * @param annualRate - 연 이자율 (소수로 입력, 예: 0.03 = 3%)
 * @param isCompound - 복리 여부 (true: 복리, false: 단리)
 * @returns 목표 금액을 달성하기 위해 필요한 최초 납입액과 세율별 총 납입액
 */
export function calculateSavingsByTarget(
  targetAmount: number,
  termYears: number,
  annualRate: number,
  isCompound: boolean
): {
  initialDeposit: number;
  savingsByTaxType: { regular: number; preferential: number; taxFree: number };
} {
  const totalPeriods = termYears * 12;
  let initialDeposit: number;

  if (isCompound) {
    // 복리 계산 (월 단위 복리)
    initialDeposit = targetAmount / Math.pow(1 + annualRate / 12, totalPeriods);
  } else {
    // 단리 계산
    initialDeposit = targetAmount / (1 + annualRate * termYears);
  }

  // 세율 적용
  const interest = targetAmount - initialDeposit;
  const taxRegular = interest * 0.154; // 일반 세율 15.4%
  const taxPreferential = interest * 0.095; // 세금 우대 9.5%

  return {
    initialDeposit: Math.round(initialDeposit),
    savingsByTaxType: {
      regular: Math.round(initialDeposit + (interest - taxRegular)),
      preferential: Math.round(initialDeposit + (interest - taxPreferential)),
      taxFree: Math.round(initialDeposit + interest),
    },
  };
}
