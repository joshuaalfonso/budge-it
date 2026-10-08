import CategoryList from "@/components/settings/CategoryList"
import CategoryDialog from "@/components/settings/CategoryDialog";
import Preferences from "@/components/settings/Preferences"
import { colorPallette } from "@/constants"
import { useCategoryDialogStore } from "@/stores/category.store";
import { Button  } from "@chakra-ui/react";
import { useCategory } from "@/queries/category.queries";
import DeleteTransactionAlert from "@/components/settings/DeleteTransactionAlert";
import DeleteAllDataAlert from "@/components/settings/DeleteAllData";

const Settings = () => {

    const { data: categories, isPending: isLoading, error } = useCategory();

    const setOpen = useCategoryDialogStore((state) => state.setOpen);

    return (
        <div className="space-y-8!">
            {/* Header */}
            <div>
                <h1 className="text-2xl! font-semibold! tracking-tight! sm:text-2xl!">
                    Settings
                </h1>
                <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                    Manage your preferences, categories, and budget data.
                </p>
            </div>

            {/* Preferences */}
            <Preferences />

            {/* Categories */}

                <section className="space-y-3!">

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-sm! font-semibold! text-(--chakra-colors-fg-muted)">
                                Categories
                            </h2>
                        </div>

                        <Button size="sm" variant="ghost" colorPalette={colorPallette} onClick={() => setOpen(true)}>
                            {/* <LuPlus /> */}
                            <span>Add Category</span>
                        </Button>
                    </div>

                    <CategoryList 
                        categories={categories ?? []} 
                        isLoading={isLoading} 
                        error={error} 
                    />

                    <CategoryDialog />

            </section>

            {/* Data Management */}
            <section className="space-y-3!">
                <div>
                    <h2 className="text-sm! font-semibold! text-(--chakra-colors-fg-muted)">
                        Data management
                    </h2>
                </div>

                <div className="divide-y!  rounded-xl  bg-(--chakra-colors-bg-subtle) ">

                    <div className="flex items-center justify-between gap-4 px-6! py-3!">
                        <div>
                            <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                                Clear Transactions
                            </p>
                            <p className="mt-0.5! text-xs! text-(--chakra-colors-fg-subtle) w-50 md:w-auto">
                                Remove all transactions while keeping your categories.
                            </p>
                        </div>

                        <DeleteTransactionAlert />

                    </div>

                    <div className="rounded-xl border bg-(--chakra-colors-bg-subtle) px-6! py-3!">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                                    Reset Data
                                </p>
                                <p className="mt-0.5! text-xs! text-(--chakra-colors-fg-subtle) w-50 md:w-auto">
                                    Permanently delete your transactions, wallets,
                                    and categories.
                                </p>
                            </div>

                            <DeleteAllDataAlert />

                        </div>
                    </div>

                </div>
            </section>

          
        </div>
    )
}

export default Settings
