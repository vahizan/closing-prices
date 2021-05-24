import { PriceData } from './types'

export const toLineChartClosingPriceDataset = (compoundInterestData: Array<PriceData>) => {
    let dates: string[] = []
    let values: number[] = []
    compoundInterestData.forEach((compoundInterest) => {
        dates.push(compoundInterest.date)
        values.push(compoundInterest.close)
    })
    return {
        xAxis: dates,
        yAxis: values,
    }
}
