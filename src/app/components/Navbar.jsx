"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useAuthModal } from "../context/AuthModalContext";
import { createClient } from "../lib/supabase";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
];

function Avatar({ name, onClick }) {
    const initials = name
        ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "U";

    return (
        <button
            onClick={onClick}
            className="w-9 h-9 rounded-full bg-maple flex items-center justify-center text-ebony text-sm font-bold flex-shrink-0 hover:opacity-90 transition"
        >
            {initials}
        </button>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    const dropdownRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();
    const { openModal } = useAuthModal();
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            setAuthReady(true);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setAuthReady(true);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setDropdownOpen(false);
        setIsOpen(false);
        router.push("/");
        router.refresh();
    };

    const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "User";
    const fullName = user?.user_metadata?.full_name || "User";
    const alwaysSolid = pathname.startsWith("/dashboard");

    return (
        <>
            <nav className={`border-b border-brass/20 w-full fixed left-0 top-0 z-50 transition-colors duration-300 ${
                alwaysSolid || scroll || isOpen ? "bg-ebony shadow-2xl" : "bg-transparent"
            }`}>
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
                    <Link href="/" className="font-display text-xl font-bold text-parchment">
                        BBMA
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex justify-center items-center gap-8">
                        {navLinks.map((navlink, index) => (
                            <Link
                                key={index}
                                href={navlink.href}
                                className={`hover:text-maple transition ${
                                    pathname === navlink.href ? "text-maple" : "text-parchment/90"
                                }`}
                            >
                                {navlink.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop auth section */}
                    <div className="hidden md:flex items-center gap-3">
                        {!authReady ? (
                            <div className="w-24 h-9 rounded-lg bg-parchment/10 animate-pulse" />
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-parchment/70 text-sm">
                                    Hi, {firstName}
                                </span>
                                <div className="relative" ref={dropdownRef}>
                                    <Avatar
                                        name={fullName}
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                    />
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-parchment rounded-xl shadow-lg border border-brass/20 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-brass/20">
                                                <p className="text-ebony font-medium text-sm">{fullName}</p>
                                                <p className="text-ebony/50 text-xs truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setDropdownOpen(false)}
                                                className="block px-4 py-2 text-sm text-ebony hover:bg-brass/10 transition"
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button
                                className="bg-maple text-ebony font-medium px-4 py-2 rounded-lg hover:bg-maple/90 transition"
                                onClick={() => openModal("login")}
                            >
                                Get Started
                            </button>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-2xl text-parchment z-[60] relative"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 flex flex-col">
                    <div
                        className="absolute inset-0 bg-ebony/85 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu content */}
                    <div className="relative z-50 mt-16 px-6 py-10 flex flex-col gap-6">
                        {navLinks.map((navlink, id) => (
                            <Link
                                key={id}
                                href={navlink.href}
                                onClick={() => setIsOpen(false)}
                                className={`font-display text-xl font-bold transition ${
                                    pathname === navlink.href
                                        ? "text-maple"
                                        : "text-parchment hover:text-maple"
                                }`}
                            >
                                {navlink.label}
                            </Link>
                        ))}

                        <div className="h-px bg-brass/20 my-2" />

                        {!authReady ? null : user ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <Avatar name={fullName} onClick={() => {}} />
                                    <div>
                                        <p className="text-parchment text-sm font-medium">{fullName}</p>
                                        <p className="text-parchment/50 text-xs">{user.email}</p>
                                    </div>
                                </div>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="text-parchment/80 hover:text-maple text-sm w-fit flex items-center gap-1.5"
                                >
                                    Dashboard <FaArrowRight />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-left text-red-400 hover:text-red-300 text-sm w-fit"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                className="bg-maple text-ebony font-medium px-6 py-3 rounded-lg text-center w-full text-lg"
                                onClick={() => {
                                    setIsOpen(false);
                                    openModal("login");
                                }}
                            >
                                Get Started
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}