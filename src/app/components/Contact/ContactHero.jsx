export default function ContactHero() {
    return (
        <section className="relative bg-ebony pt-32 pb-20 px-4 overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full border border-maple/10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full border border-maple/10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full border border-brass/10 -translate-x-1/2 translate-y-1/2" />

            {/* Left vertical accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-maple/50 to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
                <p className="font-mono text-maple text-sm tracking-[0.25em] uppercase mb-4">
                    Get In Touch
                </p>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-parchment leading-tight mb-6 max-w-2xl">
                    We'd Love to{" "}
                    <span className="text-maple">Hear From You.</span>
                </h1>
                <p className="text-parchment/60 text-lg max-w-xl leading-relaxed">
                    Have a question about our courses, payment, or anything else?
                    Send us a message and we'll get back to you as soon as possible.
                </p>
            </div>

            {/* Bottom fretboard */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center">
                <div className="flex-1 h-px bg-brass/20" />
                {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-brass/40 mx-6" />
                ))}
                <div className="flex-1 h-px bg-brass/20" />
            </div>
        </section>
    );
}