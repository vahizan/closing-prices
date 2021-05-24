import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DayModifiers } from 'react-day-picker'
import { DateFormat } from '../constants'
import 'react-day-picker/lib/style.css'

interface DateFieldProps {
    setter: Function
    format: DateFormat
    placeholder: string
}

const handleDayChange = (setterFunction: Function, format: DateFormat) => (
    selectedDay: Date,
    modifiers: DayModifiers,
    dayPickerInput: { getInput: () => any }
) => {
    setterFunction(dayPickerInput.getInput().value)
}
const DateField = ({ setter, placeholder, format }: DateFieldProps) => {
    return (
        <DayPickerInput
            onDayChange={handleDayChange(setter, format)}
            placeholder={placeholder}
            format={format}
        />
    )
}

export default DateField
