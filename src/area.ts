/**
 * 평형과 제곱미터를 상호 변환하는 함수
 * @param value - 변환할 값 (숫자)
 * @param convertTo - 변환할 기준 ('평형' 또는 '제곱미터')
 * @returns 변환된 값
 */
export function convertArea(
  value: number,
  convertTo: "평형" | "제곱미터"
): number {
  const pyeongToSquareMeter = 3.3058; // 1평 = 3.3058제곱미터

  if (convertTo === "제곱미터") {
    // 평형을 제곱미터로 변환
    return parseFloat((value * pyeongToSquareMeter).toFixed(2));
  } else if (convertTo === "평형") {
    // 제곱미터를 평형으로 변환
    return parseFloat((value / pyeongToSquareMeter).toFixed(2));
  } else {
    throw new Error(
      '지원하지 않는 변환 기준입니다. "평형" 또는 "제곱미터"를 선택하세요.'
    );
  }
}
