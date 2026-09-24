import { colorPallette } from "@/constants";
import { useCategory } from "@/queries/category.queries"
import { Button } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import CategoryDialog from "./CategoryDialog";
import { useCategoryDialogStore } from "@/stores/category.store";




const Categories = () => {

    const setOpen = useCategoryDialogStore((state) => state.setOpen);

    const { data: categories, isPending, error } = useCategory();

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Failed to load categories</p>;

    return (
        <section className="space-y-3!">

            <CategoryDialog />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm! font-semibold! text-(--chakra-colors-fg-muted)">
                        Categories
                    </h2>
                </div>

                <Button size="xs" colorPalette={colorPallette} onClick={() => setOpen(true)}>
                    <LuPlus />
                    <span>Add Category</span>
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl  bg-(--chakra-colors-bg-subtle)">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="flex items-center justify-between border-b! p-4! last:border-0!"
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${category.color}`}
                            />

                            <div>
                                <p className="text-sm! font-medium text-(--chakra-colors-fg)">
                                    {category.name}
                                </p>
                                <p className="text-xs! text-(--chakra-colors-fg-muted)">
                                    {category.type}
                                </p>
                            </div>
                        </div>

                        <button className="text-sm! font-medium! text-(--chakra-colors-fg-muted)! ">
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Categories