import React, { useState } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import NumberField from './components/NumberField'
import { useCompoundInterest } from './hooks/useCompoundInterest'
import { toYearlyLineChartDataset } from './utils'

const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the helper
const tempData = {
    xAxis: [0, 1, 2, 3, 4, 5],
    yAxis: [100, 11, 112, 150, 180, 210, 240, 350, 390, 450],
}

const App = () => {
    const [initialDeposit, setInitialDeposit] = useState(0)
    const [monthlyDeposit, setMonthlyDeposit] = useState(0)
    const [interestRate, setInterestRate] = useState(0)

    const { compoundInterestData } = useCompoundInterest(
        initialDeposit,
        monthlyDeposit,
        interestRate
    )

    console.log('compoundInterestData', compoundInterestData)
    const lineChartData = compoundInterestData.length
        ? toYearlyLineChartDataset(compoundInterestData)
        : tempData

    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container pt={6}>
                    <LineChart
                        title="Savings Over time"
                        xAxisData={lineChartData.xAxis}
                        yAxisData={lineChartData.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
                <NumberField
                    step={100}
                    aria-label="Initial Deposit"
                    setNumber={setInitialDeposit}
                />
                <NumberField
                    step={100}
                    aria-label="Monthly Deposit"
                    setNumber={setMonthlyDeposit}
                />
                <NumberField
                    min={0.01}
                    step={0.1}
                    max={100}
                    aria-label="Interest rate"
                    setNumber={setInterestRate}
                />
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
