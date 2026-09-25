import BalanceCard from "@/components/dashboard/BalanceCard";
import RecentTransactions from "@/components/dashboard/RecentTransaction";
import { useDashboard } from "@/queries/dashboard.queries";


export default function Dashboard() {

    const { data, isPending, error } = useDashboard();

    if (isPending) return <>Loading...</>;
    if (error) return <>Something went wrong</>;

    return (
        <div>
            <div className="mb-6!">
                <p className="text-sm! text-(--chakra-colors-fg-muted)">
                    Here's your financial overview
                </p>
            </div>

            <div className="space-y-4! sm:space-y-6!">

                <BalanceCard 
                    totalBalance={data?.totalBalance ?? 0} 
                    totalIncome={data?.totalIncome ?? 0} 
                    totalExpense={data?.totalExpense ?? 0} 
                />

                <RecentTransactions transactions={data?.recentTransactions ?? []} />
            </div>
        </div>
    );
}