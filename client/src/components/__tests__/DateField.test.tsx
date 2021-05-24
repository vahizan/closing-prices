import React from 'react'
import { render } from '@testing-library/react'
import DateField from '../DateField'
import { DateFormat } from '../../constants'

describe('DateField', () => {
    const props = {
        setter: jest.fn(),
        format: DateFormat.YYYYMMDD,
        placeholder: '',
    }
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('render', () => {
        test('renders component', () => {
            const { container } = render(<DateField {...props} />)
            expect(container).toBeInTheDocument()
        })
    })
})
