import React, { useState } from 'react'
import './App.css'
import {
    Center,
    ChakraProvider,
    extendTheme,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Stat,
    StatHelpText,
    StatNumber,
    StatLabel,
} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import NumberField from './components/NumberField'
import { useCompoundInterest } from './hooks/useCompoundInterest'
import { toYearlyLineChartDataset } from './utils'
import DoughnutChart from './components/DoughnutChart'
import { FormConstants, LineChartConstants, STAT_TITLE } from './constants'
import { useCompoundSavings } from './hooks/useCompoundSavings'

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

    const { savings } = useCompoundSavings(initialDeposit, monthlyDeposit, interestRate)

    const lineChartData = compoundInterestData.length
        ? toYearlyLineChartDataset(compoundInterestData)
        : tempData

    const STAT_HELP_TEXT_YEAR_RANGE = `${lineChartData.xAxis[0]} - ${
        lineChartData.xAxis[lineChartData.xAxis.length - 1]
    }`
    const isFormEmpty = !initialDeposit || !monthlyDeposit || !interestRate

    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container centerContent pt={7} maxW="3xl">
                    <LineChart
                        title={LineChartConstants.LINE_CHART_TITLE}
                        xAxisData={lineChartData.xAxis}
                        yAxisData={lineChartData.yAxis}
                        xLabel={LineChartConstants.LINE_CHART_X_LABEL}
                        yLabel={LineChartConstants.LINE_CHART_Y_LABEL}
                    />
                    <Flex
                        p={2}
                        mb={10}
                        mt={10}
                        height="100%"
                        width="100%"
                        align="center"
                        direction="column"
                        justify="center"
                    >
                        {!isFormEmpty && (
                            <Grid
                                w="100%"
                                mb={50}
                                p={3}
                                templateRows="repeat(1, 1fr)"
                                templateColumns="repeat(4, 1fr)"
                                gap={2}
                                border="1px"
                                borderRadius="md"
                                borderColor={defaultTheme.colors.grey4}
                            >
                                <GridItem colSpan={2} alignSelf="center" align="center">
                                    <Stat data-testid="savings-stat" m={5}>
                                        <StatLabel fontSize="1em">{STAT_TITLE}</StatLabel>
                                        <StatNumber fontSize="2em">£{savings.total}</StatNumber>
                                        <StatHelpText fontSize="1em">
                                            {STAT_HELP_TEXT_YEAR_RANGE}
                                        </StatHelpText>
                                    </Stat>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <DoughnutChart
                                        title={STAT_TITLE}
                                        labels={['deposit', 'interest']}
                                        colours={['blue', 'green']}
                                        data={[savings.deposit, savings.interest]}
                                    />
                                </GridItem>
                            </Grid>
                        )}
                        <Center align="center" h="200px" w="100%" color="black">
                            <FormControl data-testid="input-form">
                                <FormLabel>{FormConstants.FORM_LABEL_INITIAL_DEPOSIT}</FormLabel>
                                <NumberField
                                    step={100}
                                    aria-label="Initial Deposit"
                                    setValue={setInitialDeposit}
                                    value={initialDeposit}
                                />

                                <FormLabel>{FormConstants.FORM_LABEL_MONTHLY_DEPOSIT}</FormLabel>
                                <NumberField
                                    step={100}
                                    aria-label="Monthly Deposit"
                                    setValue={setMonthlyDeposit}
                                    value={monthlyDeposit}
                                />

                                <FormLabel>{FormConstants.FORM_LABEl_INTEREST_RATE}</FormLabel>
                                <NumberField
                                    min={0}
                                    step={0.1}
                                    max={100}
                                    aria-label="Interest rate"
                                    setValue={setInterestRate}
                                    value={interestRate}
                                />
                            </FormControl>
                        </Center>
                    </Flex>
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
