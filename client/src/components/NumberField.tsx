import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react'
import React from 'react'

interface NumberFieldProps {
    setValue: Function
    value: string | number
    placeholder?: string
    min?: number
    max?: number
    step?: number
}
const NumberField = ({
    setValue,
    value,
    step = 1,
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
}: NumberFieldProps) => {
    return (
        <NumberInput
            allowMouseWheel
            className="NumberInput"
            size="lg"
            maxW="100%"
            clampValueOnBlur={false}
            onChange={(valueString) => setValue(valueString)}
            value={value}
            step={step}
            min={min}
            max={max}
        >
            <NumberInputField data-testid="number-field" />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}

export default NumberField
