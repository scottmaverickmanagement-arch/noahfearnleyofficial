import ScrollReveal from "@/components/ScrollReveal";

const Charity = () => {
    return (
        <>
            {/* Hero */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <ScrollReveal>
                        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Charity</p>
                        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Giving Back</h1>
                        <p className="text-muted-foreground text-lg">
                            Noah Fearnley is committed to using his platform to support causes close to his heart.
                            Through partnerships with various charities, he aims to make a positive impact in the community.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Causes */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <ScrollReveal>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Supported Causes</h2>
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="p-6 bg-card/50 rounded-lg">
                                <h3 className="font-serif text-xl font-semibold mb-4">Children's Hospitals</h3>
                                <p className="text-muted-foreground">
                                    Supporting children's hospitals to provide care and comfort to young patients and their families.
                                </p>
                            </div>
                            <div className="p-6 bg-card/50 rounded-lg">
                                <h3 className="font-serif text-xl font-semibold mb-4">Animal Welfare</h3>
                                <p className="text-muted-foreground">
                                    Advocating for the protection and well-being of animals through rescue and shelter support.
                                </p>
                            </div>
                            <div className="p-6 bg-card/50 rounded-lg">
                                <h3 className="font-serif text-xl font-semibold mb-4">Environmental Conservation</h3>
                                <p className="text-muted-foreground">
                                    Promoting sustainability and conservation efforts to protect our planet for future generations.
                                </p>
                            </div>
                            <div className="p-6 bg-card/50 rounded-lg">
                                <h3 className="font-serif text-xl font-semibold mb-4">Arts Education</h3>
                                <p className="text-muted-foreground">
                                    Supporting arts education programs to inspire creativity and provide opportunities for youth.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Get Involved */}
            <section className="py-24 bg-card/50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <ScrollReveal>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Get Involved</h2>
                        <p className="text-muted-foreground text-lg text-center mb-8">
                            Join Noah in making a difference. Whether through donations, volunteering, or spreading awareness,
                            every contribution helps create positive change.
                        </p>
                        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
                            <a href="#" className="btn btn-primary px-8 py-3">Donate Now</a>
                            <a href="#" className="btn btn-outline px-8 py-3">Volunteer</a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Quote */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <ScrollReveal>
                        <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed">
                            "We rise by lifting others."
                        </blockquote>
                        <p className="text-primary mt-6 uppercase tracking-[0.2em] text-sm">— Noah Fearnley</p>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
};

export default Charity;