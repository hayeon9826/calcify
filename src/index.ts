/// <reference path="./index.d.ts" />

export {
  compareRentAndLease,
  calculateLoanRepayment,
  calculateAffordableHousePrice,
  adjustLoanAmount,
} from "./loan";

export {
  calculateDepositByInitial,
  calculateDepositByTarget,
  calculateSavingsByInitial,
  calculateSavingsByTarget,
} from "./deposit";

export { calculateBmi } from "./bmi";

export { convertScore, calculateGrades } from "./grade";

export { calculateCommission } from "./realEstateFee";

export {
  calculateRetirementFund,
  calculateMonthlySavings,
  calculateMonthlyPension,
  calculateLumpSum,
} from "./pension";

export { calculateDiscount } from "./discount";

export { calculateCalories } from "./calorie";

export { calculateNetSalary } from "./salary";

export {
  calculateIncomeTax,
  calculateSocialInsurance,
  calculateCorporationTax,
  calculateCompositeIncomeTax,
  calculateTransferIncomeTax,
  calculateRetirementIncomeTax,
  calculatePensionIncomeTax,
  calculateFinancialIncomeTax,
  calculateInterestIncomeTax,
  calculateDividendIncomeTax,
  calculateBusinessIncomeTax,
  calculateCarTax,
} from "./tax";

export { calculateParentalLeavePay } from "./parentalLeave";

export { calculateUnemploymentBenefit } from "./unemploymentBenefit";

export { calculateIdealWeight } from "./idealWeight";

export { calculateOvulation } from "./ovulation";
