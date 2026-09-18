


import { BarList, type BarListData, useChart } from "@chakra-ui/charts"

const SpendTopByCategory = () => {
    const chart = useChart<BarListData>({
        sort: { by: "value", direction: "desc" },
        data: [
            { name: "Food", value: 15000 },
            { name: "Bills", value: 14000 },
            { name: "Transport", value: 7000 },
            { name: "Clothes", value: 4000 },
            { name: "Debt", value: 2000 },
        ],
        series: [{ name: "name", color: "orange.muted" }],
    })

    return (
        <BarList.Root w={'full'} chart={chart}>
            <BarList.Content>
                <BarList.Bar />
                <BarList.Value />
            </BarList.Content>
        </BarList.Root>
    )
}

export default SpendTopByCategory