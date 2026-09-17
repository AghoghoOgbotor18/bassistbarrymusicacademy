export default function PrivacyHeader() {
    return (
        <section className="relative bg-ebony pt-32 pb-20 px-4 overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full border border-maple/10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full border border-maple/10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full border border-brass/10 -translate-x-1/2 translate-y-1/2" />
            <div className="mx-auto max-w-4xl">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-parchment">
                    Legal
                </p>

                <h1 className="text-4xl font-bold md:text-5xl text-maple">
                    Privacy Policy
                </h1>

                <p className="mt-4 text-sm text-parchment/70">
                    Effective Date: September 17, 2026
                </p>
            </div>
        </section>
    );
}