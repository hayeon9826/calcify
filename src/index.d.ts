declare module "calculify" {
  // Interfaces for function outputs
  export interface BmiResult {
    bmi: number;
    category: string;
  }

  export interface DepositCalculationResult {
    totalSavings: number;
    interestByTaxType: {
      regular: number;
      preferential: number;
      taxFree: number;
    };
  }

  export interface SavingsCalculationResult {
    totalSavings: number;
    interestByTaxType: {
      regular: number;
      preferential: number;
      taxFree: number;
    };
  }

  export interface DiscountInput {
    originalPrice: number;
    discountRate: number;
  }

  export interface DiscountOutput {
    discountAmount: number;
    finalPrice: number;
  }

  export interface Course {
    scale: number;
    courseName: string;
    credits: number;
    grade: string;
    isMajor: boolean;
  }

  export interface GradeCalculationResult {
    totalGPA4_5: number;
    totalGPA4_3: number;
    majorGPA4_5: number;
    majorGPA4_3: number;
    totalCredits: number;
    majorCredits: number;
  }

  export interface IdealWeightInput {
    height: number;
    weight: number;
    gender: "male" | "female";
  }

  export interface IdealWeightOutput {
    idealWeight: number;
    obesityRate: number;
  }

  export interface RepaymentDetail {
    month: number;
    interest: number;
    principal: number;
    totalPayment: number;
  }

  export interface LoanCalculationResult {
    repaymentDetails: RepaymentDetail[];
    monthlyPayment: number;
    totalInterest: number;
  }

  export interface HousePriceCalculationResult {
    affordableHousePrice: number;
    requiredLoanAmount: number;
  }

  export interface ParentalLeaveInput {
    leavePeriod: { months: number; days: number };
    spouseLeavePeriod?: { months: number; days: number };
    averageMonthlyWage: number;
  }

  export interface ParentalLeavePayment {
    month: number;
    generalLeavePayment: number;
    bonusLeavePayment?: number;
    extendedLeavePayment: number;
    retentionPayment?: number;
  }

  export interface ParentalLeaveOutput {
    payments: ParentalLeavePayment[];
    totalGeneralLeavePayment: number;
    totalBonusLeavePayment: number;
    totalExtendedLeavePayment: number;
  }

  export interface RetirementFundResult {
    retirementStartAge: number;
    retirementPeriod: number;
    totalRequiredAmount: number;
    monthlyPension: number;
    retirementEndAge: number;
  }

  export interface MonthlySavingsResult {
    currentAge: number;
    currentAssets: number;
    monthlySavings: number;
    savingPeriod: number;
    savingEndAge: number;
    totalAmountAtRetirement: number;
    monthlyPension: number;
    pensionStartAge: number;
    pensionEndAge: number;
  }

  export interface MonthlyPensionResult {
    interestRate: number;
    currentAssets: number;
    monthlySavings: number;
    savingPeriod: number;
    totalAmountAtRetirement: number;
    monthlyPension: number;
  }

  export interface LumpSumResult {
    averageInterestRate: number;
    monthlySavings: number;
    savingPeriod: number;
    totalAmountAtRetirement: number;
    monthlyPension: number;
  }

  export interface CommissionCalculationResult {
    rate: number;
    commission: number;
    commissionWithTax: number;
  }

  export type ContractType = "매매계약" | "전세계약" | "월세계약";
  export type PropertyType = "주택" | "오피스텔" | "분양권" | "그 외";

  export interface SalaryInput {
    salaryType: "연봉" | "월급";
    includeRetirement: "별도" | "포함";
    annualSalary: number;
    dependents?: number;
    childrenUnder20?: number;
    nonTaxableAmount?: number;
  }

  export interface Deduction {
    pension: number;
    healthInsurance: number;
    longTermCare: number;
    employmentInsurance: number;
    incomeTax: number;
    localIncomeTax: number;
    totalDeductions: number;
  }

  export interface SalaryOutput {
    monthlyNetSalary: number;
    monthlyDeductions: Deduction;
  }

  export interface SeverancePayInput {
    startDate: Date;
    endDate: Date;
    lastThreeMonthsSalaries: number[];
    annualBonus?: number;
    annualLeaveAllowance?: number;
  }

  export interface SeverancePayOutput {
    expectedSeverancePay: number;
    averageDailyWage: number;
  }

  export interface TaxResult {
    taxName: string;
    taxAmount: number;
    details: string;
  }

  export interface IncomeTaxInput {
    grossSalary: number;
    dependents?: number;
    childrenUnder20?: number;
    nonTaxableAmount?: number;
  }

  export interface SocialInsuranceInput {
    grossSalary: number;
  }

  export interface CorporationTaxInput {
    netProfit: number;
  }

  export interface CompositeIncomeTaxInput {
    grossIncome: number;
    deductibleExpenses?: number;
  }

  export interface TransferIncomeTaxInput {
    transferAmount: number;
    acquisitionAmount: number;
    necessaryExpenses: number;
    ownershipPeriod: number;
    propertyType: "주택" | "토지" | "기타";
  }

  export interface RetirementIncomeTaxInput {
    retirementPay: number;
    yearsOfService: number;
  }

  export interface PensionIncomeTaxInput {
    pensionAmount: number;
    pensionType: "국민연금" | "공무원연금" | "사학연금";
  }

  export interface FinancialIncomeTaxInput {
    financialIncome: number;
  }

  export interface InterestIncomeTaxInput {
    interestIncome: number;
  }

  export interface DividendIncomeTaxInput {
    dividendIncome: number;
  }

  export interface BusinessIncomeTaxInput {
    businessIncome: number;
    deductibleExpenses?: number;
  }

  export interface CarTaxInput {
    engineDisplacement: number;
    carAge: number;
    carType: "승용차" | "승합차" | "화물차" | "특수차";
  }

  export interface CarTaxOutput {
    baseTax: number;
    ageDiscount: number;
    totalTax: number;
  }

  export interface UnemploymentInput {
    age: number;
    isDisabled: boolean;
    employmentInsurancePeriod: number;
    recentThreeMonthsSalaries: number[];
    averageWorkDays: number;
    dailyWorkHours: number;
  }

  export interface UnemploymentOutput {
    dailyBenefitAmount: number;
    expectedPaymentDays: number;
    totalExpectedAmount: number;
  }

  export interface DateConversionResult {
    originalDate: string; // 입력된 날짜
    convertedDate: string; // 변환된 날짜
    type: "음력" | "양력"; // 변환된 날짜의 유형
  }

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

  export interface OvulationInput {
    lastPeriodStartDate: Date; // 최근 생리 시작일
    cycleLength: number; // 생리 주기 (일)
  }

  export interface OvulationOutput {
    ovulationDate: Date; // 배란 예정일
    fertileWindowStart: Date; // 임신 가능 기간 시작일
    fertileWindowEnd: Date; // 임신 가능 기간 종료일
  }

  // Function declarations
  export function convertArea(
    value: number,
    convertTo: "평형" | "제곱미터"
  ): number;
  export function calculateBmi(heightCm: number, weightKg: number): BmiResult;

  export function calculateCalories(
    exerciseType: keyof ExerciseType,
    weight: number,
    duration: number
  ): number;
  export function calculateDepositByInitial(
    initialDeposit: number,
    termYears: number,
    annualRate: number
  ): DepositCalculationResult;
  export function calculateDepositByTarget(
    targetAmount: number,
    termYears: number,
    annualRate: number
  ): {
    initialDeposit: number;
    savingsByTaxType: {
      regular: number;
      preferential: number;
      taxFree: number;
    };
  };
  export function calculateSavingsByInitial(
    initialDeposit: number,
    termYears: number,
    annualRate: number,
    isCompound: boolean
  ): SavingsCalculationResult;
  export function calculateSavingsByTarget(
    targetAmount: number,
    termYears: number,
    annualRate: number,
    isCompound: boolean
  ): {
    initialDeposit: number;
    savingsByTaxType: {
      regular: number;
      preferential: number;
      taxFree: number;
    };
  };
  export function calculateDiscount(input: DiscountInput): DiscountOutput;
  export function calculateGrades(courses: Course[]): GradeCalculationResult;
  export function convertScore(score: number, currentScale: number): number;
  export function calculateIdealWeight(
    input: IdealWeightInput
  ): IdealWeightOutput;
  export function compareRentAndLease(
    rentLoanAmount: number,
    rentLoanRate: number,
    monthlyRent: number,
    leaseLoanAmount: number,
    leaseLoanRate: number
  ): { cheaperOption: string; costDifference: number };
  export function calculateLoanRepayment(
    repaymentType: "원리금균등상환" | "원금균등상환" | "만기일시상환",
    principal: number,
    annualRate: number,
    termYears: number,
    gracePeriod?: number
  ): LoanCalculationResult;
  export function calculateAffordableHousePrice(
    currentSavings: number,
    monthlyIncome: number,
    monthlyExpenses: number,
    annualRate: number,
    loanTermYears: number
  ): HousePriceCalculationResult;
  export function adjustLoanAmount(
    currentSavings: number,
    adjustedLoanAmount: number
  ): HousePriceCalculationResult;
  export function convertDate(
    isLunar: boolean,
    date: string
  ): DateConversionResult;
  export function getZodiac(year: number): string;
  export function getStarSign(month: number, day: number): string;
  export function calculateOvulation(input: OvulationInput): OvulationOutput;
  export function calculateParentalLeavePay(
    input: ParentalLeaveInput
  ): ParentalLeaveOutput;
  export function calculateRetirementFund(
    currentAge: number,
    desiredMonthlyPension: number,
    pensionStartAge?: number,
    pensionDuration?: number,
    averageAnnualReturn?: number
  ): RetirementFundResult;
  export function calculateMonthlySavings(
    currentAge: number,
    currentFinancialAssets: number,
    monthlySavings: number,
    savingPeriod: number,
    averageAnnualReturn: number
  ): MonthlySavingsResult;
  export function calculateMonthlyPension(
    currentAge: number,
    currentFinancialAssets: number,
    monthlySavings: number,
    savingPeriod: number,
    averageAnnualReturn: number
  ): MonthlyPensionResult;
  export function calculateLumpSum(
    currentAge: number,
    monthlySavings: number,
    savingPeriod: number,
    averageAnnualReturn: number
  ): LumpSumResult;
  export function calculateCommission(
    contractType: ContractType,
    propertyType: PropertyType,
    deposit: number,
    rate?: number,
    vatRate?: number,
    monthlyRent?: number
  ): CommissionCalculationResult;
  export function calculateNetSalary(input: SalaryInput): SalaryOutput;
  export function calculateSeverancePay(
    input: SeverancePayInput
  ): SeverancePayOutput;
  export function calculateIncomeTax(input: IncomeTaxInput): TaxResult;
  export function calculateSocialInsurance(
    input: SocialInsuranceInput
  ): TaxResult;
  export function calculateCorporationTax(
    input: CorporationTaxInput
  ): TaxResult;
  export function calculateCompositeIncomeTax(
    input: CompositeIncomeTaxInput
  ): TaxResult;
  export function calculateTransferIncomeTax(
    input: TransferIncomeTaxInput
  ): TaxResult;
  export function calculateRetirementIncomeTax(
    input: RetirementIncomeTaxInput
  ): TaxResult;
  export function calculatePensionIncomeTax(
    input: PensionIncomeTaxInput
  ): TaxResult;
  export function calculateFinancialIncomeTax(
    input: FinancialIncomeTaxInput
  ): TaxResult;
  export function calculateInterestIncomeTax(
    input: InterestIncomeTaxInput
  ): TaxResult;
  export function calculateDividendIncomeTax(
    input: DividendIncomeTaxInput
  ): TaxResult;
  export function calculateBusinessIncomeTax(
    input: BusinessIncomeTaxInput
  ): TaxResult;
  export function calculateCarTax(input: CarTaxInput): CarTaxOutput;
  export function calculateUnemploymentBenefit(
    input: UnemploymentInput
  ): UnemploymentOutput;
}
