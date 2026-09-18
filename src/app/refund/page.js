import RefundHeader from "../components/refund/RefundHeader";
import RefundPolicyContent from "../components/refund/RefundPolicyContent";
import RefundContact from "../components/refund/RefundContact";


export const metadata = {
    title: "Refund Policy | Bassist Barry Music Academy",
    description:
        "Refund Policy for Bassist Barry Music Academy (BBMA).",
};

export default function RefundPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800">
            <RefundHeader />

            <section className="px-6 py-12">
                <div className="mx-auto max-w-4xl space-y-10">
                    <RefundPolicyContent />
                    <RefundContact />
                </div>
            </section>
        </main>
    );
}