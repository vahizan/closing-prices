import { useEffect, useState } from 'react'
import axios from '../axios'

const FIFTY_YEAR_MAX = '50'

export const useCompoundInterest = (
    initialDeposit: number,
    monthlyDeposit: number,
    interestRate: number
) => {
    const [compoundInterestData, setCompoundInterestData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        if (!initialDeposit || !monthlyDeposit || !interestRate) {
            return
        }
        axios
            .get('interest/years', {
                params: {
                    initialDeposit,
                    monthlyDeposit,
                    yearlyInterest: interestRate,
                    numberOfYears: FIFTY_YEAR_MAX,
                },
            })
            .then((response) => {
                setCompoundInterestData(response.data)
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
        compoundInterestData,
    }
}
