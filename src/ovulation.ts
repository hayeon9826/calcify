interface OvulationInput {
  lastPeriodStartDate: Date; // 최근 생리 시작일
  cycleLength: number; // 생리 주기 (일)
}

interface OvulationOutput {
  ovulationDate: Date; // 배란 예정일
  fertileWindowStart: Date; // 임신 가능 기간 시작일
  fertileWindowEnd: Date; // 임신 가능 기간 종료일
}

/**
 * 배란일 계산기
 * @param input - 배란일 계산을 위한 입력 정보
 * @returns 배란 예정일과 임신 가능 기간
 */
export function calculateOvulation(input: OvulationInput): OvulationOutput {
  const { lastPeriodStartDate, cycleLength } = input;

  // 배란일 계산 (생리 주기의 중간점, 일반적으로 주기에서 14일 전이 배란일)
  const ovulationDate = new Date(lastPeriodStartDate);
  ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);

  // 임신 가능 기간 계산 (배란일 전후 5일을 임신 가능 기간으로 설정)
  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

  return {
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
  };
}
