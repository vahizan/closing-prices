import express from "express";
import { CompoundInterestRequest } from "./types/CompoundInterestTypes";
import {
  getYearlyCompoundSavingsData,
  getMonthlyCompoundSavingsData,
  totalSavingsOverTime,
} from "./helper/utils";

const url = require("url");
const CompoundInterestRoutes = express.Router();

const instanceOfCompoundInterestRequest = (
  object: any
): object is CompoundInterestRequest => {
  return (
    "initialDeposit" in object &&
    "monthlyDeposit" in object &&
    "yearlyInterest" in object &&
    "numberOfYears" in object
  );
};

const clientErrorMessage = {
  errors: [
    {
      title: "Missing Parameters",
      detail: "Could not values needed to calculate compound interest",
    },
  ],
};

CompoundInterestRoutes.get("/interest/months", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (!parsedUrl || !instanceOfCompoundInterestRequest(parsedUrl.query)) {
    res.status(422).send(clientErrorMessage);
    return;
  }
  const {
    initialDeposit,
    monthlyDeposit,
    yearlyInterest,
    numberOfYears,
  } = parsedUrl.query;
  res
    .status(200)
    .json(
      getMonthlyCompoundSavingsData(
        initialDeposit,
        monthlyDeposit,
        yearlyInterest,
        numberOfYears
      )
    );
});

CompoundInterestRoutes.get("/interest/years", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (!parsedUrl || !instanceOfCompoundInterestRequest(parsedUrl.query)) {
    res.status(422).send(clientErrorMessage);
    return;
  }
  const {
    initialDeposit,
    monthlyDeposit,
    yearlyInterest,
    numberOfYears,
  } = parsedUrl.query;
  res
    .status(200)
    .json(
      getYearlyCompoundSavingsData(
        initialDeposit,
        monthlyDeposit,
        yearlyInterest,
        numberOfYears
      )
    );
});

CompoundInterestRoutes.get("/interest/total", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (!parsedUrl || !instanceOfCompoundInterestRequest(parsedUrl.query)) {
    res.status(422).send(clientErrorMessage);
    return;
  }
  const {
    initialDeposit,
    monthlyDeposit,
    yearlyInterest,
    numberOfYears,
  } = parsedUrl.query;
  res.status(200).json({
    total: totalSavingsOverTime(
      initialDeposit,
      monthlyDeposit,
      yearlyInterest,
      numberOfYears
    ),
  });
});

export default CompoundInterestRoutes;
