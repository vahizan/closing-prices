import { toLineChartClosingPriceDataset } from './utils'
import { closingPriceData, lineChartDataSet } from './utilsTestData'

describe('utils', () => {
    describe('toLineChartData', () => {
        test('Should format compound interest data to linechart axis data', () => {
            expect(toLineChartClosingPriceDataset(closingPriceData)).toEqual(lineChartDataSet)
        })
    })
})
