import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

export const metadata = {
    title: "Contact | Bassist Barry Music Academy",
    description: "Get in touch with Bassist Barry Music Academy. We're here to answer your questions.",
};

export default function ContactPage() {
    return (
        <>
            <ContactHero />
            <div className="bg-parchment py-20 px-4">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </div>
        </>
    );
}