import {
    LuChartPie,
    LuHouse,
    LuReceiptText,
    LuWallet,
    LuPlus
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


export default function MobileNav() {
  return (
    <nav className="fixed bottom-2 left-4 right-4 z-50 rounded-4xl px-1! py-1! backdrop-blur-md border! border-(--chakra-colors-border-muted)! lg:hidden">
      <div className="relative grid grid-cols-4 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            // <button
            //   key={item.label}
            //   className="flex flex-col items-center gap-1 py-1! text-xs! text-(--chakra-colors-fg-muted)!"
            // >
            //   <Icon size={20} />
            //   <span>{item.label}</span>
            // </button>
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1! text-xs! text-(--chakra-colors-fg-muted)! rounded-4xl ${
                  isActive
                    ? "bg-orange-400/10 text-orange-400!"
                    : ""
                }`
              }
            >
              <Icon  size={20}  />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <button
          className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-(--chakra-colors-bg-subtle)! border! border-(--chakra-colors-border-muted)!"
          aria-label="Add transaction"
        >
          <LuPlus size={24} />
        </button>
      </div>
    </nav>
  );
}