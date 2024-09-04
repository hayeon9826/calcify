interface Course {
  scale: number; // 학점 기준 (4.5 또는 4.3)
  courseName: string; // 과목명
  credits: number; // 학점 (1, 2, 3, ...)
  grade: string; // 성적 (A+, A, A-, ...)
  isMajor: boolean; // 전공 여부
}

interface GradeCalculationResult {
  totalGPA4_5: number; // 총 평점 (4.5 기준)
  totalGPA4_3: number; // 총 평점 (4.3 기준)
  majorGPA4_5: number; // 전공 평점 (4.5 기준)
  majorGPA4_3: number; // 전공 평점 (4.3 기준)
  totalCredits: number; // 총 이수 학점
  majorCredits: number; // 전공 이수 학점
}

/**
 * 성적을 평점으로 변환하는 함수
 * @param grade - 성적 (A+, A, ...)
 * @param scale - 학점 기준 (4.5 또는 4.3)
 * @returns 평점 값
 */
function gradeToPoint(grade: string, scale: number): number {
  const gradeScale4_5: { [key: string]: number } = {
    "A+": 4.5,
    A: 4.0,
    "B+": 3.5,
    B: 3.0,
    "C+": 2.5,
    C: 2.0,
    "D+": 1.5,
    D: 1.0,
    F: 0.0,
  };

  const gradeScale4_3: { [key: string]: number } = {
    "A+": 4.3,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  };

  if (scale === 4.5) {
    return gradeScale4_5[grade] || 0;
  } else if (scale === 4.3) {
    return gradeScale4_3[grade] || 0;
  } else {
    throw new Error("지원하지 않는 학점 기준입니다.");
  }
}

/**
 * 학점 계산기
 * @param courses - 과목 배열
 * @returns 총 평점, 전공 평점, 총 이수 학점, 전공 이수 학점
 */
export function calculateGrades(courses: Course[]): GradeCalculationResult {
  let totalPoints4_5 = 0; // 총 평점 누적 (4.5 기준)
  let majorPoints4_5 = 0; // 전공 평점 누적 (4.5 기준)
  let totalPoints4_3 = 0; // 총 평점 누적 (4.3 기준)
  let majorPoints4_3 = 0; // 전공 평점 누적 (4.3 기준)
  let totalCredits = 0; // 총 이수 학점
  let majorCredits = 0; // 전공 이수 학점

  courses.forEach((course) => {
    // 각각의 평점을 기준으로 성적을 환산
    const point4_5 = gradeToPoint(course.grade, 4.5) * course.credits;
    const point4_3 = gradeToPoint(course.grade, 4.3) * course.credits;
    totalPoints4_5 += point4_5;
    totalPoints4_3 += point4_3;
    totalCredits += course.credits;

    if (course.isMajor) {
      majorPoints4_5 += point4_5;
      majorPoints4_3 += point4_3;
      majorCredits += course.credits;
    }
  });

  const totalGPA4_5 = totalPoints4_5 / totalCredits;
  const totalGPA4_3 = totalPoints4_3 / totalCredits;
  const majorGPA4_5 = majorPoints4_5 / majorCredits;
  const majorGPA4_3 = majorPoints4_3 / majorCredits;

  return {
    totalGPA4_5: parseFloat(totalGPA4_5.toFixed(2)),
    totalGPA4_3: parseFloat(totalGPA4_3.toFixed(2)),
    majorGPA4_5: parseFloat(majorGPA4_5.toFixed(2)),
    majorGPA4_3: parseFloat(majorGPA4_3.toFixed(2)),
    totalCredits,
    majorCredits,
  };
}

/**
 * 점수를 반대 학점 기준으로 변환하는 함수
 * @param score - 변환할 점수
 * @param currentScale - 현재 학점 기준 (4.5 또는 4.3)
 * @returns 반대 학점 기준으로 변환된 점수
 */
export function convertScore(score: number, currentScale: number): number {
  if (currentScale === 4.3) {
    // 4.3 기준 점수를 4.5 기준으로 변환
    const scaleRatio = 4.5 / 4.3;
    return parseFloat((score * scaleRatio).toFixed(2));
  } else if (currentScale === 4.5) {
    // 4.5 기준 점수를 4.3 기준으로 변환
    const scaleRatio = 4.3 / 4.5;
    return parseFloat((score * scaleRatio).toFixed(2));
  } else {
    throw new Error(
      "지원하지 않는 학점 기준입니다. 4.3 또는 4.5만 가능합니다."
    );
  }
}
