/**
 * 전세 vs 월세 계산기
 * @param rentLoanAmount - 월세 대출 금액
 * @param rentLoanRate - 월세 대출 금리 (소수로 입력, 예: 0.05 = 5%)
 * @param monthlyRent - 월세 금액
 * @param leaseLoanAmount - 전세 대출 금액
 * @param leaseLoanRate - 전세 대출 금리 (소수로 입력, 예: 0.05 = 5%)
 * @returns 전세와 월세의 비용 비교 결과
 */
export function compareRentAndLease(
  rentLoanAmount: number,
  rentLoanRate: number,
  monthlyRent: number,
  leaseLoanAmount: number,
  leaseLoanRate: number
): { cheaperOption: string; costDifference: number } {
  // 월세 총 비용: 월세 대출 이자 + 월세
  const monthlyRentLoanInterest = (rentLoanAmount * rentLoanRate) / 12;
  const totalRentCost = monthlyRentLoanInterest + monthlyRent;

  // 전세 총 비용: 전세 대출 이자
  const monthlyLeaseLoanInterest = (leaseLoanAmount * leaseLoanRate) / 12;
  const totalLeaseCost = monthlyLeaseLoanInterest;

  if (totalRentCost < totalLeaseCost) {
    return {
      cheaperOption: "월세",
      costDifference: totalLeaseCost - totalRentCost,
    };
  } else {
    return {
      cheaperOption: "전세",
      costDifference: totalRentCost - totalLeaseCost,
    };
  }
}

interface RepaymentDetail {
  month: number;
  interest: number;
  principal: number;
  totalPayment: number;
}

interface LoanCalculationResult {
  repaymentDetails: RepaymentDetail[];
  monthlyPayment: number;
  totalInterest: number;
}

/**
 * 대출 상환 계산기
 * @param repaymentType - 상환 방식 ('원리금균등상환', '원금균등상환', '만기일시상환')
 * @param principal - 대출 금액 (원)
 * @param annualRate - 연 이자율 (소수로 입력, 예: 0.032 = 3.2%)
 * @param termYears - 상환 기간 (년 단위)
 * @param gracePeriod - 거치 기간 (개월 단위, 기본값 0)
 * @returns 매월 상환 금액과 각 회차별 이자, 원금 내역
 */
export function calculateLoanRepayment(
  repaymentType: "원리금균등상환" | "원금균등상환" | "만기일시상환",
  principal: number,
  annualRate: number,
  termYears: number,
  gracePeriod: number = 0
): LoanCalculationResult {
  const monthlyRate = annualRate / 12; // 월 이자율
  const totalMonths = termYears * 12; // 총 상환 기간(개월)
  const repaymentMonths = totalMonths - gracePeriod; // 실제 원금 상환 개월 수
  let repaymentDetails: RepaymentDetail[] = [];
  let totalInterest = 0;

  switch (repaymentType) {
    case "원리금균등상환":
      const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -repaymentMonths));
      let currentPrincipal = principal;

      for (let month = 1; month <= totalMonths; month++) {
        let interest = currentPrincipal * monthlyRate;
        let principalPayment = monthlyPayment - interest;

        if (month <= gracePeriod) {
          // 거치 기간 동안 이자만 납부
          repaymentDetails.push({
            month,
            interest,
            principal: 0,
            totalPayment: interest,
          });
        } else {
          // 원리금 상환
          currentPrincipal -= principalPayment;
          repaymentDetails.push({
            month,
            interest,
            principal: principalPayment,
            totalPayment: monthlyPayment,
          });
        }

        totalInterest += interest;
      }
      return { repaymentDetails, monthlyPayment, totalInterest };

    case "원금균등상환":
      const monthlyPrincipalPayment = principal / repaymentMonths;
      currentPrincipal = principal;

      for (let month = 1; month <= totalMonths; month++) {
        let interest = currentPrincipal * monthlyRate;

        if (month <= gracePeriod) {
          // 거치 기간 동안 이자만 납부
          repaymentDetails.push({
            month,
            interest,
            principal: 0,
            totalPayment: interest,
          });
        } else {
          // 원금균등 상환
          currentPrincipal -= monthlyPrincipalPayment;
          repaymentDetails.push({
            month,
            interest,
            principal: monthlyPrincipalPayment,
            totalPayment: monthlyPrincipalPayment + interest,
          });
        }

        totalInterest += interest;
      }
      return {
        repaymentDetails,
        monthlyPayment: monthlyPrincipalPayment + principal * monthlyRate,
        totalInterest,
      };

    case "만기일시상환":
      // 만기일시 상환은 거치 기간 동안 이자만 납부하고, 만기 시 원금을 한 번에 상환
      const monthlyInterest = principal * monthlyRate;

      for (let month = 1; month <= totalMonths; month++) {
        if (month <= gracePeriod || month < totalMonths) {
          // 거치 기간 동안 이자만 납부
          repaymentDetails.push({
            month,
            interest: monthlyInterest,
            principal: 0,
            totalPayment: monthlyInterest,
          });
        } else {
          // 만기일에 원금을 한 번에 상환
          repaymentDetails.push({
            month,
            interest: monthlyInterest,
            principal,
            totalPayment: principal + monthlyInterest,
          });
        }

        totalInterest += monthlyInterest;
      }
      return {
        repaymentDetails,
        monthlyPayment: monthlyInterest,
        totalInterest,
      };

    default:
      throw new Error("잘못된 상환 방식이 입력되었습니다.");
  }
}

interface HousePriceCalculationResult {
  affordableHousePrice: number; // 적정 주택 구입 가격
  requiredLoanAmount: number; // 필요 대출 금액
}

/**
 * 내게 맞는 집 가격 계산기
 * @param currentSavings - 현재 보유 금액 (원)
 * @param monthlyIncome - 월 급여 (원)
 * @param monthlyExpenses - 월 필요 지출 (원)
 * @param annualRate - 대출 금리 (소수로 입력, 예: 0.032 = 3.2%)
 * @param loanTermYears - 상환 기간 (년 단위)
 * @returns 적정 주택 구입 가격과 필요 대출 금액
 */
export function calculateAffordableHousePrice(
  currentSavings: number,
  monthlyIncome: number,
  monthlyExpenses: number,
  annualRate: number,
  loanTermYears: number
): HousePriceCalculationResult {
  const availableMonthlySavings = monthlyIncome - monthlyExpenses;
  const monthlyRate = annualRate / 12; // 월 이자율
  const repaymentMonths = loanTermYears * 12; // 총 상환 기간(개월)

  // 사용자가 감당할 수 있는 최대 대출 금액을 계산 (원리금 균등 상환 방식)
  const maxLoanAmount =
    (availableMonthlySavings *
      (1 - Math.pow(1 + monthlyRate, -repaymentMonths))) /
    monthlyRate;

  // 적정 주택 구입 가격 = 현재 보유 금액 + 최대 대출 가능 금액
  const affordableHousePrice = currentSavings + maxLoanAmount;

  // 필요 대출 금액 = 적정 주택 가격 - 현재 보유 금액
  const requiredLoanAmount = maxLoanAmount;

  return {
    affordableHousePrice: Math.round(affordableHousePrice),
    requiredLoanAmount: Math.round(requiredLoanAmount),
  };
}

/**
 * 대출 금액 조절에 따른 적정 주택 구입 가격과 필요 대출 금액 재계산
 * @param currentSavings - 현재 보유 금액 (원)
 * @param adjustedLoanAmount - 사용자가 조정한 대출 금액 (원)
 * @returns 적정 주택 구입 가격과 조정된 필요 대출 금액
 */
export function adjustLoanAmount(
  currentSavings: number,
  adjustedLoanAmount: number
): HousePriceCalculationResult {
  const affordableHousePrice = currentSavings + adjustedLoanAmount;

  return {
    affordableHousePrice: Math.round(affordableHousePrice),
    requiredLoanAmount: Math.round(adjustedLoanAmount),
  };
}
