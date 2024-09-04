# Caculify

## English Description

**Caculify** is a utility library that provides various calculation functions needed in everyday life. This library includes several useful functions such as loan calculators, savings calculators, tax calculators, and health-related calculators, helping users easily perform necessary calculations.

## Installation

```bash
npm install caculify
```

## Usage

Each function can be imported individually as shown below:

```javascript
import { calculateLoanRepayment, calculateBmi } from "caculify";

// Loan repayment calculation
const loanRepayment = calculateLoanRepayment({
  repaymentType: "Equal principal and interest repayment",
  loanAmount: 100000000,
  annualInterestRate: 3.2,
  repaymentPeriod: 10,
  gracePeriod: 0,
});

// BMI calculation
const bmi = calculateBmi({
  height: 163,
  weight: 49,
});
```

## Available Functions

### Loan Functions

- **`compareRentAndLease`**: Compare rent and lease calculator
- **`calculateLoanRepayment`**: Loan repayment calculator
- **`calculateAffordableHousePrice`**: Affordable house price calculator
- **`adjustLoanAmount`**: Adjust loan amount calculator

### Deposit Functions

- **`calculateDepositByInitial`**: Deposit calculator based on initial payment
- **`calculateDepositByTarget`**: Deposit calculator based on target amount
- **`calculateSavingsByInitial`**: Savings calculator based on initial payment
- **`calculateSavingsByTarget`**: Savings calculator based on target amount

### Health & Fitness

- **`calculateBmi`**: Body Mass Index (BMI) calculator

### Grade Calculators

- **`convertScore`**: Score converter
- **`calculateGrades`**: Grade calculator

### Real Estate Fee Calculator

- **`calculateCommission`**: Real estate commission calculator

### Pension Calculators

- **`calculateRetirementFund`**: Retirement fund calculator
- **`calculateMonthlySavings`**: Monthly savings calculator
- **`calculateMonthlyPension`**: Monthly pension calculator
- **`calculateLumpSum`**: Lump sum calculator

### Discount Calculator

- **`calculateDiscount`**: Discount rate calculator

### Calorie Calculator

- **`calculateCalories`**: Calorie burn calculator

### Salary Calculator

- **`calculateNetSalary`**: Net salary calculator

### Tax Calculators

- **`calculateIncomeTax`**: Income tax calculator
- **`calculateSocialInsurance`**: Social insurance calculator
- **`calculateCorporationTax`**: Corporation tax calculator
- **`calculateCompositeIncomeTax`**: Composite income tax calculator
- **`calculateTransferIncomeTax`**: Transfer income tax calculator
- **`calculateRetirementIncomeTax`**: Retirement income tax calculator
- **`calculatePensionIncomeTax`**: Pension income tax calculator
- **`calculateFinancialIncomeTax`**: Comprehensive financial income tax calculator
- **`calculateInterestIncomeTax`**: Interest income tax calculator
- **`calculateDividendIncomeTax`**: Dividend income tax calculator
- **`calculateBusinessIncomeTax`**: Business income tax calculator
- **`calculateCarTax`**: Car tax calculator

### Parental Leave Calculator

- **`calculateParentalLeavePay`**: Parental leave pay calculator

### Unemployment Benefit Calculator

- **`calculateUnemploymentBenefit`**: Unemployment benefit calculator

### Ideal Weight Calculator

- **`calculateIdealWeight`**: Ideal weight calculator

### Ovulation Calculator

- **`calculateOvulation`**: Ovulation calculator

## Contributing

Contributions are welcome! You can contribute by reporting bugs, suggesting features, or improving the code. If you wish to contribute, please fork the GitHub repository and submit a pull request.

## License

This project is licensed under the MIT License.

<br />
<br />

## 설명 (한국어 버전)

**Caculify**는 다양한 일상 생활에서 필요한 계산 기능을 제공하는 유틸리티 라이브러리입니다. 이 라이브러리는 대출 계산기, 예금 계산기, 세금 계산기, 건강 관련 계산기 등 여러 유용한 함수를 포함하고 있어, 사용자가 쉽게 필요한 계산을 수행할 수 있도록 돕습니다.

## 설치 / Installation

```bash
npm install caculify
```

## 사용법 / Usage

각 함수는 아래와 같이 개별적으로 임포트하여 사용할 수 있습니다:

You can import each function individually as shown below:

```javascript
import { calculateLoanRepayment, calculateBmi } from "caculify";

// 대출 상환금액 계산
const loanRepayment = calculateLoanRepayment({
  repaymentType: "원리금균등상환",
  loanAmount: 100000000,
  annualInterestRate: 3.2,
  repaymentPeriod: 10,
  gracePeriod: 0,
});

// BMI 계산
const bmi = calculateBmi({
  height: 163,
  weight: 49,
});
```

## 제공되는 함수들 / Available Functions

### Loan Functions

- **`compareRentAndLease`**: 전세와 월세 비교 계산기
- **`calculateLoanRepayment`**: 대출 상환금액 계산기
- **`calculateAffordableHousePrice`**: 적정 주택 가격 계산기
- **`adjustLoanAmount`**: 대출 금액 조절 계산기

### Deposit Functions

- **`calculateDepositByInitial`**: 최초 납입액 기준 예금 계산기
- **`calculateDepositByTarget`**: 목표 금액 기준 예금 계산기
- **`calculateSavingsByInitial`**: 최초 납입액 기준 적금 계산기
- **`calculateSavingsByTarget`**: 목표 금액 기준 적금 계산기

### Health & Fitness

- **`calculateBmi`**: 체질량 지수 (BMI) 계산기

### Grade Calculators

- **`convertScore`**: 성적 변환기
- **`calculateGrades`**: 학점 계산기

### Real Estate Fee Calculator

- **`calculateCommission`**: 부동산 중개 수수료 계산기

### Pension Calculators

- **`calculateRetirementFund`**: 은퇴자금 계산기
- **`calculateMonthlySavings`**: 월 저축액 계산기
- **`calculateMonthlyPension`**: 연금액 계산기
- **`calculateLumpSum`**: 목돈 계산기

### Discount Calculator

- **`calculateDiscount`**: 할인율 계산기

### Calorie Calculator

- **`calculateCalories`**: 운동 소모 칼로리 계산기

### Salary Calculator

- **`calculateNetSalary`**: 연봉 실수령액 계산기

### Tax Calculators

- **`calculateIncomeTax`**: 근로 소득세 계산기
- **`calculateSocialInsurance`**: 4대 보험 계산기
- **`calculateCorporationTax`**: 법인세 계산기
- **`calculateCompositeIncomeTax`**: 종합소득세 계산기
- **`calculateTransferIncomeTax`**: 양도소득세 계산기
- **`calculateRetirementIncomeTax`**: 퇴직소득세 계산기
- **`calculatePensionIncomeTax`**: 연금소득세 계산기
- **`calculateFinancialIncomeTax`**: 금융소득종합과세 계산기
- **`calculateInterestIncomeTax`**: 이자소득세 계산기
- **`calculateDividendIncomeTax`**: 배당소득세 계산기
- **`calculateBusinessIncomeTax`**: 사업소득세 계산기
- **`calculateCarTax`**: 자동차세 계산기

### Parental Leave Calculator

- **`calculateParentalLeavePay`**: 육아휴직 급여 계산기

### Unemployment Benefit Calculator

- **`calculateUnemploymentBenefit`**: 실업급여 계산기

### Ideal Weight Calculator

- **`calculateIdealWeight`**: 적정 체중 계산기

### Ovulation Calculator

- **`calculateOvulation`**: 배란일 계산기

## 기여 / Contributing

기여를 환영합니다! 버그 보고, 기능 제안, 코드 개선을 통해 프로젝트에 기여할 수 있습니다. 기여를 원하시면 GitHub 리포지토리를 포크하고 Pull Request를 제출해 주세요.

## 라이선스 / License

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
