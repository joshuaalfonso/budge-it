import CategoryList from "@/components/settings/CategoryList"
import CategoryDialog from "@/components/settings/CategoryDialog";
import Preferences from "@/components/settings/Preferences"
import { colorPallette } from "@/constants"
import { useCategoryDialogStore } from "@/stores/category.store";
import { Button } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { useCategory } from "@/queries/category.queries";




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

                        <Button size="xs" variant="ghost" colorPalette={colorPallette} onClick={() => setOpen(true)}>
                            <LuPlus />
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
                    {/* <p className="text-sm text-gray-500">
                        Export, import, or manage your budget data.
                    </p> */}
                </div>

                <div className="divide-y!  rounded-xl  bg-(--chakra-colors-bg-subtle) ">
                    <div className="flex items-center justify-between gap-4 p-4!">
                        <div>
                            <p className="text-sm font-medium text-(--chakra-colors-fg-muted)">
                                Export data
                            </p>
                            {/* <p className="mt-0.5 text-sm text-gray-500">
                                Download your transactions as a CSV file.
                            </p> */}
                        </div>

                        <button className="rounded-lg border! px-3! py-2! text-sm! font-medium! ">
                            Export
                        </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4!">
                        <div>
                            <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                                Import data
                            </p>
                            {/* <p className="mt-0.5 text-sm text-gray-500">
                                Import transactions from a CSV file.
                            </p> */}
                        </div>

                        <button className="rounded-lg border! px-3! py-2! text-sm! font-medium! ">
                            Import
                        </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4!">
                        <div>
                            <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                                Clear transactions
                            </p>
                            <p className="mt-0.5! text-sm! text-(--chakra-colors-fg-subtle)">
                                Remove all transactions while keeping your categories.
                            </p>
                        </div>

                        <button className="rounded-lg  px-3! py-2! text-sm! font-medium! text-red-400! bg-red-400/10! ">
                            Clear data
                        </button>
                    </div>
                </div>
            </section>

            {/* Danger Zone */}
            <section className="space-y-3!">
                <div>
                    <h2 className="text-sm! font-semibold! text-red-400">
                        Danger zone
                    </h2>
                    {/* <p className="text-sm! text-(--chakra-colors-fg-muted)">
                        These actions cannot be undone.
                    </p> */}
                </div>

                <div className="rounded-xl border border-red-200 bg-red-400/10 p-4!">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                                Delete all data
                            </p>
                            <p className="mt-0.5! text-sm! text-(--chakra-colors-fg-subtle)">
                                Permanently delete your transactions, wallets,
                                and categories.
                            </p>
                        </div>

                        <button className="shrink-0 rounded-lg bg-red-500! px-3! py-2! text-sm! font-medium! text-white ">
                            Delete everything
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Settings
