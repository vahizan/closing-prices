export interface CompoundInterestRequest {
  initialDeposit: number;
  monthlyDeposit: number;
  yearlyInterest: number;
  numberOfYears: number;
}

export interface Savings {
  total: number;
  deposit: number;
  interest: number;
}
