import KoreanLunarCalendar from "korean-lunar-calendar";

interface DateConversionResult {
  originalDate: string; // 입력된 날짜
  convertedDate: string; // 변환된 날짜
  type: "음력" | "양력"; // 변환된 날짜의 유형
}

/**
 * 음력 <-> 양력 변환기
 * @param isLunar - 입력된 날짜가 음력인지 여부 (true: 음력, false: 양력)
 * @param date - 날짜 (YYYY-MM-DD 형식)
 * @returns 변환된 날짜와 그 유형
 */
export function convertDate(
  isLunar: boolean,
  date: string
): DateConversionResult {
  const [year, month, day] = date.split("-").map(Number);
  const calendar = new KoreanLunarCalendar();

  if (isLunar) {
    // 음력 -> 양력 변환
    const isIntercalation = false; // 윤달 여부, 필요시 사용자가 입력받거나 고정값 설정
    calendar.setLunarDate(year, month, day, isIntercalation);
    const solarDate = calendar.getSolarCalendar();
    return {
      originalDate: date,
      convertedDate: `${solarDate.year}-${padZero(solarDate.month)}-${padZero(
        solarDate.day
      )}`,
      type: "양력",
    };
  } else {
    // 양력 -> 음력 변환
    calendar.setSolarDate(year, month, day);
    const lunarDate = calendar.getLunarCalendar();
    return {
      originalDate: date,
      convertedDate: `${lunarDate.year}-${padZero(lunarDate.month)}-${padZero(
        lunarDate.day
      )}`,
      type: "음력",
    };
  }
}

/**
 * 숫자를 두 자리로 변환하는 보조 함수
 * @param num - 숫자
 * @returns 두 자리 문자열 (예: 1 -> "01")
 */
function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * 띠를 계산하는 함수
 * @param year - 생년 (예: 1990)
 * @returns 띠 (쥐, 소, 호랑이, ...)
 */
export function getZodiac(year: number): string {
  const zodiacs = [
    "쥐",
    "소",
    "호랑이",
    "토끼",
    "용",
    "뱀",
    "말",
    "양",
    "원숭이",
    "닭",
    "개",
    "돼지",
  ];
  const zodiacIndex = (year - 4) % 12; // 4년을 기준으로 12지 순환
  return zodiacs[zodiacIndex];
}

interface StarSign {
  name: string; // 별자리 이름
  start: [number, number]; // 시작 월, 일
  end: [number, number]; // 종료 월, 일
}

/**
 * 별자리를 계산하는 함수
 * @param month - 생월 (예: 4)
 * @param day - 생일 (예: 15)
 * @returns 별자리 (물병자리, 양자리, ...)
 */
export function getStarSign(month: number, day: number): string {
  const starSigns: StarSign[] = [
    { name: "물병자리", start: [1, 20], end: [2, 18] },
    { name: "물고기자리", start: [2, 19], end: [3, 20] },
    { name: "양자리", start: [3, 21], end: [4, 19] },
    { name: "황소자리", start: [4, 20], end: [5, 20] },
    { name: "쌍둥이자리", start: [5, 21], end: [6, 21] },
    { name: "게자리", start: [6, 22], end: [7, 22] },
    { name: "사자자리", start: [7, 23], end: [8, 22] },
    { name: "처녀자리", start: [8, 23], end: [9, 22] },
    { name: "천칭자리", start: [9, 23], end: [10, 22] },
    { name: "전갈자리", start: [10, 23], end: [11, 22] },
    { name: "사수자리", start: [11, 23], end: [12, 21] },
    { name: "염소자리", start: [12, 22], end: [1, 19] },
  ];

  // 별자리 찾기
  for (const sign of starSigns) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;

    if (
      (startMonth === month && day >= startDay) ||
      (endMonth === month && day <= endDay) ||
      (startMonth < month && month < endMonth) ||
      (startMonth === 12 && month === 1 && day <= endDay) // 염소자리 예외 처리
    ) {
      return sign.name;
    }
  }

  return "별자리 계산 오류"; // 잘못된 날짜가 입력된 경우
}
