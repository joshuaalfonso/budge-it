import type { SpendingByCategory } from "@/types/analytics.types"
import { BarList, type BarListData, useChart } from "@chakra-ui/charts"


interface Props {
    spendingByCategory: SpendingByCategory[]
}

const SpendByCategoryChart = ({spendingByCategory}: Props) => {

    console.log(spendingByCategory)

    const data: BarListData[] = spendingByCategory.map(({ categoryName, total }) => ({
        name: categoryName,
        value: +total,
    }))

     const chart = useChart<BarListData>({
        sort: { by: "value", direction: "desc" },
        data: data,
        series: [{ name: "name", color: "blue.emphasized" }],
    })

  return (
    <BarList.Root chart={chart} w="w-full">
      <BarList.Content>
        <BarList.Bar />
        <BarList.Value />
      </BarList.Content>
    </BarList.Root>
  )


}

export default SpendByCategoryChart