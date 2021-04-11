import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NumberField from '../NumberField'

describe('NumberField', () => {
    const props = {
        setNumber: jest.fn(),
        timeoutValue: 800,
    }
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.resetAllMocks()
    })

    test('renders component', () => {
        const { container } = render(<NumberField {...props} />)
        expect(container).toBeInTheDocument()
    })

    test('Given user types in text box Should call and throttle setter function', () => {
        const { getByTestId } = render(<NumberField {...props} />)
        const input = getByTestId('number-field')

        fireEvent.change(input, { target: { value: '12' } })
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 800)
    })
})
