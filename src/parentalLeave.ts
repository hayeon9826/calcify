interface ParentalLeaveInput {
  leavePeriod: { months: number; days: number }; // 육아휴직 부여 기간
  spouseLeavePeriod?: { months: number; days: number }; // 배우자 육아휴직 여부 (기간)
  averageMonthlyWage: number; // 통상임금 (월 기준)
}

interface ParentalLeavePayment {
  month: number; // 월 수
  generalLeavePayment: number; // 일반 육아휴직 급여
  bonusLeavePayment?: number; // 아빠 육아휴직 보너스제
  extendedLeavePayment: number; // 6+6 부모 육아휴직제 급여
  retentionPayment?: number; // 잔여지급금 (복직 후 6개월 뒤 지급)
}

interface ParentalLeaveOutput {
  payments: ParentalLeavePayment[]; // 각 달별 급여
  totalGeneralLeavePayment: number; // 일반 육아휴직 총합
  totalBonusLeavePayment: number; // 아빠 육아휴직 보너스제 총합
  totalExtendedLeavePayment: number; // 6+6 부모 육아휴직제 총합
}

export function calculateParentalLeavePay(
  input: ParentalLeaveInput
): ParentalLeaveOutput {
  const { leavePeriod, spouseLeavePeriod, averageMonthlyWage } = input;
  const totalMonths = leavePeriod.months + Math.ceil(leavePeriod.days / 30); // 총 휴직 개월 수 계산

  // 육아휴직 급여 기준 금액 설정
  const generalLeaveBase = Math.min(averageMonthlyWage * 0.8, 1500000); // 통상임금의 80%, 최대 150만 원
  const bonusLeaveBase = 2500000; // 아빠 육아휴직 보너스제는 첫 3개월 250만 원
  const extendedLeaveBase = Math.min(averageMonthlyWage * 0.8, 1500000); // 6+6 부모 육아휴직제 기준 동일

  // 잔여지급금 설정 (복직 후 6개월 뒤 지급)
  const retentionRate = 0.25; // 일반 육아휴직의 25%는 복직 후 6개월 뒤 지급
  const retentionPayment = generalLeaveBase * retentionRate;

  // 계산 결과 초기화
  const payments: ParentalLeavePayment[] = [];
  let totalGeneralLeavePayment = 0;
  let totalBonusLeavePayment = 0;
  let totalExtendedLeavePayment = 0;

  for (let month = 1; month <= totalMonths; month++) {
    const isBonusApplicable =
      spouseLeavePeriod && month <= spouseLeavePeriod.months;
    const generalLeavePayment =
      month <= 6 ? generalLeaveBase : generalLeaveBase * 0.05;
    const bonusLeavePayment =
      isBonusApplicable && month <= 3
        ? bonusLeaveBase
        : generalLeavePayment * 0.8; // 보너스제는 첫 3개월에 적용
    const extendedLeavePayment = extendedLeaveBase; // extendedLeaveBase 사용

    totalGeneralLeavePayment += generalLeavePayment;
    totalBonusLeavePayment += bonusLeavePayment;
    totalExtendedLeavePayment += extendedLeavePayment;

    payments.push({
      month,
      generalLeavePayment:
        generalLeavePayment + (month <= 6 ? retentionPayment : 0),
      bonusLeavePayment: isBonusApplicable ? bonusLeavePayment : undefined,
      extendedLeavePayment:
        extendedLeavePayment + (month <= 6 ? retentionPayment : 0), // extendedLeavePayment 사용
      retentionPayment: month <= 6 ? retentionPayment : 0,
    });
  }

  return {
    payments,
    totalGeneralLeavePayment: Math.round(totalGeneralLeavePayment),
    totalBonusLeavePayment: Math.round(totalBonusLeavePayment),
    totalExtendedLeavePayment: Math.round(totalExtendedLeavePayment),
  };
}
