import Header from "./Header"
import Sidebar from "./Sidebar"
import MobileNav from "./MobileNav"
import { Outlet } from "react-router-dom"


const AppLayout = () => {
    return (
        <div className="min-h-screen">
           <div className="relative flex min-h-screen max-w-4xl mx-auto!">
                <div className="sticky top-0 h-screen">
                    <Sidebar />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                    <Header />

                    <main className="mb-25! flex-1 px-4! pb-20 lg:pb-0">
                        <Outlet />
                    </main>
                </div>
            </div>

            <MobileNav />
        </div>
    )
}

export default AppLayout