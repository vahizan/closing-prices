import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NumberField from '../NumberField'
import DoughnutChart from '../DoughnutChart'

describe('DoughnutChart', () => {
    const props = {
        data: [10, 20],
        labels: ['savings from interest', 'total savings'],
        colours: ['blue', 'white'],
        title: 'total savings',
    }

    describe('render', () => {
        test('renders component', () => {
            const { container } = render(<DoughnutChart {...props} />)
            expect(container).toBeInTheDocument()
        })
        test('renders Doughnut', () => {
            const { getByTestId } = render(<DoughnutChart {...props} />)
            expect(getByTestId('doughnut-chart'))
        })
    })
})
