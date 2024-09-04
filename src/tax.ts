interface TaxResult {
  taxName: string;
  taxAmount: number;
  details: string;
}

interface IncomeTaxInput {
  grossSalary: number; // 총 급여
  dependents?: number; // 부양 가족 수
  childrenUnder20?: number; // 20세 이하 자녀 수
  nonTaxableAmount?: number; // 비과세액
}

interface SocialInsuranceInput {
  grossSalary: number; // 총 급여
}

interface CorporationTaxInput {
  netProfit: number; // 법인 순이익
}

interface CompositeIncomeTaxInput {
  grossIncome: number; // 총 소득
  deductibleExpenses?: number; // 필요 경비
}

interface TransferIncomeTaxInput {
  transferAmount: number; // 양도가액
  acquisitionAmount: number; // 취득가액
  necessaryExpenses: number; // 필요경비
  ownershipPeriod: number; // 보유기간 (년 단위)
  propertyType: "주택" | "토지" | "기타"; // 자산 종류
}

interface RetirementIncomeTaxInput {
  retirementPay: number; // 퇴직급여
  yearsOfService: number; // 근속연수
}

interface PensionIncomeTaxInput {
  pensionAmount: number; // 연금 수령액
  pensionType: "국민연금" | "공무원연금" | "사학연금"; // 연금 종류
}

interface FinancialIncomeTaxInput {
  financialIncome: number; // 금융 소득
}

interface InterestIncomeTaxInput {
  interestIncome: number; // 이자 소득
}

interface DividendIncomeTaxInput {
  dividendIncome: number; // 배당 소득
}

interface BusinessIncomeTaxInput {
  businessIncome: number; // 사업 소득
  deductibleExpenses?: number; // 필요 경비
}

/**
 * 근로 소득세 계산기
 * @param input - 근로 소득세 입력 정보
 * @returns 근로 소득세 결과
 */
export function calculateIncomeTax(input: IncomeTaxInput): TaxResult {
  const {
    grossSalary,
    dependents = 1,
    childrenUnder20 = 0,
    nonTaxableAmount = 0,
  } = input;
  const basicDeduction = 1500000; // 인당 기본 공제
  const childDeduction = 1500000; // 자녀 공제
  const taxableIncome =
    grossSalary -
    nonTaxableAmount -
    basicDeduction * dependents -
    childDeduction * childrenUnder20;

  let incomeTax = 0;
  if (taxableIncome <= 12000000) {
    incomeTax = taxableIncome * 0.06;
  } else if (taxableIncome <= 46000000) {
    incomeTax = 12000000 * 0.06 + (taxableIncome - 12000000) * 0.15;
  } else if (taxableIncome <= 88000000) {
    incomeTax =
      12000000 * 0.06 +
      (46000000 - 12000000) * 0.15 +
      (taxableIncome - 46000000) * 0.24;
  } else {
    incomeTax =
      12000000 * 0.06 +
      (46000000 - 12000000) * 0.15 +
      (88000000 - 46000000) * 0.24 +
      (taxableIncome - 88000000) * 0.35;
  }

  return {
    taxName: "근로 소득세",
    taxAmount: Math.max(0, Math.round(incomeTax)),
    details: `과세 표준에 따라 근로 소득세가 계산됩니다. 총 급여: ${grossSalary.toLocaleString()}원, 비과세액: ${nonTaxableAmount.toLocaleString()}원, 부양가족 공제: ${basicDeduction.toLocaleString()}원 x ${dependents}, 자녀 공제: ${childDeduction.toLocaleString()}원 x ${childrenUnder20}`,
  };
}

/**
 * 4대 보험 계산기
 * @param input - 4대 보험 입력 정보
 * @returns 4대 보험 결과
 */
export function calculateSocialInsurance(
  input: SocialInsuranceInput
): TaxResult {
  const { grossSalary } = input;
  const pension = Math.min(grossSalary * 0.045, 248850); // 국민연금 상한액 기준
  const healthInsurance = grossSalary * 0.03545; // 건강보험
  const longTermCare = healthInsurance * 0.1227; // 장기요양보험
  const employmentInsurance = grossSalary * 0.009; // 고용보험

  const totalInsurance =
    pension + healthInsurance + longTermCare + employmentInsurance;

  return {
    taxName: "4대 보험",
    taxAmount: Math.round(totalInsurance),
    details: `총 급여의 4대 보험 공제액 계산: 국민연금 ${pension.toLocaleString()}원, 건강보험 ${healthInsurance.toLocaleString()}원, 장기요양보험 ${longTermCare.toLocaleString()}원, 고용보험 ${employmentInsurance.toLocaleString()}원`,
  };
}

/**
 * 법인세 계산기
 * @param input - 법인세 입력 정보
 * @returns 법인세 결과
 */
export function calculateCorporationTax(input: CorporationTaxInput): TaxResult {
  const { netProfit } = input;
  let corporationTax = 0;

  if (netProfit <= 200000000) {
    corporationTax = netProfit * 0.1; // 2억 이하
  } else if (netProfit <= 20000000000) {
    corporationTax = 200000000 * 0.1 + (netProfit - 200000000) * 0.2; // 2억 초과 ~ 200억 이하
  } else {
    corporationTax =
      200000000 * 0.1 +
      (20000000000 - 200000000) * 0.2 +
      (netProfit - 20000000000) * 0.22; // 200억 초과
  }

  return {
    taxName: "법인세",
    taxAmount: Math.round(corporationTax),
    details: `순이익에 따른 법인세 계산: 순이익 ${netProfit.toLocaleString()}원, 세율 적용`,
  };
}

/**
 * 종합 소득세 계산기
 * @param input - 종합 소득세 입력 정보
 * @returns 종합 소득세 결과
 */
export function calculateCompositeIncomeTax(
  input: CompositeIncomeTaxInput
): TaxResult {
  const { grossIncome, deductibleExpenses = 0 } = input;
  const taxableIncome = grossIncome - deductibleExpenses;
  let compositeIncomeTax = 0;

  if (taxableIncome <= 12000000) {
    compositeIncomeTax = taxableIncome * 0.06;
  } else if (taxableIncome <= 46000000) {
    compositeIncomeTax = 12000000 * 0.06 + (taxableIncome - 12000000) * 0.15;
  } else if (taxableIncome <= 88000000) {
    compositeIncomeTax =
      12000000 * 0.06 +
      (46000000 - 12000000) * 0.15 +
      (taxableIncome - 46000000) * 0.24;
  } else {
    compositeIncomeTax =
      12000000 * 0.06 +
      (46000000 - 12000000) * 0.15 +
      (88000000 - 46000000) * 0.24 +
      (taxableIncome - 88000000) * 0.35;
  }

  return {
    taxName: "종합 소득세",
    taxAmount: Math.round(compositeIncomeTax),
    details: `과세표준에 따라 종합 소득세가 계산됩니다. 총 소득: ${grossIncome.toLocaleString()}원, 필요경비: ${deductibleExpenses.toLocaleString()}원`,
  };
}

/**
 * 양도 소득세 계산기
 * @param input - 양도 소득세 입력 정보
 * @returns 양도 소득세 결과
 */
export function calculateTransferIncomeTax(
  input: TransferIncomeTaxInput
): TaxResult {
  const {
    transferAmount,
    acquisitionAmount,
    necessaryExpenses,
    ownershipPeriod,
    propertyType,
  } = input;
  const capitalGain = transferAmount - acquisitionAmount - necessaryExpenses;
  let transferTaxRate = 0;

  if (propertyType === "주택") {
    transferTaxRate = ownershipPeriod >= 10 ? 0.1 : 0.2; // 주택의 경우 보유 기간에 따라 세율이 다름
  } else {
    transferTaxRate = 0.3; // 토지나 기타 자산의 경우
  }

  const transferIncomeTax = capitalGain * transferTaxRate;

  return {
    taxName: "양도 소득세",
    taxAmount: Math.round(transferIncomeTax),
    details: `양도차익에 따라 양도 소득세가 계산됩니다. 양도가액: ${transferAmount.toLocaleString()}원, 취득가액: ${acquisitionAmount.toLocaleString()}원, 필요경비: ${necessaryExpenses.toLocaleString()}원, 보유기간: ${ownershipPeriod}년, 자산 종류: ${propertyType}`,
  };
}

/**
 * 퇴직 소득세 계산기
 * @param input - 퇴직 소득세 입력 정보
 * @returns 퇴직 소득세 결과
 */
export function calculateRetirementIncomeTax(
  input: RetirementIncomeTaxInput
): TaxResult {
  const { retirementPay, yearsOfService } = input;
  const basicAllowance = 1200000 * yearsOfService; // 기본공제
  const taxableIncome = retirementPay - basicAllowance;
  const retirementTax = taxableIncome * 0.05; // 단순 세율 적용 예시

  return {
    taxName: "퇴직 소득세",
    taxAmount: Math.round(retirementTax),
    details: `퇴직급여에 따른 퇴직 소득세가 계산됩니다. 퇴직급여: ${retirementPay.toLocaleString()}원, 근속연수: ${yearsOfService}년, 기본공제: ${basicAllowance.toLocaleString()}원`,
  };
}

/**
 * 연금 소득세 계산기
 * @param input - 연금 소득세 입력 정보
 * @returns 연금 소득세 결과
 */
export function calculatePensionIncomeTax(
  input: PensionIncomeTaxInput
): TaxResult {
  const { pensionAmount, pensionType } = input;
  let pensionTaxRate = 0.05; // 기본 연금 소득세율

  if (pensionType === "국민연금") {
    pensionTaxRate = 0.03; // 국민연금에 대한 우대 세율 적용
  }

  const pensionIncomeTax = pensionAmount * pensionTaxRate;

  return {
    taxName: "연금 소득세",
    taxAmount: Math.round(pensionIncomeTax),
    details: `연금 수령액에 따라 연금 소득세가 계산됩니다. 연금 수령액: ${pensionAmount.toLocaleString()}원, 연금 종류: ${pensionType}`,
  };
}

/**
 * 금융소득 종합과세 계산기
 * @param input - 금융소득 종합과세 입력 정보
 * @returns 금융소득 종합과세 결과
 */
export function calculateFinancialIncomeTax(
  input: FinancialIncomeTaxInput
): TaxResult {
  const { financialIncome } = input;
  let financialTaxRate = financialIncome > 20000000 ? 0.15 : 0.14; // 2천만원 초과 시 15%, 이하 시 14%

  const financialIncomeTax = financialIncome * financialTaxRate;

  return {
    taxName: "금융소득 종합과세",
    taxAmount: Math.round(financialIncomeTax),
    details: `금융소득에 따라 종합과세가 적용됩니다. 금융 소득: ${financialIncome.toLocaleString()}원, 세율: ${
      financialTaxRate * 100
    }%`,
  };
}

/**
 * 이자 소득세 계산기
 * @param input - 이자 소득세 입력 정보
 * @returns 이자 소득세 결과
 */
export function calculateInterestIncomeTax(
  input: InterestIncomeTaxInput
): TaxResult {
  const { interestIncome } = input;
  const interestTaxRate = 0.15; // 이자 소득에 대한 기본 세율 15%

  const interestIncomeTax = interestIncome * interestTaxRate;

  return {
    taxName: "이자 소득세",
    taxAmount: Math.round(interestIncomeTax),
    details: `이자 소득에 대해 15%의 세율이 적용됩니다. 이자 소득: ${interestIncome.toLocaleString()}원`,
  };
}

/**
 * 배당 소득세 계산기
 * @param input - 배당 소득세 입력 정보
 * @returns 배당 소득세 결과
 */
export function calculateDividendIncomeTax(
  input: DividendIncomeTaxInput
): TaxResult {
  const { dividendIncome } = input;
  const dividendTaxRate = 0.15; // 배당 소득에 대한 기본 세율 15%

  const dividendIncomeTax = dividendIncome * dividendTaxRate;

  return {
    taxName: "배당 소득세",
    taxAmount: Math.round(dividendIncomeTax),
    details: `배당 소득에 대해 15%의 세율이 적용됩니다. 배당 소득: ${dividendIncome.toLocaleString()}원`,
  };
}

/**
 * 사업 소득세 계산기
 * @param input - 사업 소득세 입력 정보
 * @returns 사업 소득세 결과
 */
export function calculateBusinessIncomeTax(
  input: BusinessIncomeTaxInput
): TaxResult {
  const { businessIncome, deductibleExpenses = 0 } = input;
  const taxableIncome = businessIncome - deductibleExpenses;
  let businessIncomeTax = 0;

  if (taxableIncome <= 12000000) {
    businessIncomeTax = taxableIncome * 0.06;
  } else if (taxableIncome <= 46000000) {
    businessIncomeTax = 12000000 * 0.06 + (taxableIncome - 12000000) * 0.15;
  } else if (taxableIncome <= 88000000) {
    businessIncomeTax =
      12000000 * 0.06 +
      (46000000 - 12000000) * 0.15 +
      (taxableIncome - 46000000) * 0.24;
  } else {
    businessIncomeTax =
      12000000 * 0.06 +
      (46000000 - 12000000) * 0.15 +
      (88000000 - 46000000) * 0.24 +
      (taxableIncome - 88000000) * 0.35;
  }

  return {
    taxName: "사업 소득세",
    taxAmount: Math.round(businessIncomeTax),
    details: `과세표준에 따라 사업 소득세가 계산됩니다. 사업 소득: ${businessIncome.toLocaleString()}원, 필요경비: ${deductibleExpenses.toLocaleString()}원`,
  };
}

interface CarTaxInput {
  engineDisplacement: number; // 배기량 (cc)
  carAge: number; // 차량 연식 (년도)
  carType: "승용차" | "승합차" | "화물차" | "특수차"; // 차량 종류
}

interface CarTaxOutput {
  baseTax: number; // 기본 자동차세 (원)
  ageDiscount: number; // 차량 연식에 따른 감면액 (원)
  totalTax: number; // 최종 자동차세 (원)
}

/**
 * 자동차세 계산기
 * @param input - 자동차세 계산을 위한 입력 정보
 * @returns 자동차세 결과
 */
export function calculateCarTax(input: CarTaxInput): CarTaxOutput {
  const { engineDisplacement, carAge, carType } = input;

  // 배기량에 따른 기본 자동차세 (승용차 기준)
  let baseTax = 0;

  if (carType === "승용차") {
    if (engineDisplacement <= 1000) {
      baseTax = engineDisplacement * 80; // 1000cc 이하: cc당 80원
    } else if (engineDisplacement <= 1600) {
      baseTax = engineDisplacement * 140; // 1001cc ~ 1600cc: cc당 140원
    } else {
      baseTax = engineDisplacement * 200; // 1601cc 이상: cc당 200원
    }
  } else if (carType === "승합차") {
    baseTax = engineDisplacement * 65; // 승합차: cc당 65원
  } else if (carType === "화물차") {
    baseTax = 28500; // 화물차: 고정 세율 (2톤 이하 기준)
  } else if (carType === "특수차") {
    baseTax = 60000; // 특수차: 고정 세율
  }

  // 차량 연식에 따른 감면율 계산 (연식 3년 이후부터 적용)
  let ageDiscountRate = 0;
  if (carAge > 2) {
    const excessYears = carAge - 2;
    ageDiscountRate = Math.min(excessYears * 0.05, 0.5); // 최대 50%까지 감면
  }

  const ageDiscount = baseTax * ageDiscountRate;
  const totalTax = baseTax - ageDiscount;

  return {
    baseTax: Math.round(baseTax),
    ageDiscount: Math.round(ageDiscount),
    totalTax: Math.round(totalTax),
  };
}
