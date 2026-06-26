const steps = [
    {
        step: "01",
        title: "Create Your Account",
        description: "Sign up for free in seconds. No credit card required to register — just your name and email.",
    },
    {
        step: "02",
        title: "Choose Your Tier",
        description: "Pick the course level that matches where you are right now — Beginner, Intermediate, or Advanced.",
    },
    {
        step: "03",
        title: "Make Payment",
        description: "Pay securely via Paystack using your card, bank transfer, or USSD. Fast, safe, and Nigerian-friendly.",
    },
    {
        step: "04",
        title: "Get Your Ebook",
        description: "Your exclusive ebook is delivered instantly to your email the moment your payment is confirmed.",
    },
    {
        step: "05",
        title: "Access Your Dashboard",
        description: "Log in to your personal dashboard to access your tier's video lessons and track your progress.",
    },
    {
        step: "06",
        title: "Start Playing",
        description: "Follow the structured curriculum, practice consistently, and watch yourself grow into a real bassist.",
    },
];

export default function CoursesProcess() {
    return (
        <section className="bg-parchment py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase text-center mb-3">
                    How It Works
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-ebony text-center mb-4">
                    From Sign Up to Playing
                </h2>
                <p className="text-ebony/55 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                    Getting started at BBMA takes less than five minutes.
                    Here's exactly what the process looks like.
                </p>

                <div className="relative">
                    {/* Connecting line — desktop only */}
                    <div className="hidden lg:block absolute top-8 left-[calc(8.33%-1px)] right-[calc(8.33%-1px)] h-px bg-brass/25 z-0" />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <div key={i} className="flex flex-col gap-4 group">
                                {/* Number circle */}
                                <div className="w-16 h-16 rounded-full bg-ebony border-2 border-brass/30 flex items-center justify-center group-hover:border-maple transition-colors duration-300">
                                    <span className="font-mono text-maple font-bold text-sm">
                                        {step.step}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-display text-lg font-bold text-ebony mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-ebony/55 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Paystack note */}
                <div className="mt-16 bg-white border border-brass/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto text-center sm:text-left">
                    <div className="w-12 h-12 rounded-xl bg-ebony flex items-center justify-center flex-shrink-0">
                        <span className="text-maple font-bold text-xs font-mono">PAY</span>
                    </div>
                    <div>
                        <p className="font-bold text-ebony text-sm mb-1">
                            Secure payment powered by Paystack
                        </p>
                        <p className="text-ebony/50 text-xs leading-relaxed">
                            All payments are processed securely via Paystack — Nigeria's leading
                            payment gateway. We accept cards, bank transfers, and USSD.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}