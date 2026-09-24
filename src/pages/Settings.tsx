import { CURRENCIES } from "@/data/currency"
import { useCurrencyStore } from "@/stores/currency.store";

const Settings = () => {


    const currency = useCurrencyStore((state) => state.currency);
    const setCurrency = useCurrencyStore((state) => state.setCurrency);

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
            <section className="space-y-3!">
                <div>
                    <h2 className="text-sm! font-semibold! text-(--chakra-colors-fg-muted)">
                        Preferences
                    </h2>
                    {/* <p className="text-sm! text-(--chakra-colors-fg-subtle)">
                        Customize how your budget tracker works.
                    </p> */}
                </div>

                <div className="divide-y! rounded-xl bg-(--chakra-colors-bg-subtle)">
                    {/* Currency */}
                    <div className="flex items-center justify-between gap-4! p-4!">
                        <div>
                            <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                                Currency
                            </p>
                        </div>

                        <select 
                            value={currency}
                            onChange={(e) =>
                                setCurrency(e.target.value as keyof typeof CURRENCIES)
                            }
                            className="rounded-lg border! bg-(--chakra-colors-bg-muted) px-3! py-2! text-sm! text-(--chakra-colors-emphasized) outline-none focus:border!"
                        >
                            {Object.values(CURRENCIES).map((currency) => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.code} — {currency.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Theme */}
                    <div className="flex items-center justify-between gap-4! p-4!">
                        <div>
                            <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                                Theme
                            </p>
                            {/* <p className="mt-0.5 text-sm text-(--chakra-colors-fg-muted)">
                                Choose your preferred appearance.
                            </p> */}
                        </div>

                        <select className="rounded-lg border border-gray-200 bg-(--chakra-colors-bg-subtle) px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400">
                            <option>System</option>
                            <option>Light</option>
                            <option>Dark</option>
                        </select>
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center justify-between gap-4 p-4!">
                        <div>
                            <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                                Budget reminders
                            </p>
                            {/* <p className="mt-0.5 text-sm text-gray-500">
                                Get reminded about your monthly budget.
                            </p> */}
                        </div>

                        <button
                            type="button"
                            className="relative h-6 w-11 rounded-full bg-gray-900 transition"
                        >
                            <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-(--chakra-colors-bg-muted) shadow-sm" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="space-y-3!">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm! font-semibold! text-(--chakra-colors-fg-muted)">
                            Categories
                        </h2>
                        {/* <p className="text-sm! text-(--chakra-colors-fg-subtle)">
                            Organize your income and expenses.
                        </p> */}
                    </div>

                    <button className="rounded-lg bg-blue-500! px-3! py-2! text-sm! font-medium! text-white hover:bg-blue-600!">
                        + Add category
                    </button>
                </div>

                <div className="overflow-hidden rounded-xl  bg-(--chakra-colors-bg-subtle)">
                    {[
                        { name: "Food & Dining", type: "Expense", color: "bg-orange-500" },
                        { name: "Transportation", type: "Expense", color: "bg-blue-500" },
                        { name: "Bills & Utilities", type: "Expense", color: "bg-purple-500" },
                        { name: "Shopping", type: "Expense", color: "bg-pink-500" },
                        { name: "Salary", type: "Income", color: "bg-green-500" },
                    ].map((category) => (
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
