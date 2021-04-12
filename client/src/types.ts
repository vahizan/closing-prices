export interface YearlyCompoundInterest {
    year: string
    value: number
}

export interface MonthlyCompoundInterest extends YearlyCompoundInterest {
    year: string
    month: number
    value: number
}
