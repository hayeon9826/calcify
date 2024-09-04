import { ExerciseType } from "./interface/excercise";

// 운동 종류에 따른 시간당 평균 칼로리 소모량 (kcal/hr)
const exerciseCalories: { [key in keyof ExerciseType]: number } = {
  WALK_SLOW: 200,
  WALK_NORMAL: 300,
  WALK_FAST: 400,
  RUN_SLOW: 500,
  RUN_NORMAL: 700,
  RUN_FAST: 900,
  GOLF_DOUBLE: 250,
  GOLF_QUAD: 200,
  BASKETBALL_HALF: 400,
  BASKETBALL_FULL: 600,
  ARCHERY: 150,
  BILLIARDS: 120,
  DANCE_WALTZ: 180,
  DANCE_DISCO: 300,
  DANCE_AEROBICS: 400,
  HIKING: 450,
  RACQUETBALL: 600,
  ROLLER_SKATING: 500,
  BEAUTY_GYMNASTICS: 200,
  VOLLEYBALL_MODERATE: 300,
  VOLLEYBALL_INTENSE: 400,
  BADMINTON_SINGLES: 500,
  BADMINTON_DOUBLES: 350,
  BOATING: 300,
  BOWLING: 200,
  SWIMMING_BACK_25: 400,
  SWIMMING_BACK_40: 600,
  SWIMMING_BUTTERFLY_20: 700,
  SWIMMING_BUTTERFLY_40: 900,
  SWIMMING_FREE_25: 400,
  SWIMMING_FREE_50: 800,
  SQUASH_RECREATIONAL: 500,
  SQUASH_COMPETITIVE: 700,
  SKIING: 500,
  HORSE_WALK: 200,
  HORSE_TROT: 400,
  ICE_SKATING: 500,
  ICE_HOCKEY: 700,
  BASEBALL_FIELDER: 300,
  BASEBALL_PITCHER: 350,
  JUDO: 700,
  CYCLING_FLAT: 300,
  CYCLING_HILL: 800,
  SOCCER_MODERATE: 500,
  SOCCER_INTENSE: 700,
  TABLE_TENNIS: 300,
  TAEKWONDO: 800,
  FENCING_MODERATE: 400,
  FENCING_INTENSE: 600,
  TENNIS_SINGLES: 600,
  TENNIS_DOUBLES: 400,
  FIELD_HOCKEY: 600,
  HIKING_TRAIL: 400,
  HANDBALL_MODERATE: 600,
  HANDBALL_COMPETITIVE: 800,
};

/**
 * 칼로리 소모량 계산 함수
 * @param exerciseType - 운동 종류
 * @param weight - 몸무게 (kg)
 * @param duration - 운동 시간 (분)
 * @returns 소모된 총 칼로리 (kcal)
 */
export function calculateCalories(
  exerciseType: keyof ExerciseType,
  weight: number,
  duration: number
): number {
  const caloriesPerHour = exerciseCalories[exerciseType];
  if (!caloriesPerHour) {
    throw new Error("지원하지 않는 운동 종류입니다.");
  }

  // 칼로리 소모량 계산 (기본 평균 기준은 70kg, 사용자의 몸무게에 비례하여 조정)
  const caloriesBurned = caloriesPerHour * (weight / 70) * (duration / 60);
  return parseFloat(caloriesBurned.toFixed(2));
}
