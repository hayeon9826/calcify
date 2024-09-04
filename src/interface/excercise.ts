// 운동 종류를 타입으로 정의
export interface ExerciseType {
  WALK_SLOW: "걷기(천천히)";
  WALK_NORMAL: "걷기 (평균)";
  WALK_FAST: "걷기 (빠르게)";
  RUN_SLOW: "달리기(천천히)";
  RUN_NORMAL: "달리기(평균)";
  RUN_FAST: "달리기(빠르게)";
  GOLF_DOUBLE: "골프 (2인조)";
  GOLF_QUAD: "골프 (4인조)";
  BASKETBALL_HALF: "농구 (하프코트)";
  BASKETBALL_FULL: "농구 (풀코트)";
  ARCHERY: "궁도";
  BILLIARDS: "당구";
  DANCE_WALTZ: "댄싱 (왈츠)";
  DANCE_DISCO: "댄싱 (디스코)";
  DANCE_AEROBICS: "댄싱 (에어로빅)";
  HIKING: "등산";
  RACQUETBALL: "라켓볼";
  ROLLER_SKATING: "롤러 스케이팅";
  BEAUTY_GYMNASTICS: "미용체조";
  VOLLEYBALL_MODERATE: "배구 (중정도)";
  VOLLEYBALL_INTENSE: "배구 (심하게)";
  BADMINTON_SINGLES: "배드민턴 단식";
  BADMINTON_DOUBLES: "배드민턴 복식";
  BOATING: "보트 타기";
  BOWLING: "볼링";
  SWIMMING_BACK_25: "수영 (배영 25yard/min)";
  SWIMMING_BACK_40: "수영 (배영 40yard/min)";
  SWIMMING_BUTTERFLY_20: "수영 (접영 20yard/min)";
  SWIMMING_BUTTERFLY_40: "수영 (접영 40yard/min)";
  SWIMMING_FREE_25: "수영 (자유형 25yard/min)";
  SWIMMING_FREE_50: "수영 (자유형 50yard/min)";
  SQUASH_RECREATIONAL: "스쿼시 (레크리에이션)";
  SQUASH_COMPETITIVE: "스쿼시 (경기)";
  SKIING: "스키";
  HORSE_WALK: "승마 (걷기)";
  HORSE_TROT: "승마 (속보)";
  ICE_SKATING: "아이스 스케이팅";
  ICE_HOCKEY: "아이스하키";
  BASEBALL_FIELDER: "야구 (야수)";
  BASEBALL_PITCHER: "야구 (투수)";
  JUDO: "유도";
  CYCLING_FLAT: "자전거 타기 (평지를 천천히)";
  CYCLING_HILL: "자전거 타기 (경사지를 질주)";
  SOCCER_MODERATE: "축구 (중정도)";
  SOCCER_INTENSE: "축구 (심하게)";
  TABLE_TENNIS: "탁구";
  TAEKWONDO: "태권도";
  FENCING_MODERATE: "팬싱 (중정도)";
  FENCING_INTENSE: "팬싱 (심하게)";
  TENNIS_SINGLES: "테니스 (단식)";
  TENNIS_DOUBLES: "테니스 (복식)";
  FIELD_HOCKEY: "필드하키";
  HIKING_TRAIL: "하이킹";
  HANDBALL_MODERATE: "핸드볼 (중정도)";
  HANDBALL_COMPETITIVE: "핸드볼 (경기)";
}

// 운동 종류를 객체로 정의하여 사용
export const EXERCISES: ExerciseType = {
  WALK_SLOW: "걷기(천천히)",
  WALK_NORMAL: "걷기 (평균)",
  WALK_FAST: "걷기 (빠르게)",
  RUN_SLOW: "달리기(천천히)",
  RUN_NORMAL: "달리기(평균)",
  RUN_FAST: "달리기(빠르게)",
  GOLF_DOUBLE: "골프 (2인조)",
  GOLF_QUAD: "골프 (4인조)",
  BASKETBALL_HALF: "농구 (하프코트)",
  BASKETBALL_FULL: "농구 (풀코트)",
  ARCHERY: "궁도",
  BILLIARDS: "당구",
  DANCE_WALTZ: "댄싱 (왈츠)",
  DANCE_DISCO: "댄싱 (디스코)",
  DANCE_AEROBICS: "댄싱 (에어로빅)",
  HIKING: "등산",
  RACQUETBALL: "라켓볼",
  ROLLER_SKATING: "롤러 스케이팅",
  BEAUTY_GYMNASTICS: "미용체조",
  VOLLEYBALL_MODERATE: "배구 (중정도)",
  VOLLEYBALL_INTENSE: "배구 (심하게)",
  BADMINTON_SINGLES: "배드민턴 단식",
  BADMINTON_DOUBLES: "배드민턴 복식",
  BOATING: "보트 타기",
  BOWLING: "볼링",
  SWIMMING_BACK_25: "수영 (배영 25yard/min)",
  SWIMMING_BACK_40: "수영 (배영 40yard/min)",
  SWIMMING_BUTTERFLY_20: "수영 (접영 20yard/min)",
  SWIMMING_BUTTERFLY_40: "수영 (접영 40yard/min)",
  SWIMMING_FREE_25: "수영 (자유형 25yard/min)",
  SWIMMING_FREE_50: "수영 (자유형 50yard/min)",
  SQUASH_RECREATIONAL: "스쿼시 (레크리에이션)",
  SQUASH_COMPETITIVE: "스쿼시 (경기)",
  SKIING: "스키",
  HORSE_WALK: "승마 (걷기)",
  HORSE_TROT: "승마 (속보)",
  ICE_SKATING: "아이스 스케이팅",
  ICE_HOCKEY: "아이스하키",
  BASEBALL_FIELDER: "야구 (야수)",
  BASEBALL_PITCHER: "야구 (투수)",
  JUDO: "유도",
  CYCLING_FLAT: "자전거 타기 (평지를 천천히)",
  CYCLING_HILL: "자전거 타기 (경사지를 질주)",
  SOCCER_MODERATE: "축구 (중정도)",
  SOCCER_INTENSE: "축구 (심하게)",
  TABLE_TENNIS: "탁구",
  TAEKWONDO: "태권도",
  FENCING_MODERATE: "팬싱 (중정도)",
  FENCING_INTENSE: "팬싱 (심하게)",
  TENNIS_SINGLES: "테니스 (단식)",
  TENNIS_DOUBLES: "테니스 (복식)",
  FIELD_HOCKEY: "필드하키",
  HIKING_TRAIL: "하이킹",
  HANDBALL_MODERATE: "핸드볼 (중정도)",
  HANDBALL_COMPETITIVE: "핸드볼 (경기)",
};
