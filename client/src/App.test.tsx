import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import axios from './axios'
import App from './App'
import { DateFormat } from './constants'

jest.mock('./components/LineChart', () => () => <div data-testid="LineChart" />)

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

    const setupInputChange = (getAllByPlaceholderText: any, placeholder: DateFormat) => {
        const numberFields = getAllByPlaceholderText(placeholder)

        const startDateInput = numberFields[0]
        const endDateInput = numberFields[1]

        fireEvent.change(startDateInput, { target: { value: '2020-01-01' } })
        fireEvent.change(endDateInput, { target: { value: '2021-1-1' } })
    }

    describe('render', () => {
        test('renders app', () => {
            const { container } = render(<App />)
            expect(container).toBeInTheDocument()
        })

        test('renders 2 Date Fields', () => {
            const { getAllByPlaceholderText } = render(<App />)
            expect(getAllByPlaceholderText(DateFormat.YYYYMMDD)).toHaveLength(2)
        })
    })

    describe('api call', () => {
        test('When all parameters are filled Should call axios get request', async () => {
            mockedAxios.get.mockResolvedValue(axiosResponse)
            const { getAllByPlaceholderText } = render(<App />)
            setupInputChange(getAllByPlaceholderText, DateFormat.YYYYMMDD)

            await act(() => {
                jest.useFakeTimers()
            })
            expect(mockedAxios.get).toBeCalledTimes(1)
            expect(mockedAxios.get).toHaveBeenCalledWith('closing', {
                params: {
                    endDate: '2021-1-1',
                    period: 'd',
                    startDate: '2020-01-01',
                    ticker: 'MCD',
                },
            })
        })
    })
})
