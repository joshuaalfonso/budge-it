import {EmptyState, ScrollArea, VStack } from "@chakra-ui/react";
// import { useCategoryDialogStore } from "@/stores/category.store";
import type { Category } from "@/types/category.type";
import CategoryRow from "./CategoryRow";


interface Props {
    categories: Category[];
    isLoading: boolean,
    error: Error | null
}

const CategoryList = ({ categories, isLoading, error }: Props) => {

    // const setSelected = useCategoryDialogStore((state) => state.setSelected);

    // const { data: categories, isPending, error } = useCategory();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load categories</p>;

    if (categories.length === 0) return (
        <EmptyState.Root bg="bg.subtle" rounded="xl">
            <EmptyState.Content>
                <EmptyState.Indicator>
                {/* <LuTag /> */}
                </EmptyState.Indicator>
                <VStack textAlign="center">
                <EmptyState.Title>No category yet</EmptyState.Title>
                <EmptyState.Description>
                    Explore our products and add items to your cart
                </EmptyState.Description>
                </VStack>
            </EmptyState.Content>
        </EmptyState.Root>
    )

    return (

        <ScrollArea.Root bg="bg.subtle" size="xs" rounded="xl" maxH="30rem" maxW="">

            <ScrollArea.Viewport
                css={{
                    "--scroll-shadow-size": "4rem",
                    maskImage: "linear-gradient(#000, #000)",
                    "&[data-overflow-y]": {
                        maskImage:
                        "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        "&[data-at-top]": {
                        maskImage:
                            "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                        "&[data-at-bottom]": {
                        maskImage:
                            "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                    },
                }}
            >

                <ScrollArea.Content spaceY="4" textStyle="sm" paddingEnd="5">
                    {categories.map((category) => (
                        <CategoryRow 
                            key={category.icon} 
                            category={category}
                         />
                    ))}
                </ScrollArea.Content>

            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar>

            <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            <ScrollArea.Corner />

        </ScrollArea.Root>
                

    )
}

export default CategoryList