export interface ClosingPricesRequest {
  startDate: string;
  endDate: string;
  ticker: string;
  period: string;
  fmt?: string;
}
