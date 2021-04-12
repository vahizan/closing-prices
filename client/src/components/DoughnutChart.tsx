import { ChartLegendOptions, ChartOptions } from 'chart.js'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

interface DoughnutChartProps {
    labels: string[]
    colours: string[]
    data: number[]
    datasetLabel?: string
    title?: string
}

const DoughnutChart = ({ labels, data, title, colours, datasetLabel }: DoughnutChartProps) => {
    const legendOptions: ChartLegendOptions = {
        display: false,
        position: 'top',
    }

    const options: ChartOptions = {
        responsive: true,
        title: {
            display: !!title,
            text: title,
        },
    }

    return (
        <div>
            <Doughnut
                data={{
                    labels,
                    datasets: [
                        {
                            label: datasetLabel ?? 'Dataset 1',
                            data,
                            backgroundColor: colours,
                        },
                    ],
                }}
                options={options}
                legend={legendOptions}
            />
        </div>
    )
}

export default DoughnutChart
