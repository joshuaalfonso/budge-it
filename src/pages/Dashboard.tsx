import BalanceCard from "@/components/dashboard/BalanceCard";
// import QuickActions from "@/components/dashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/RecentTransaction";
import SummaryCards from "@/components/dashboard/SummaryCards";




export default function Dashboard() {
    return (
        <div>
           {/* Page heading */}
            <div className="mb-6!">
                <p className="text-sm! text-(--chakra-colors-fg-muted)">
                    Here's your financial overview
                </p>

                {/* <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Your finances
                </h1> */}
            </div>

            {/* Dashboard content */}
            <div className="space-y-4! sm:space-y-6!">
                <BalanceCard />

                <SummaryCards />

                {/* <QuickActions /> */}

                <RecentTransactions />
            </div>
        </div>
    );
}