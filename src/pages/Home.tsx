import {  useGoogleLogin } from "@react-oauth/google";
import { verifyGoogleCredential } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import HomeMockUp from '../assets/home-mockup.webp'
import ReportMockUp from '../assets/report-mockup3.webp'
import Wallet from '../assets/wallet-logo.png'
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { colorPallette } from "@/constants";


const Home = () => {

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const navigate = useNavigate();

    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            setIsLoggingIn(true);
            try {
                await verifyGoogleCredential(codeResponse.code);
                navigate("/dashboard");

            } catch (error) {
                setIsLoggingIn(false);
                console.error('Google login error:', error);
                toaster.create({
                    title: 'Something went wrong',
                    type: 'error'
                })
            } finally {
                setIsLoggingIn(false);
            }
        },
        onError: (errorResponse) => {
            console.error('Google authorization failed:', errorResponse);
            toaster.create({
                title: 'Something went wrong',
                type: 'error'
            })
        },
    });

    return (

        <main className="min-h-screen ">

            <nav className="mx-auto! flex max-w-6xl! items-center justify-between px-6! py-6!">
                <a href="#" className="flex items-center gap-2.5">
                    <div className="w-7 h-7">
                        <img src={Wallet} alt="logo" />
                    </div>
                    <span className="text-lg! font-semibold! tracking-tight!">
                        budge it.
                    </span>
                </a>

                <Button
                    type="button"
                    onClick={() => login()}
                    disabled={isLoggingIn}
                    colorPalette={colorPallette}
                    rounded="full"
                >
                    {isLoggingIn ? "Logging in..." : "Log in"}
                </Button>
            </nav>

            <section className="mx-auto! max-w-6xl! px-6! pb-24! pt-16! lg:pt-28!">
                <div className="grid items-center gap-16 md:grid-cols-2">

                    <div>
                        <div className="mb-6! inline-flex items-center gap-2 rounded-full  px-3.5! py-1.5! text-sm! font-medium! text-blue-500">
                            A simpler way to budget
                        </div>

                        <h1 className="max-w-xl! text-5xl! font-semibold! leading-[1.04]! tracking-[-0.045em]! sm:text-6xl!">
                            A budget that actually fits your life.
                        </h1>

                        <p className="mt-6! max-w-lg! text-lg! leading-8! text-(--chakra-colors-fg-muted) ">
                            Keep an eye on your spending, set limits that make sense,
                            and know exactly where your money is going without turning
                            budgeting into a second job.
                        </p>

                        <div className="mt-9! flex flex-col gap-3 sm:flex-row!">
                            <Button
                                type="button"
                                colorPalette={colorPallette}
                                onClick={() => login()}
                                rounded="full"
                            >
                                Start budgeting
                            </Button> 
                        </div>

                        <p className="mt-4! text-xs! font-medium! text-(--chakra-colors-fg-subtle)">
                            Set up your first budget in under a minute.
                        </p>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <img
                            src={HomeMockUp}
                            alt="Budge It mobile app"
                            className="h-auto w-64"
                        />
                    </div>

                </div>
            </section>

            <section className="border-t border-(--chakra-colors-border)!">
                <div className="mx-auto! max-w-6xl! px-6! py-24! lg:py-32!">

                    <div className="grid items-center gap-16 md:grid-cols-2">

                        {/* APP SCREENSHOT / DASHBOARD IMAGE */}
                        <div className="flex justify-center md:justify-start order-2 md:order-1">
                            <img
                                src={ReportMockUp}
                                alt="Budge It budget overview"
                                className="h-auto w-64"
                            />
                        </div>

                        <div className="order-1 md:order-2">
                            <p className="text-sm! font-medium! text-blue-500">
                                See the bigger picture
                            </p>

                            <h2 className="mt-3! max-w-lg! text-4xl! font-semibold! leading-tight! tracking-[-0.035em]! sm:text-5xl!">
                                Know where your money goes.
                            </h2>

                            <p className="mt-5! max-w-lg! text-base! leading-7! text-(--chakra-colors-fg-muted)">
                                Instead of digging through transactions and spreadsheets,
                                see your spending clearly in one place.
                            </p>

                            <p className="mt-4! max-w-lg! text-base! leading-7! text-(--chakra-colors-fg-muted)">
                                Track what you've spent, see what's left, and make better
                                decisions before the month gets away from you.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <section className="bg-(--chakra-colors-bg-subtle)!">
                <div className="mx-auto! max-w-6xl! px-6! py-24! lg:py-32!">

                    <div className="mx-auto! max-w-2xl! text-center">
                        <p className="text-sm! font-medium! text-blue-500">
                            Keep it simple
                        </p>

                        <h2 className="mt-3! text-4xl! font-semibold! tracking-[-0.035em]! sm:text-5xl!">
                            Everything you need. Nothing you don't.
                        </h2>

                        <p className="mt-5! text-base! leading-7! text-(--chakra-colors-fg-muted)">
                            Budge It gives you the basics that actually matter
                            when you're trying to stay on top of your money.
                        </p>
                    </div>


                    <div className="mt-16! grid gap-6! md:grid-cols-3!">

                        <div className="rounded-3xl bg-(--chakra-colors-bg)! p-7!">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm! font-semibold! text-blue-500">
                                01
                            </div>

                            <h3 className="mt-6! text-xl! font-semibold!">
                                Track
                            </h3>

                            <p className="mt-3! text-sm! leading-6! text-(--chakra-colors-fg-muted)">
                                See what you're spending and where your money
                                is actually going.
                            </p>
                        </div>


                        <div className="rounded-3xl bg-(--chakra-colors-bg)! p-7!">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm! font-semibold! text-blue-500">
                                02
                            </div>

                            <h3 className="mt-6! text-xl! font-semibold!">
                                Set limits
                            </h3>

                            <p className="mt-3! text-sm! leading-6! text-(--chakra-colors-fg-muted)">
                                Create realistic spending limits without making
                                your budget feel restrictive.
                            </p>
                        </div>


                        <div className="rounded-3xl bg-(--chakra-colors-bg)! p-7!">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm! font-semibold! text-blue-500">
                                03
                            </div>

                            <h3 className="mt-6! text-xl! font-semibold!">
                                Stay aware
                            </h3>

                            <p className="mt-3! text-sm! leading-6! text-(--chakra-colors-fg-muted)">
                                Know how you're doing throughout the month,
                                not after it's already over.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <section className="px-6! py-24! lg:py-32!">

                <div className="mx-auto! max-w-6xl! overflow-hidden! rounded-4xl! bg-blue-500! px-6! py-20! text-center! sm:px-12! lg:py-24!">

                    <h2 className="mx-auto! max-w-2xl! text-4xl! font-semibold! leading-tight! tracking-[-0.035em]! text-white! sm:text-5xl!">
                        Ready to know where your money goes?
                    </h2>

                    <p className="mx-auto! mt-5! max-w-lg! text-base! leading-7! text-blue-100!">
                        Start tracking your spending and build a budget
                        that works for you.
                    </p>

                    <Button
                        type="button"
                        onClick={() => login()}
                        disabled={isLoggingIn}
                        bg="white"
                        color="blue.500"
                        rounded="full"
                        mt={8}
                        fontSize="sm"
                        fontWeight="semibold"
                        _hover={{ bg: "blue.50" }}
                    >
                        {isLoggingIn ? "Logging in..." : "Start budgeting"}
                    </Button>

                </div>

            </section>

            <footer className="mx-auto! flex max-w-6xl! flex-col gap-4! px-6! pb-8! pt-2! sm:flex-row! sm:items-center! sm:justify-between!">

                <span className="text-sm! font-medium!">
                    budge it.
                </span>

                <p className="text-xs! text-(--chakra-colors-fg-muted)">
                    © 2026 Budge It. Keep your money in check.
                </p>

            </footer>
           
        </main>
    );
};

export default Home;
