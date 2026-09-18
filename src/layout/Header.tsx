import { ColorModeButton } from "@/components/ui/color-mode";
import { LuBell } from "react-icons/lu";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full bg-(--chakra-colors-bg) flex h-16 items-center justify-between border-b  px-4! sm:px-6 z-10">
       
        <h2 className="text-sm font-semibold">
        </h2>

      <div className="ml-auto flex items-center gap-2">

        <ColorModeButton />

        <button
          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white"
          aria-label="Notifications"
        >
          <LuBell size={20} />
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium dark:bg-zinc-800"
          aria-label="Profile"
        >
          J
        </button>
      </div>
    </header>
  );
}