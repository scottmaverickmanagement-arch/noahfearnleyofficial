import CharityScrollSequence from "@/components/CharityScrollSequence";
import { useSEO } from "@/hooks/useSEO";

const Charity = () => {
    useSEO({
        title: "Noah Fearnley Charity – Giving Back & Philanthropic Initiatives",
        description: "Explore Noah Fearnley's commitment to giving back through youth sports programs and charitable organizations."
    });

    return (
        <main className="w-full bg-black min-h-screen">
            <CharityScrollSequence />
        </main>
    );
};

export default Charity;