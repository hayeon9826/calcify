interface DiscountInput {
  originalPrice: number; // 원가 (원)
  discountRate: number; // 할인율 (%)
}

interface DiscountOutput {
  discountAmount: number; // 할인 금액 (원)
  finalPrice: number; // 최종 가격 (원)
}

/**
 * 할인율 계산기
 * @param input - 할인율 계산을 위한 입력 정보
 * @returns 할인 금액과 최종 가격
 */
export function calculateDiscount(input: DiscountInput): DiscountOutput {
  const { originalPrice, discountRate } = input;

  // 할인 금액 계산
  const discountAmount = (originalPrice * discountRate) / 100;

  // 최종 가격 계산
  const finalPrice = originalPrice - discountAmount;

  return {
    discountAmount: Math.round(discountAmount),
    finalPrice: Math.round(finalPrice),
  };
}
