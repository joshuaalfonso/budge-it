import {
    LuChartPie,
    LuHouse,
    LuReceiptText,
    LuWallet
} from "react-icons/lu";
import { NavLink } from "react-router-dom";
import wallet from '../assets/wallet-logo.png'
import { colorPallette } from "@/constants";

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

    const colors = {
        red: "bg-red-400/10 text-red-400!",
        blue: "bg-blue-400/10 text-blue-400!",
        green: "bg-green-400/10 text-green-400!",
        orange: "bg-orange-400/10 text-orange-400!",
    };

    const color = colors[colorPallette];

    return (
        <aside className="hidden sticky top-0 lg:flex lg:w-64 lg:flex-col border-r h-full">

            <div className="flex h-16 items-center gap-2 px-6">
                <div className="w-7 h-7">
                    <img src={wallet} alt="logo" />
                </div>
                <h1 className="text-lg! font-semibold!">
                    Budge It
                </h1>
            </div>

            <nav className="flex-1 space-y-1.5! px-3 py-4 mt-3!">
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
                                ? color
                                : ` hover:bg-${colorPallette}-400/10`
                            }`
                        }
                    >
                        <Icon size={18} />
                        {item.label}
                    </NavLink>
                );
                })}
            </nav>

            {/* <div className="border-t p-3!">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-md! px-3! py-2! text-sm! font-medium! ${
                        isActive
                            ? `bg-${colorPallette}-400/10 text-${colorPallette}-400!`
                            : `hover:bg-${colorPallette}-400/10`
                        }`
                    }
                >
                <LuSettings size={18} />
                    Settings
                </NavLink>
            </div> */}

        </aside>
    );
}