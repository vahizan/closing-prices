import { useEffect, useState } from 'react'
import axios from '../axios'

export const useClosingPrices = (
    startDate: string,
    endDate: string,
    ticker: string,
    period: string
) => {
    const [closingPriceData, setClosingPriceData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        if (!startDate || !endDate) {
            return
        }
        axios
            .get('closing', {
                params: {
                    ticker,
                    period,
                    startDate,
                    endDate,
                },
            })
            .then((response) => {
                setClosingPriceData(response.data)
                setIsError(false)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                setIsError(true)
            })
    }, [startDate, endDate, ticker, period])
    return {
        isLoading,
        isError,
        closingPriceData,
    }
}
