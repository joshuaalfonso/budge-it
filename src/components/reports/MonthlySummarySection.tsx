import type { MonthlySummary } from "@/types/analytics.types";
import { MonthlySummaryChart } from "./MonthlySummaryChart";




export const MonthlySummarySection = ({ monthlySummary }: { monthlySummary: MonthlySummary[] }) => {
    return (
    <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">    
        <div className="mb-8!">
            <h2 className="text-base! font-semibold!">
                Monthly Summary
            </h2>   
             <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                A summary of your monthly income and expenses for the year
            </p>
        </div>

        <div className="mt-8! flex min-h-64 items-center justify-center rounded-md bg-(--chakra-colors-bg-subtle)">
            <MonthlySummaryChart monthlySummary={monthlySummary} />
        </div> 
    </section>
);
}