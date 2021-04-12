import { useEffect, useState } from 'react'
import axios from '../axios'
import { FIFTY_YEAR_MAX } from '../constants'

export const useCompoundSavings = (
    initialDeposit: number,
    monthlyDeposit: number,
    interestRate: number
) => {
    const [savings, setSavings] = useState({ total: 0, deposit: 0, interest: 0 })
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        if (!initialDeposit || !monthlyDeposit || !interestRate) {
            return
        }
        axios
            .get('interest/total', {
                params: {
                    initialDeposit,
                    monthlyDeposit,
                    yearlyInterest: interestRate,
                    numberOfYears: FIFTY_YEAR_MAX,
                },
            })
            .then((response) => {
                setSavings(response.data)
                setIsError(false)
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
                setIsError(true)
            })
    }, [initialDeposit, monthlyDeposit, interestRate])
    return {
        isLoading,
        isError,
        savings,
    }
}
