import React, { useState } from 'react'
import './App.css'
import {
    Box,
    Center,
    ChakraProvider,
    Container,
    extendTheme,
    Flex,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import LineChart from './components/LineChart'
import theme from './theme'
import { useClosingPrices } from './hooks/useClosingPrices'
import { toLineChartClosingPriceDataset } from './utils'
import {
    DateFormat,
    DEFAULT_PERIOD,
    DEFAULT_TICKER,
    FormConstants,
    LineChartConstants,
} from './constants'
import DateField from './components/DateField'

const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the helper
const tempData = {
    xAxis: [0, 1, 2, 3, 4, 5],
    yAxis: [100, 11, 112, 150, 180, 210, 240, 350, 390, 450],
}

const App = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const { closingPriceData } = useClosingPrices(
        startDate,
        endDate,
        DEFAULT_TICKER,
        DEFAULT_PERIOD
    )
    const lineChartData = closingPriceData.length
        ? toLineChartClosingPriceDataset(closingPriceData)
        : tempData

    return (
        <ChakraProvider theme={defaultTheme}>
            <Box display="flex" minHeight="100vh" height="100%" flexDirection="column">
                <Container centerContent pt={7}>
                    <Flex direction="column">
                        <Center align="center" h="200px" w="100%" color="black">
                            <FormControl data-testid="input-form">
                                <Flex direction="row">
                                    <Flex alignItems="baseline">
                                        <FormLabel>{FormConstants.TICKER}</FormLabel>
                                        <input className="tickerInput" name="input" value="MCD" />
                                    </Flex>
                                    <FormLabel>{FormConstants.FROM_DATE}</FormLabel>
                                    <DateField
                                        setter={setStartDate}
                                        data-testid={`${FormConstants.FROM_DATE}-DayPicker`}
                                        placeholder="YYYY-MM-DD"
                                        format={DateFormat.YYYYMMDD}
                                    />
                                    <FormLabel>{FormConstants.TO_DATE}</FormLabel>
                                    <DateField
                                        setter={setEndDate}
                                        data-testid={`${FormConstants.TO_DATE}-DayPicker`}
                                        placeholder="YYYY-MM-DD"
                                        format={DateFormat.YYYYMMDD}
                                    />
                                </Flex>
                            </FormControl>
                        </Center>
                        <LineChart
                            title={LineChartConstants.LINE_CHART_TITLE}
                            xAxisData={lineChartData.xAxis}
                            yAxisData={lineChartData.yAxis}
                            xLabel={LineChartConstants.LINE_CHART_X_LABEL}
                            yLabel={LineChartConstants.LINE_CHART_Y_LABEL}
                        />
                    </Flex>
                </Container>
            </Box>
        </ChakraProvider>
    )
}

export default App
