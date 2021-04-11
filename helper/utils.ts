const compoundedInterest = (
  interestRate: number,
  timeInMonths: number
): number => {
  return Math.pow(interestRate + 1, timeInMonths);
};

const monthlyInterestRate = (interestRate: number) => interestRate / 12;

const percentageToDecimal = (percentValue: number): number =>
  percentValue / 100;

const DECEMBER = 11;
const toMonths = (numberOfYears: number) => {
  let now = new Date(Date.now());
  return (
    (now.getFullYear() + numberOfYears - now.getFullYear()) * 12 +
    (DECEMBER - now.getMonth())
  );
};

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

export const totalYearlySavings = (
  initialDeposit: number,
  monthlyDeposit: number,
  yearlyInterest: number,
  timeInMonths: number
): number => {
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
  return monthly + principle;
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

export const yearlySavingsOverTime = (
  initialDeposit: number,
  monthlyDeposit: number,
  yearlyInterest: number,
  timeInYears: number
): Array<number> => {
  const arr = toRange(timeInYears);
  return arr.map((number) =>
    totalYearlySavings(
      initialDeposit,
      monthlyDeposit,
      yearlyInterest,
      toMonths(number)
    )
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
