import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import axios from './axios'
import App from './App'

jest.mock('./components/LineChart', () => () => <div data-testid="LineChart" />)

jest.mock('./axios')

describe('<App/>', () => {
    describe('render', () => {
        test('renders app', () => {
            const { container } = render(<App />)
            expect(container).toBeInTheDocument()
        })

        test('renders 4 NumberFields', () => {
            const { getAllByTestId } = render(<App />)
            expect(getAllByTestId('number-field')).toHaveLength(3)
        })
    })

    describe('api call', () => {
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

        test('When all parameters are filled Should call axios get request', async () => {
            mockedAxios.get.mockResolvedValue(axiosResponse)

            const { getAllByTestId } = render(<App />)
            const numberFields = await getAllByTestId('number-field')

            const initialDepositInput = numberFields[0]
            const monthlyDepositInput = numberFields[1]
            const interestRateInput = numberFields[2]

            fireEvent.change(initialDepositInput, { target: { value: '1000' } })
            fireEvent.change(monthlyDepositInput, { target: { value: '250' } })

            fireEvent.change(interestRateInput, { target: { value: '1' } })

            await act(() => {
                jest.useFakeTimers()
            })
            expect(mockedAxios.get).toHaveBeenCalledWith('interest/months', {
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
