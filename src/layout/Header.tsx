import { logout } from "@/api/auth";
import { useColorMode } from "@/components/ui/color-mode";

import { useMe } from "@/queries/auth.queries";
import { Avatar, Menu, Portal } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LuLogOut, LuMoon, LuSun } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { colorMode, toggleColorMode } = useColorMode()

    const navigate = useNavigate();

    const { data: user } = useMe();

    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {

            setIsLoggingOut(true);
            await logout();

            queryClient.removeQueries({
                queryKey: ["me"],
            });

            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="sticky top-0 left-0 w-full bg-(--chakra-colors-bg) flex h-17 items-center justify-between border-b  px-4! sm:px-6 z-10">
        
            <h2 className="text-sm font-semibold">
            </h2>

            <div className="ml-auto flex items-center gap-2">

                {/* <Button size='md' variant={'ghost'} onClick={toggleColorMode}>
                    <LuMoon />
                </Button>

                <Button 
                    size={'md'} 
                    variant={'ghost'} 
                    onClick={handleLogout} 
                    loading={isLoggingOut}
                >
                    <LuLogOut className="text-(--chakra-colors-fg)" />
                </Button> */}

                <Menu.Root positioning={{ placement: "bottom-end" }}>
                    <Menu.Trigger rounded="full" focusRing="outside" disabled={isLoggingOut}>
                        <Avatar.Root size="sm" colorPalette={'orange'}>
                            <Avatar.Fallback name={user?.name ?? 'Unknown'} />
                            <Avatar.Image src={user?.picture} />
                        </Avatar.Root>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Item 
                                    value="settings" 
                                    onClick={toggleColorMode}
                                >
                                    { colorMode === 'dark' ? (
                                        <>
                                            <LuSun size={17} className="flex" />
                                            Light
                                        </>
                                    ) : (
                                        <>
                                            <LuMoon size={17} />
                                            Dark
                                        </>
                                    ) }
                                </Menu.Item>
                                <Menu.Item 
                                    value="logout" 
                                    onClick={handleLogout}
                                >
                                    <LuLogOut size={17} />
                                    Logout
                                </Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>

            </div>
        </header>
    );
}