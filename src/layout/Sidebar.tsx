import {
    LuChartPie,
    LuHouse,
    LuReceiptText,
    LuSettings,
    LuWallet
} from "react-icons/lu";
import { NavLink } from "react-router-dom";

const navItems = [
    {
        label: "Dashboard",
        href: "/",
        icon: LuHouse,
    },
    {
        label: "Transactions",
         href: "/transactions",
        icon: LuReceiptText,
    },
    {
        label: "Wallet",
        href: "/wallets",
        icon: LuWallet,
    },
    {
        label: "Reports",
        href: "/reports",
        icon: LuChartPie,
    },
];

export default function Sidebar() {
    return (
        <aside className="hidden sticky top-0 lg:flex lg:w-64 lg:flex-col border-r h-full">

            <div className="flex h-16 items-center px-6">
                <h1 className="text-lg! font-semibold!">
                    Budget Tracker
                </h1>
            </div>

            <nav className="flex-1 space-y-1.5! px-3 py-4">
                {navItems.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.href === "/"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-md! px-3! py-2! text-sm! font-medium! transition ${
                            isActive
                                ? "bg-orange-400/10 text-orange-400!"
                                : " hover:bg-orange-400/10"
                            }`
                        }
                    >
                        <Icon size={18} />
                        {item.label}
                    </NavLink>
                );
                })}
            </nav>

            <div className="border-t p-3!">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-md! px-3! py-2! text-sm! font-medium! ${
                        isActive
                            ? "bg-orange-400/10 text-orange-400!"
                            : "hover:bg-orange-400/10"
                        }`
                    }
                >
                <LuSettings size={18} />
                    Settings
                </NavLink>
            </div>

        </aside>
    );
}