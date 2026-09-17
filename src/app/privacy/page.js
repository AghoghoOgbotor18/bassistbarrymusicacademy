import PrivacyHeader from "../components/privacy/PrivacyHeader";
import PrivacyPolicyContent from "../components/privacy/PrivacyPolicyContent";
import PrivacyRights from "../components/privacy/PrivacyRights";
import PrivacyContact from "../components/privacy/PrivacyContact";


export const metadata = {
    title: "Privacy Policy | Bassist Barry Music Academy",
    description:
        "Privacy Policy for Bassist Barry Music Academy (BBMA).",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800">
            <PrivacyHeader />

            <section className="px-6 py-12">
                <div className="mx-auto max-w-4xl space-y-10">
                    <PrivacyPolicyContent />
                    <PrivacyContact />
                </div>
            </section>
        </main>
    );
}