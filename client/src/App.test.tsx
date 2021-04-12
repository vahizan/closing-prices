import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import axios from './axios'
import App from './App'

jest.mock('./components/LineChart', () => () => <div data-testid="LineChart" />)
jest.mock('./components/DoughnutChart', () => () => <div data-testid="DoughnutChart" />)

jest.mock('./axios')

describe('<App/>', () => {
    let axiosResponse: AxiosResponse = {
        data: [
            {
                year: 2022,
                value: 2522,
            },
        ] as any,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
    }
    const mockedAxios = axios as jest.Mocked<typeof axios>

    afterEach(() => {
        jest.restoreAllMocks()
        jest.clearAllTimers()
    })

    const setupInputChange = (getAllByTestId: any) => {
        const numberFields = getAllByTestId('number-field')

        const initialDepositInput = numberFields[0]
        const monthlyDepositInput = numberFields[1]
        const interestRateInput = numberFields[2]

        fireEvent.change(initialDepositInput, { target: { value: '1000' } })
        fireEvent.change(monthlyDepositInput, { target: { value: '250' } })

        fireEvent.change(interestRateInput, { target: { value: '1' } })
    }

    describe('render', () => {
        test('renders app', () => {
            const { container } = render(<App />)
            expect(container).toBeInTheDocument()
        })

        test('renders 4 NumberFields', () => {
            const { getAllByTestId } = render(<App />)
            expect(getAllByTestId('number-field')).toHaveLength(3)
        })

        test('When interest rate values are not provided Then should hide Doughnut Chart and Stat', () => {
            const { getByTestId } = render(<App />)
            expect(() => getByTestId('DoughnutChart')).toThrowError()
            expect(() => getByTestId('savings-stat')).toThrowError()
        })

        test('When interest rate values are provided Then should show Doughnut Chart and Stat', () => {
            mockedAxios.get.mockResolvedValue(axiosResponse)

            const { getByTestId, getAllByTestId } = render(<App />)
            setupInputChange(getAllByTestId)

            expect(getByTestId('DoughnutChart')).toBeInTheDocument()
            expect(getByTestId('savings-stat')).toBeInTheDocument()
        })
    })

    describe('api call', () => {
        test('When all parameters are filled Should call axios get request', async () => {
            mockedAxios.get.mockResolvedValue(axiosResponse)
            const { getAllByTestId } = render(<App />)
            setupInputChange(getAllByTestId)

            await act(() => {
                jest.useFakeTimers()
            })
            expect(mockedAxios.get).toBeCalledTimes(2)
            expect(mockedAxios.get).toHaveBeenCalledWith('interest/years', {
                params: {
                    initialDeposit: '1000',
                    monthlyDeposit: '250',
                    numberOfYears: '50',
                    yearlyInterest: '1',
                },
            })

            expect(mockedAxios.get).toHaveBeenCalledWith('interest/total', {
                params: {
                    initialDeposit: '1000',
                    monthlyDeposit: '250',
                    numberOfYears: '50',
                    yearlyInterest: '1',
                },
            })
        })
    })
})
