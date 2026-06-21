"use client"
import Link from "next/link"
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"
import { usePathname } from "next/navigation";
import { useAuthModal } from "../context/AuthModalContext";

export default function Navbar(){

    const navlinks = [
        {href: "/", label: "Home"},
        {href: "/about", label: "About"},
        {href: "/courses", label: "Courses"},
        {href: "/contact", label: "Contact"}
    ];

    const [isOpen, setIsopen] = useState(false);
    const pathname = usePathname();

    const {openModal} = useAuthModal();
    
    return(
        <nav className="bg-ebony border-b border-brass/20 w-full fixed left-0 top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
                <Link href="/" className="font-display text-xl font-bold text-parchment">
                    BBMA
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex justify-center items-center gap-8">
                    {
                        navlinks.map((navlink, index) => (
                            <Link key={index} 
                            href={navlink.href}
                            className={`hover:text-maple transition ${pathname === navlink.href ? "text-maple" : "text-parchment/90"}`}>
                                {navlink.label}
                            </Link>
                        ))
                    }
                </div>
                <div className="hidden md:block">
                    <button 
                    className="bg-maple text-ebony font-medium px-4 py-2 rounded-lg hover:bg-maple/90 transition"
                    onClick={() => {
                        setIsopen(false);
                        openModal("login");
                    }}
                    >
                        Get Started
                    </button>
                </div>
                
                {/* mobile Links */}
                <button 
                className="md:hidden text-2xl text-parchment"
                onClick={() => setIsopen(isOpen => !isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars /> }
                </button>
            </div>

            {/* mobile menu */}
            {
                isOpen && (
                    <div className="md:hidden px-4 pb-4 flex flex-col gap-5 border-t border-brass/20 pt-3">
                        {
                            navlinks.map((navlink, id) => (
                                <Link key={id} 
                                href={navlink.href}
                                onClick={() => setIsopen(false)}
                                className="text-parchment/80 hover:text-maple w-fit"
                                >
                                    {navlink.label}
                                </Link>
                            ))
                        }
                        <button 
                        className="bg-maple text-ebony font-medium px-4 py-2 rounded-lg text-center"
                        onClick={ () => {
                            setIsopen(false);
                            openModal("login")
                        }}
                        >
                            Get Started
                        </button>
                    </div>
                )
            }
        </nav>
    )
}