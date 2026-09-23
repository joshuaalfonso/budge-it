import type { DailySpending } from "@/types/analytics.types"
import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
//   LabelList,
  XAxis,
  YAxis,
} from "recharts"



interface Props {
    dailySpending: DailySpending[]
}

const SpendTrendChart = ({ dailySpending }: Props) => {

    const formattedData = dailySpending.map(item => {
        const dayOnly = item.date.split('-')[2]; 

        return {
            ...item,
            day: dayOnly, 
            date: item.date   
        };
    });

    const chart = useChart({
        data: formattedData, 
        series: [{ name: "totalExpense", color: "orange.emphasized" }],
    })
    
    return (
        <Chart.Root maxH="xs" chart={chart}>
            <BarChart data={chart.data} responsive>
                <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
                <XAxis axisLine={false} tickLine={false} dataKey={chart.key("day")} />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    tickFormatter={(income) => `${income}`}
                />
                <Tooltip
                    cursor={{ fill: chart.color("bg.muted") }}
                    animationDuration={100}
                    content={<Chart.Tooltip  />}
                />
                {chart.series.map((item) => (
                    <Bar
                        key={item.name}
                        isAnimationActive={true}
                        dataKey={chart.key(item.name)}
                        fill={chart.color(item.color)}
                        // radius={[8, 8, 8, 8]}
                        // barSize={40}
                    >
                        {/* <LabelList
                            dataKey={chart.key(item.name)}
                            position="top"
                            style={{ fontWeight: "600", fill: chart.color("fg") }}
                        /> */}
                    </Bar>
                ))}
            </BarChart>
        </Chart.Root>
    )

}

  

export default SpendTrendChart