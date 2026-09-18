import {
  LuArrowDownLeft,
  LuArrowUpRight,
  LuCoffee,
  LuShoppingCart,
  LuWallet,
} from "react-icons/lu";

const transactions = [
  {
    id: 1,
    title: "Lunch",
    category: "Food",
    date: "Today",
    amount: -250,
    icon: LuCoffee,
  },
  {
    id: 2,
    title: "Groceries",
    category: "Shopping",
    date: "Yesterday",
    amount: -850,
    icon: LuShoppingCart,
  },
  {
    id: 3,
    title: "Salary",
    category: "Income",
    date: "Aug 25",
    amount: 30000,
    icon: LuWallet,
  },
];

export default function RecentTransactions() {
  return (
    <section>
      <div className="mb-3! flex items-center justify-between">

        <h2 className="text-base! font-semibold!">
          Recent transactions
        </h2>

        <button className="text-sm! font-medium! text-(--chakra-colors-fg-muted)! ">
          See all
        </button>
      </div>

      <div className="overflow-hidden p-4! rounded-xl! bg-(--chakra-colors-bg-subtle)">
        {transactions.map((transaction, index) => {
          const Icon = transaction.icon;
          const isIncome = transaction.amount > 0;

          return (
            <div
              key={transaction.id}
              className={`flex items-center gap-3! p-4! ${
                index !== transactions.length - 1
                  ? "border-b! "
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0! items-center justify-center rounded-full bg-(--chakra-colors-bg-emphasized)!">
                <Icon size={19} className="text-(--chakra-colors-fg-muted)" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm! font-medium!">
                  {transaction.title}
                </p>

                <p className="mt-0.5! text-xs! text-(--chakra-colors-fg-muted)">
                  {transaction.category} · {transaction.date}
                </p>
              </div>

              <div
                className={`flex items-center gap-1 text-sm! font-semibold! ${
                  isIncome
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {isIncome ? (
                  <LuArrowUpRight size={15} />
                ) : (
                  <LuArrowDownLeft size={15} />
                )}

                {isIncome ? "+" : "-"}₱
                {Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}