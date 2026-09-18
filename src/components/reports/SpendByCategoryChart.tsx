import { Chart, useChart } from "@chakra-ui/charts"
import { Legend, Pie, PieChart, Sector, Tooltip } from "recharts"


const SpendByCategoryChart = () => {

    const chart = useChart({
        data: [
            { name: "Food", value: 400, color: "orange.500" },
            { name: "Transport", value: 300, color: "orange.400" },
            { name: "Bills", value: 1000, color: "orange.300" },
        ],
    })

    return (
        <Chart.Root boxSize="200px" mx="auto" chart={chart}>
            <PieChart responsive>
                <Tooltip
                    cursor={false}
                    animationDuration={100}
                    content={<Chart.Tooltip hideLabel />}
                />
                <Legend content={<Chart.Legend />} />
                <Pie
                    isAnimationActive={false}
                    data={chart.data}
                    dataKey={chart.key("value")}
                    nameKey="name"
                    shape={(props) => (
                        <Sector {...props}  className="stroke-1.5 stroke-(--chakra-colors-bg-subtle)" fill={chart.color(props.payload!.color)} />
                    )}
                />
            </PieChart>
        </Chart.Root>
    )


}

export default SpendByCategoryChart