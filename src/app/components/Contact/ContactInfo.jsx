import { FaEnvelope, FaWhatsapp, FaInstagram, FaYoutube, FaClock, FaMapMarkerAlt, FaFacebook } from "react-icons/fa";

const contactDetails = [
    {
        icon: <FaEnvelope className="text-maple text-lg" />,
        label: "Email Us",
        value: "hello@bassistbarry.com",
        sub: "We'll reply within 24–48 hours",
        href: "mailto:hello@bassistbarry.com",
    },
    {
        icon: <FaWhatsapp className="text-maple text-lg" />,
        label: "WhatsApp",
        value: "+234 907 726 8160",
        sub: "Chat with us directly",
        href: "https://wa.me/2349077268160",
    },
    {
        icon: <FaMapMarkerAlt className="text-maple text-lg" />,
        label: "Location",
        value: "Nigeria",
        sub: "Online academy — nationwide access",
        href: null,
    },
    {
        icon: <FaClock className="text-maple text-lg" />,
        label: "Response Time",
        value: "24 – 48 Hours",
        sub: "Monday to Saturday",
        href: null,
    },
];

const socials = [
    {
        icon: <FaInstagram className="text-lg" />,
        label: "Instagram",
        handle: "@bassistbarry",
        href: "#",
        color: "hover:text-pink-500",
    },
    {
        icon: <FaFacebook className="text-lg" />,
        label: "Facebook",
        handle: "Bassist Barry",
        href: "#",
        color: "hover:text-blue-500",
    },
    {
        icon: <FaWhatsapp className="text-lg" />,
        label: "WhatsApp",
        handle: "+234 907 726 8160",
        href: "https://wa.me/2349077268160",
        color: "hover:text-green-500",
    },
];

export default function ContactInfo() {
    return (
        <div className="flex flex-col gap-10">
            <div>
                <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase mb-3">
                    Contact Details
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ebony mb-8">
                    Other Ways to Reach Us
                </h2>

                <div className="flex flex-col gap-4">
                    {contactDetails.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 bg-white border border-brass/15 rounded-2xl p-5 hover:border-maple/40 hover:shadow-md transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-ebony flex items-center justify-center flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <p className="font-mono text-xs text-brass/80 tracking-widest uppercase mb-0.5">
                                    {item.label}
                                </p>
                                {item.href ? (
                                    
                                    <a href={item.href}
                                        className="font-medium text-ebony hover:text-maple transition text-sm"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="font-medium text-ebony text-sm">{item.value}</p>
                                )}
                                <p className="text-ebony/45 text-xs mt-0.5">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social links */}
            <div>
                <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase mb-5">
                    Follow Barry
                </p>
                <div className="flex flex-col gap-3">
                    {socials.map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-4 text-ebony/60 transition ${social.color} group`}
                        >
                            <div className="w-10 h-10 rounded-xl border border-brass/60 flex items-center justify-center group-hover:border-current transition">
                                {social.icon}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-ebony group-hover:text-current transition w-fit">
                                    {social.label}
                                </p>
                                <p className="text-xs text-ebony/40">{social.handle}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Note card */}
            <div className="relative bg-ebony rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-maple/60 to-transparent" />
                <p className="font-mono text-maple text-xs tracking-widest uppercase mb-3">
                    A Note From Barry
                </p>
                <p className="text-parchment/70 text-sm leading-relaxed">
                    "I personally read every message that comes through. Whether you have
                    a question about which course is right for you, or you're experiencing
                    a technical issue — I'm here and I'll get back to you as soon as I can."
                </p>
                <p className="text-brass text-xs font-mono mt-4">— Barry, Founder of BBMA</p>
            </div>
        </div>
    );
}