import axios from "axios";

export const getClosingPriceData = (
  startDate: string,
  endDate: string,
  period: string,
  ticker: string,
  fmt: string
): Promise<{ data: object }> => {
  return axios
    .get(`${process.env.WEBSITE_URL}${ticker}`, {
      params: {
        api_token: process.env.API_TOKEN,
        period,
        ["from"]: startDate,
        to: endDate,
        fmt,
      },
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => Promise.reject(error));
};
