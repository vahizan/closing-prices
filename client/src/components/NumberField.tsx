import React, { ChangeEvent } from 'react'

interface NumberFieldProps {
    setNumber: Function
    placeholder?: string
    timeoutValue?: number
    min?: number
    max?: number
    step?: number
}
const NumberField = ({
    setNumber,
    placeholder,
    step = 1,
    min = 0,
    max = 1000,
    timeoutValue = 0,
}: NumberFieldProps) => {
    const onChange = (setterFunc: Function, timeout: number) => (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        if (timeout === 0) {
            setterFunc(event.target.value)
            return
        }
        setTimeout(() => setterFunc(event.target.value), timeout)
    }

    return (
        <div id="TextField">
            <input
                data-testid="number-field"
                name="NumberInput"
                type="number"
                step={`${step}`}
                min={min}
                max={max}
                placeholder={placeholder}
                onChange={onChange(setNumber, timeoutValue)}
            />
        </div>
    )
}

export default NumberField
