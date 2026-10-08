import {  useGoogleLogin } from "@react-oauth/google";
import { verifyGoogleCredential } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import MobileMockUp from '../assets/home-ss-3.png'
import ReportsMockUp from '../assets/reports-ss.png'
import Wallet from '../assets/wallet-logo.png'


const Home = () => {

    const navigate = useNavigate();



    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            try {
                const response = await verifyGoogleCredential(codeResponse.code);
                toaster.create({
                    description: `Welcome ${response.name} 🥳!`
                })
                navigate("/dashboard");

            } catch (error) {
                console.error('Google login error:', error);
                toaster.create({
                    title: 'Something went wrong',
                    type: 'error'
                })
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
        // <div className="h-dvh grid place-items-center">
        //     <GoogleLogin
        //         onSuccess={async (response) => {
        //             if (!response.credential) {
        //                 return;
        //             }

        //             try {
        //                 const result = await verifyGoogleCredential(response.credential);
        //                 console.log(result);
        //                 navigate("/dashboard");
        //             } catch (error) {
        //                 console.error(error);
        //             }
        //         }}
        //         onError={() => console.log("error")}
        //     />
        // </div>

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

                <button
                    type="button"
                    className="cursor-pointer rounded-full bg-blue-500! px-5! py-2.5! text-sm! font-medium! text-white transition hover:bg-blue-600!"
                    onClick={() => login()}
                >
                    Get started
                </button>
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
                            <button
                                type="button"
                                className="cursor-pointer rounded-full bg-blue-500! px-6! py-3.5! text-center text-sm! font-semibold! text-white transition hover:bg-blue-600!"
                                onClick={() => login()}
                            >
                                Start budgeting
                            </button> 
                        </div>

                        <p className="mt-4! text-xs! font-medium! text-(--chakra-colors-fg-subtle)">
                            Set up your first budget in under a minute.
                        </p>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <img
                            src={MobileMockUp}
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
                                src={ReportsMockUp}
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

                <div className="mx-auto! max-w-6xl! overflow-hidden! rounded-[2rem]! bg-blue-500! px-6! py-20! text-center! sm:px-12! lg:py-24!">

                    <h2 className="mx-auto! max-w-2xl! text-4xl! font-semibold! leading-tight! tracking-[-0.035em]! text-white! sm:text-5xl!">
                        Ready to know where your money goes?
                    </h2>

                    <p className="mx-auto! mt-5! max-w-lg! text-base! leading-7! text-blue-100!">
                        Start tracking your spending and build a budget
                        that works for you.
                    </p>

                    <button
                        type="button"
                        className="mt-8! cursor-pointer rounded-full bg-white! px-6! py-3.5! text-sm! font-semibold! text-blue-500! transition hover:bg-blue-50!"
                        onClick={() => login()}
                    >
                        Start budgeting
                    </button>

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



            {/* <section
                id="features"
                className="border-y! bg-(--chakra-colors-bg-subtle)"
            >
                <div className="mx-auto! max-w-6xl! px-6! py-20! lg:py-24!">
                <div className="max-w-2xl!">
                    <p className="text-sm! font-semibold! text-blue-500">
                        Everything you actually need
                    </p>

                    <h2 className="mt-3! text-3xl! font-semibold! tracking-[-0.03em]! sm:text-4xl!">
                        Less spreadsheet. More clarity.
                    </h2>

                    <p className="mt-4! leading-7! text-(--chakra-colors-fg-muted)">
                        Budge It keeps the useful stuff close and leaves the financial
                        jargon behind.
                    </p>
                </div>

                <div className="mt-12! grid gap-4 md:grid-cols-3">
                    {[
                    {
                        number: "01",
                        title: "Set a budget",
                        description:
                        "Give every category a limit that makes sense for your month.",
                    },
                    {
                        number: "02",
                        title: "Track spending",
                        description:
                        "Add expenses in seconds and see exactly where your money is going.",
                    },
                    {
                        number: "03",
                        title: "Stay on course",
                        description:
                        "Simple progress views help you catch overspending before it piles up.",
                    },
                    ].map((feature) => (
                    <article
                        key={feature.number}
                        className="rounded-2xl border! p-7!"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-xs! font-semibold! text-blue-500">
                            {feature.number}
                        </span>

                        <h3 className="mt-6! text-lg! font-semibold!">
                            {feature.title}
                        </h3>

                        <p className="mt-2! text-sm! leading-6! text-(--chakra-colors-fg-muted)">
                            {feature.description}
                        </p>
                    </article>
                    ))}
                </div>
                </div>
            </section> */}

            {/* <section
                id="how-it-works"
                className="mx-auto! max-w-6xl! px-6! py-20! lg:py-28!"
            >
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                    <p className="text-sm! font-semibold! text-blue-500">
                        How it works
                    </p>

                    <h2 className="mt-3! text-3xl! font-semibold! tracking-[-0.03em]! sm:text-4xl!">
                        Start with what you have.
                    </h2>

                    <p className="mt-5! max-w-lg! leading-7! text-(--chakra-colors-fg-muted)">
                        You don't need a perfect financial plan. Add your income, pick a
                        few spending categories, and let Budge It make the picture easier
                        to understand.
                    </p>
                </div>

                <div className="space-y-3!">
                    {[
                    "Add your monthly income",
                    "Choose your spending limits",
                    "Log expenses as they happen",
                    "Check in whenever you want",
                    ].map((step, index) => (
                    <div
                        key={step}
                        className="flex items-center gap-4 rounded-2xl border! p-4!"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-sm! font-semibold! text-white">
                            {index + 1}
                        </span>

                        <span className="text-sm! font-medium! text-(--chakra-colors-fg-emphasized)">
                        {step}
                        </span>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            <section id="get-started" className="px-6! pb-20! lg:pb-28!">
                <div className="mx-auto! max-w-6xl! rounded-3xl bg-blue-500 px-7! py-12! text-center sm:px-12! sm:py-16!">
                <h2 className="text-3xl! font-semibold! tracking-[-0.03em] text-white sm:text-4xl!">
                    Your money. A little less messy.
                </h2>

                <p className="mx-auto! mt-4! max-w-xl! leading-7! text-blue-100">
                    Start with Budge It and make your next month easier to understand.
                </p>

                <button className="mt-8! rounded-full bg-white! px-6! py-3.5! text-sm! font-semibold! text-blue-500! transition">
                    Create your budget
                </button>
                </div>
            </section>

            <footer id="about" className="border-t! ">
                <div className="mx-auto! flex max-w-6xl! flex-col gap-4 px-6! py-8! text-sm! text-(--chakra-colors-fg-muted) sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold! text-(--chakra-colors-fg-subtle)">budge it.</span>
                <span>Simple tools for better money habits.</span>
                <span>© 2026 Budge It</span>
                </div>
            </footer> */}
        </main>
    );
};

export default Home;
