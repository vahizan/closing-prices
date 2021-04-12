import * as utils from "../utils";
import assert from "assert";
import {
  monthlyCompoundTestData,
  yearlyCompoundTestData,
} from "./utilsTestData";

let sinon = require("sinon");

interface Interest {
  monthlyDeposit: number;
  principleDeposit: number;
  yearlyInterest: number;
  timeInMonths: number;
  timeInYears: number;
}
describe("utils", () => {
  let stub: any;
  let date: Date;
  beforeEach(() => {
    date = new Date(2021, 1, 1, 1, 1, 1, 0);
    stub = sinon.stub(Date, "now");
    stub.returns(date);
  });

  afterEach(() => stub.restore());

  describe("toYearsFromNow", () => {
    it("When args Then should produce an array of years between now until the number of years provided", () => {
      assert.deepStrictEqual(utils.toYearsFromNow(5), [
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
      ]);
    });
  });

  describe("compoundInterest", () => {
    let params: Interest;
    beforeEach(() => {
      params = {
        monthlyDeposit: 250,
        principleDeposit: 1000,
        yearlyInterest: 1,
        timeInMonths: 5,
        timeInYears: 5,
      };
    });

    it("Given all parameters are valid Then should calculate monthly compound interest", () => {
      const { monthlyDeposit, yearlyInterest, timeInMonths } = params;
      assert.strictEqual(
        utils.monthlyCompoundInterest(
          monthlyDeposit,
          yearlyInterest,
          timeInMonths
        ),
        1252
      );
    });

    it("Given all parameters are valid Then should calculate principle compound interest", () => {
      const { principleDeposit, yearlyInterest, timeInMonths } = params;
      assert.strictEqual(
        utils.principleCompoundInterest(
          principleDeposit,
          yearlyInterest,
          timeInMonths
        ),
        1004
      );
    });

    it("Given all parameters are valid Then should calculate total savings over time", () => {
      const {
        principleDeposit,
        monthlyDeposit,
        yearlyInterest,
        timeInMonths,
      } = params;
      assert.strictEqual(
        utils.totalSavingsOverTime(
          principleDeposit,
          monthlyDeposit,
          yearlyInterest,
          timeInMonths
        ),
        2256
      );
    });

    it("Given all parameters are valid Then should produce an array of yearly savings over time", () => {
      const {
        principleDeposit,
        monthlyDeposit,
        yearlyInterest,
        timeInYears,
      } = params;
      assert.deepStrictEqual(
        utils.yearlySavingsOverTime(
          principleDeposit,
          monthlyDeposit,
          yearlyInterest,
          timeInYears
        ),
        [4024, 7078, 10162, 13279, 16426]
      );
    });

    it("Given all current date is near end of year Then this should be factored in array of yearly savings", () => {
      date = new Date(2021, 11, 24, 10, 33, 30, 0);
      stub.returns(date);

      const {
        principleDeposit,
        monthlyDeposit,
        yearlyInterest,
        timeInYears,
      } = params;
      assert.deepStrictEqual(
        utils.yearlySavingsOverTime(
          principleDeposit,
          monthlyDeposit,
          yearlyInterest,
          timeInYears
        ),
        [4024, 7078, 10162, 13279, 16426]
      );
    });

    it("Given all parameters are valid Then should produce array of objects with compounded value for corresponding years", () => {
      const {
        principleDeposit,
        monthlyDeposit,
        yearlyInterest,
        timeInYears,
      } = params;
      assert.deepStrictEqual(
        utils.getYearlyCompoundSavingsData(
          principleDeposit,
          monthlyDeposit,
          yearlyInterest,
          timeInYears
        ),
        yearlyCompoundTestData
      );
    });

    it("Given all parameters are valid Then should produce array of objects with monthly compounded values", () => {
      const {
        principleDeposit,
        monthlyDeposit,
        yearlyInterest,
        timeInYears,
      } = params;
      assert.deepStrictEqual(
        utils.getMonthlyCompoundSavingsData(
          principleDeposit,
          monthlyDeposit,
          yearlyInterest,
          timeInYears
        ),
        monthlyCompoundTestData
      );
    });
  });
});
