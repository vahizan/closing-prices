import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LineChart from '../LineChart'

describe('LineChart', () => {
    const props = {
        xAxisData: [1, 2, 3],
        yAxisData: [1, 2, 3],
        title: '',
        xLabel: '',
        yLabel: '',
    }
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('render', () => {
        test('renders component', () => {
            const { container } = render(<LineChart {...props} />)
            expect(container).toBeInTheDocument()
        })
    })
})
