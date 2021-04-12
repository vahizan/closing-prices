import { Savings } from "../types/CompoundInterestTypes";

const compoundedInterest = (
  interestRate: number,
  timeInMonths: number
): number => {
  return Math.pow(interestRate + 1, timeInMonths);
};

const monthlyInterestRate = (interestRate: number) => interestRate / 12;

const percentageToDecimal = (percentValue: number): number =>
  percentValue / 100;

const toMonths = (numberOfYears: number) => numberOfYears * 12;

export const monthlyCompoundInterest = (
  monthlyDeposit: number,
  yearlyInterest: number,
  timeInMonths: number
): number => {
  const monthlyInterest = monthlyInterestRate(yearlyInterest);
  const interestRate = percentageToDecimal(monthlyInterest);
  const interestOverMonths = compoundedInterest(interestRate, timeInMonths);
  const monthlyCompound =
    monthlyDeposit * ((interestOverMonths - 1) / interestRate);
  return Math.round(monthlyCompound);
};

export const principleCompoundInterest = (
  initialDeposit: number,
  yearlyInterest: number,
  timeInMonths: number
): number => {
  const monthlyInterest = monthlyInterestRate(yearlyInterest);
  const interestOverMonths = compoundedInterest(
    percentageToDecimal(monthlyInterest),
    timeInMonths
  );
  return Math.round(initialDeposit * interestOverMonths);
};

export const totalSavingsOverTime = (
  initialDeposit: number,
  monthlyDeposit: number,
  yearlyInterest: number,
  timeInMonths: number
): Savings => {
  const principle = principleCompoundInterest(
    initialDeposit,
    yearlyInterest,
    timeInMonths
  );
  const monthly = monthlyCompoundInterest(
    monthlyDeposit,
    yearlyInterest,
    timeInMonths
  );

  const savingsFromInterest = totalInterestOverTime(
    monthly,
    principle,
    initialDeposit,
    monthlyDeposit,
    timeInMonths
  );
  return {
    total: monthly + principle,
    deposit: monthly + principle - savingsFromInterest,
    interest: savingsFromInterest,
  };
};

const totalInterestOverTime = (
  compoundedMonthly: number,
  compoundedPrinciple: number,
  initialDeposit: number,
  monthlyDeposit: number,
  timeInMonths: number
): number => {
  const totalMonthlyDeposit = monthlyDeposit * timeInMonths;
  const totalDeposit = totalMonthlyDeposit + initialDeposit;
  const totalCompoundedValue = compoundedMonthly + compoundedPrinciple;
  return Math.round(totalCompoundedValue - totalDeposit);
};

const toRange = (value: number) => {
  let array = [];
  for (let i = 1; i <= value; i++) {
    array.push(i);
  }
  return array;
};
export const toYearsFromNow = (years: number): Array<string> => {
  let yearsArray = toRange(years);
  return yearsArray.map((number) => {
    let d = new Date();
    let currentYear = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let c = new Date(currentYear + number, month, day);
    return c.getFullYear().toString();
  });
};

export const monthlySavingsOverTime = (
  initialDeposit: number,
  monthlyDeposit: number,
  yearlyInterest: number,
  timeInYears: number
): Array<number> => {
  const arr = toRange(timeInYears * 12);
  return arr.map(
    (number) =>
      totalSavingsOverTime(
        initialDeposit,
        monthlyDeposit,
        yearlyInterest,
        number
      ).total
  );
};

const JANUARY = 1;
const DECEMBER = 12;
export const getMonthlyCompoundSavingsData = (
  initialDeposit: number,
  monthlyDeposit: number,
  yearlyInterest: number,
  timeInYears: number
) => {
  const years = toYearsFromNow(timeInYears);
  const monthlyCompoundedValues = monthlySavingsOverTime(
    initialDeposit,
    monthlyDeposit,
    yearlyInterest,
    timeInYears
  );

  let yearCount = 0;
  return monthlyCompoundedValues.map((value, index) => {
    let month = index + 1;
    let isNewYear = month % DECEMBER === JANUARY && month > DECEMBER;
    yearCount = isNewYear ? yearCount + 1 : yearCount;
    return {
      year: years[yearCount],
      month: month % DECEMBER === 0 ? DECEMBER : month % DECEMBER,
      value,
    };
  });
};

export const yearlySavingsOverTime = (
  initialDeposit: number,
  monthlyDeposit: number,
  yearlyInterest: number,
  timeInYears: number
): Array<number> => {
  const arr = toRange(timeInYears);
  return arr.map(
    (number) =>
      totalSavingsOverTime(
        initialDeposit,
        monthlyDeposit,
        yearlyInterest,
        toMonths(number)
      ).total
  );
};

export const getYearlyCompoundSavingsData = (
  initialDeposit: number,
  monthlyDeposit: number,
  yearlyInterest: number,
  timeInYears: number
) => {
  const years = toYearsFromNow(timeInYears);
  const yearlyCompoundedValues = yearlySavingsOverTime(
    initialDeposit,
    monthlyDeposit,
    yearlyInterest,
    timeInYears
  );

  return years.map((year, index) => ({
    year,
    value: yearlyCompoundedValues[index],
  }));
};
