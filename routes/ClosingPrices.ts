import express from "express";
import { ClosingPricesRequest } from "./types/ClosingPricesTypes";
import { getClosingPriceData } from "./helper/utils";

const url = require("url");
require("dotenv").config();

const ClosingPricesRoutes = express.Router();

const clientErrorMessage = {
  errors: [
    {
      title: "Missing Parameters",
      detail: "Could not find values needed to collect closing prices",
    },
  ],
};

ClosingPricesRoutes.get("/closing", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (!parsedUrl || !parsedUrl.query) {
    res.status(422).send(clientErrorMessage);
    return;
  }

  const {
    startDate,
    endDate,
    ticker,
    period,
    fmt = "json",
  }: ClosingPricesRequest = parsedUrl.query;

  getClosingPriceData(startDate, endDate, period, ticker, fmt)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => res.status(401).send(error));
});

export default ClosingPricesRoutes;
