interface SalaryInput {
  salaryType: "연봉" | "월급"; // 급여 기준
  includeRetirement: "별도" | "포함"; // 퇴직금 포함 여부
  annualSalary: number; // 연봉 (원)
  dependents?: number; // 본인 포함 부양 가족 수 (선택)
  childrenUnder20?: number; // 20세 이하 자녀 수 (선택)
  nonTaxableAmount?: number; // 비과세액 (선택)
}

interface Deduction {
  pension: number; // 국민연금
  healthInsurance: number; // 건강보험
  longTermCare: number; // 장기요양보험
  employmentInsurance: number; // 고용보험
  incomeTax: number; // 소득세
  localIncomeTax: number; // 지방소득세
  totalDeductions: number; // 공제액 합계
}

interface SalaryOutput {
  monthlyNetSalary: number; // 월 예상 실수령액
  monthlyDeductions: Deduction; // 한달 기준 공제액
}

/**
 * 연봉 실수령 계산기
 * @param input - 급여 입력 정보
 * @returns 월 예상 실수령액과 한달 기준 공제액
 */
export function calculateNetSalary(input: SalaryInput): SalaryOutput {
  const {
    salaryType,
    includeRetirement,
    annualSalary,
    dependents = 1,
    childrenUnder20 = 0,
    nonTaxableAmount = 0,
  } = input;

  // 2024년 기준 공제율 설정
  const pensionRate = 0.045; // 국민연금 4.5%
  const healthInsuranceRate = 0.03545; // 건강보험 3.545%
  const longTermCareRate = 0.1227; // 장기요양보험 12.27% of 건강보험
  const employmentInsuranceRate = 0.009; // 고용보험 0.9%

  // 퇴직금 별도일 경우 연봉에서 퇴직금을 제외
  const adjustedAnnualSalary =
    includeRetirement === "포함" ? (annualSalary / 13) * 12 : annualSalary;

  // 월급 계산
  const monthlySalary =
    salaryType === "연봉" ? adjustedAnnualSalary / 12 : adjustedAnnualSalary;

  // 비과세 적용 월급
  const taxableSalary = monthlySalary - nonTaxableAmount;

  // 국민연금 계산 (상한액 기준 적용)
  const pension = Math.min(taxableSalary * pensionRate, 248850); // 국민연금 상한액

  // 건강보험 및 장기요양보험 계산
  const healthInsurance = taxableSalary * healthInsuranceRate;
  const longTermCare = healthInsurance * longTermCareRate;

  // 고용보험 계산
  const employmentInsurance = taxableSalary * employmentInsuranceRate;

  // 소득세 계산 (단순 세율 적용 예시)
  const incomeTax = calculateIncomeTax(
    annualSalary,
    dependents,
    childrenUnder20
  );

  // 지방소득세 계산
  const localIncomeTax = incomeTax * 0.1;

  // 총 공제액
  const totalDeductions =
    pension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localIncomeTax;

  // 월 예상 실수령액 계산
  const monthlyNetSalary = monthlySalary - totalDeductions;

  return {
    monthlyNetSalary: parseFloat(monthlyNetSalary.toFixed(0)),
    monthlyDeductions: {
      pension: parseFloat(pension.toFixed(0)),
      healthInsurance: parseFloat(healthInsurance.toFixed(0)),
      longTermCare: parseFloat(longTermCare.toFixed(0)),
      employmentInsurance: parseFloat(employmentInsurance.toFixed(0)),
      incomeTax: parseFloat(incomeTax.toFixed(0)),
      localIncomeTax: parseFloat(localIncomeTax.toFixed(0)),
      totalDeductions: parseFloat(totalDeductions.toFixed(0)),
    },
  };
}

/**
 * 소득세 계산 함수
 * @param annualSalary - 연봉 (원)
 * @param dependents - 부양 가족 수
 * @param childrenUnder20 - 20세 이하 자녀 수
 * @returns 소득세 (원)
 */
function calculateIncomeTax(
  annualSalary: number,
  dependents: number,
  childrenUnder20: number
): number {
  // 기본 공제 계산 (2024년 기준 세율에 따른 단순 계산 예시)
  const basicDeduction = 1500000; // 인당 기본 공제
  const childDeduction = 1500000; // 자녀 공제
  const taxableIncome =
    annualSalary -
    basicDeduction * dependents -
    childDeduction * childrenUnder20;

  // 예시: 과세표준에 따른 세율 적용 (단순화된 예시)
  let tax = 0;
  if (taxableIncome <= 12000000) {
    tax = taxableIncome * 0.06;
  } else if (taxableIncome <= 46000000) {
    tax = 12000000 * 0.06 + (taxableIncome - 12000000) * 0.15;
  } else if (taxableIncome <= 88000000) {
    tax =
      12000000 * 0.06 +
      (46000000 - 12000000) * 0.15 +
      (taxableIncome - 46000000) * 0.24;
  } else {
    tax =
      12000000 * 0.06 +
      (46000000 - 12000000) * 0.15 +
      (88000000 - 46000000) * 0.24 +
      (taxableIncome - 88000000) * 0.35;
  }

  return Math.max(0, tax); // 음수 방지를 위해 0 이상으로
}
