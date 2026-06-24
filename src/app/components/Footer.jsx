import Link from "next/link";
import { FaInstagram, FaYoutube, FaFacebook, FaWhatsapp } from "react-icons/fa";

const footerLinks = [
    {
        heading: "Navigate",
        links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Courses", href: "/courses" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        heading: "Courses",
        links: [
            { label: "Beginner", href: "/courses#beginner" },
            { label: "Intermediate", href: "/courses#intermediate" },
            { label: "Advanced", href: "/courses#advanced" },
            { label: "Dashboard", href: "/dashboard" },
        ],
    },
    {
        heading: "Legal",
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Refund Policy", href: "/refund" },
        ],
    },
];

const socials = [
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaWhatsapp />, href: "#", label: "WhatsApp" },
];

export default function Footer() {
    return (
        <footer className="bg-ebony border-t border-brass/20">
            {/* Main footer */}
            <div className="max-w-6xl mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand column */}
                <div className="flex flex-col gap-4">
                    <Link href="/" className="font-display text-2xl font-bold text-parchment">
                        BBMA
                    </Link>
                    <p className="text-parchment/50 text-sm leading-relaxed">
                        Bassist Barry Music Academy — structured bass guitar training
                        for beginners to professionals across Nigeria.
                    </p>
                    {/* Socials */}
                    <div className="flex items-center gap-3 mt-2">
                        {socials.map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                aria-label={social.label}
                                className="w-8 h-8 rounded-full border border-parchment/20 flex items-center justify-center text-parchment/50 hover:border-maple hover:text-maple transition"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Link columns */}
                {footerLinks.map((col, i) => (
                    <div key={i} className="flex flex-col gap-4">
                        <p className="font-mono text-xs text-brass tracking-[0.15em] uppercase">
                            {col.heading}
                        </p>
                        <ul className="flex flex-col gap-2">
                            {col.links.map((link, j) => (
                                <li key={j}>
                                    <Link
                                        href={link.href}
                                        className="text-parchment/50 text-sm hover:text-maple transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-brass/10">
                <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-parchment/30 text-xs">
                        © {new Date().getFullYear()} Bassist Barry Music Academy. All rights reserved.
                    </p>
                    <p className="text-parchment/20 text-xs">
                        Built with ♪ in Nigeria
                    </p>
                </div>
            </div>
        </footer>
    );
}