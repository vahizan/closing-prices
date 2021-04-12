import { YearlyCompoundInterest } from './types'

export const toYearlyLineChartDataset = (compoundInterestData: Array<YearlyCompoundInterest>) => {
    let years: string[] = []
    let values: number[] = []
    compoundInterestData.forEach((compoundInterest) => {
        years.push(compoundInterest.year)
        values.push(compoundInterest.value)
    })
    return {
        xAxis: years,
        yAxis: values,
    }
}
