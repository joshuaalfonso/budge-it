import Header from "./Header"
import Sidebar from "./Sidebar"
import MobileNav from "./MobileNav"
import { Outlet } from "react-router-dom"
import { useDashboard } from "@/queries/dashboard.queries"
import EmptyWallet from "@/components/wallets/EmptyWallet"


const AppLayout = () => {

    const { data, isPending, error } = useDashboard();

    if (isPending) return <>Loading...</>;
    if (error) return <>Something went wrong</>;

    if (data.wallets.length === 0) return (
        <div className="h-dvh max-w-4xl mx-auto! ">
            <EmptyWallet />
        </div>
    )


    return (
        <div className="min-h-screen">
           <div className=" flex min-h-screen max-w-4xl mx-auto!">
                <div className="sticky top-0 h-screen">
                    <Sidebar />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                    <Header />

                    <main className="mb-25! mt-3! flex-1 px-6! lg:pb-0">
                        <Outlet />
                    </main>
                </div>
            </div>

            <MobileNav />
        </div>
    )
}

export default AppLayout