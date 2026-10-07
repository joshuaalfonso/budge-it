import type { SpendingByCategory } from "@/types/analytics.types"
import { BarList, type BarListData, useChart } from "@chakra-ui/charts"


interface Props {
    spendingByCategory: SpendingByCategory[]
}

const SpendByCategoryChart = ({spendingByCategory}: Props) => {

    const data: BarListData[] = spendingByCategory.map(({ categoryName, total }) => ({
        name: categoryName,
        value: +total,
    }))

     const chart = useChart<BarListData>({
        sort: { by: "value", direction: "desc" },
        data: data,
        series: [{ name: "name", color: "blue.emphasized" }],
    })

    if (spendingByCategory.length === 0) return (
        <div className="h-full! grid place-items-center">
            <span className="text-(--chakra-colors-fg-muted)">Nothing to display</span>
        </div>
    )

    return (
        <BarList.Root chart={chart} w="w-full">
        <BarList.Content>
            <BarList.Bar tooltip />
            <BarList.Value />
        </BarList.Content>
        </BarList.Root>
    )


}

export default SpendByCategoryChart