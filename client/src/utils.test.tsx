import { toYearlyLineChartDataset } from './utils'
import { lineChartDataSet, yearlyCompoundInterestData } from './utilsTestData'

describe('utils', () => {
    describe('toLineChartData', () => {
        test('Should format compound interest data to linechart axis data', () => {
            expect(toYearlyLineChartDataset(yearlyCompoundInterestData)).toEqual(lineChartDataSet)
        })
    })
})
