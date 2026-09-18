import { Chart, useChart } from "@chakra-ui/charts"
import { Pie, PieChart, Sector, Tooltip } from "recharts"

const SpendByWalletChart = () => {

    const chart = useChart({
        data: [
            { name: "BDO", value: 900, color: "blue.solid" },
            { name: "GCASH", value: 300, color: "orange.solid" },
            { name: "CASH", value: 300, color: "pink.solid" },
        ],
    })

    return (
        <Chart.Root boxSize="200px" chart={chart} mx="auto">
            <PieChart responsive>
                <Tooltip
                    cursor={false}
                    animationDuration={100}
                    content={<Chart.Tooltip hideLabel />}
                />
                
                <Pie
                    innerRadius={80}
                    outerRadius={100}
                    isAnimationActive={false}
                    data={chart.data}
                    dataKey={chart.key("value")}
                    paddingAngle={8}
                    cornerRadius={4}
                    stroke="none"
                    shape={(props) => (
                        <Sector 
                            {...props} 
                            fill={chart.color(props.payload!.color)} 
                        />
                    )}
                />
            </PieChart>
        </Chart.Root>
    )
}

export default SpendByWalletChart