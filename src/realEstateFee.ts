interface CommissionCalculationResult {
  rate: number; // 상한 요율
  commission: number; // 중개 수수료
  commissionWithTax: number; // 부가세 포함 금액
}

type ContractType = "매매계약" | "전세계약" | "월세계약";
type PropertyType = "주택" | "오피스텔" | "분양권" | "그 외";

/**
 * 부동산 중개 수수료 계산기
 * @param contractType - 계약 타입 (매매계약, 전세계약, 월세계약)
 * @param propertyType - 주택 타입 (주택, 오피스텔, 분양권, 그 외)
 * @param rate - 요율 (선택, 기본 요율 사용 시 생략)
 * @param vatRate - 부가세율 (선택, 기본 부가세율 사용 시 생략)
 * @param deposit - 보증금 (만원 단위)
 * @param monthlyRent - 월세액 (선택, 월세계약일 때만)
 * @returns 상한 요율, 중개 수수료, 부가세 포함 금액
 */
export function calculateCommission(
  contractType: ContractType,
  propertyType: PropertyType,
  deposit: number,
  rate?: number,
  vatRate?: number,
  monthlyRent?: number
): CommissionCalculationResult {
  // 기본 요율 설정 (단위: %)
  const defaultRates: {
    [key in PropertyType]: { [key in ContractType]: number };
  } = {
    주택: { 매매계약: 0.9, 전세계약: 0.8, 월세계약: 0.4 },
    오피스텔: { 매매계약: 0.9, 전세계약: 0.8, 월세계약: 0.4 },
    분양권: { 매매계약: 0.9, 전세계약: 0.8, 월세계약: 0.4 },
    "그 외": { 매매계약: 0.9, 전세계약: 0.8, 월세계약: 0.4 },
  };

  // 기본 부가세율 설정 (단위: %)
  const defaultVatRate = 10;

  // 상한 요율 결정
  const appliedRate =
    rate !== undefined ? rate : defaultRates[propertyType][contractType];
  const appliedVatRate = vatRate !== undefined ? vatRate : defaultVatRate;

  // 월세계약일 경우 보증금 + (월세액 * 100) 계산
  const transactionAmount =
    contractType === "월세계약" && monthlyRent !== undefined
      ? deposit + monthlyRent * 100
      : deposit;

  // 중개 수수료 계산
  const commission = transactionAmount * (appliedRate / 100);
  // 부가세 포함 금액 계산
  const commissionWithTax = commission + commission * (appliedVatRate / 100);

  return {
    rate: appliedRate,
    commission: parseFloat(commission.toFixed(2)),
    commissionWithTax: parseFloat(commissionWithTax.toFixed(2)),
  };
}
