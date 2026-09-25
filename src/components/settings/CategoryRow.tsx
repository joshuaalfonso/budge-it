import { useCategoryDialogStore } from "@/stores/category.store";
import type { Category } from "@/types/category.type"
import { Button, Menu, Portal } from "@chakra-ui/react";
import { LuEllipsis } from "react-icons/lu";


const CategoryRow = ({category}: {category: Category}) => {

    const setSelected = useCategoryDialogStore((state) => state.setSelected);

    return (
        <div
            key={category.name}
            className="flex items-center justify-between border-b! p-4! last:border-0!"
        >
            <div className="flex items-center gap-3">
    
                <span className="text-2xl!">{category.icon}</span>

                <div>
                    <p className="text-sm! font-medium text-(--chakra-colors-fg)">
                        {category.name}
                    </p>
                    <p className="text-xs! text-(--chakra-colors-fg-muted) capitalize">
                        {category.type}
                    </p>
                </div>
            </div>

            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button variant="ghost" size="xs">
                        <LuEllipsis />
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="edit" onClick={() => setSelected(category)}>Edit</Menu.Item>
                        <Menu.Item value="delete">Delete</Menu.Item>
                    </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>

        </div>
    )
}

export default CategoryRow