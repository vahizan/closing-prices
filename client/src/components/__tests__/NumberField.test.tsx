import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NumberField from '../NumberField'

describe('NumberField', () => {
    const props = {
        setValue: jest.fn(),
        value: 1,
        timeoutValue: 800,
    }
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('render', () => {
        test('renders component', () => {
            const { container } = render(<NumberField {...props} />)
            expect(container).toBeInTheDocument()
        })
        test('renders NumberInput', () => {
            const { getByTestId } = render(<NumberField {...props} />)
            expect(getByTestId('number-field'))
        })
    })
})
