"use client";
import { useEffect, useState } from "react";

export default function SplashScreen() {
    const [visible, setVisible] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // only show once per browser session
        const seen = sessionStorage.getItem("bbma_splash_seen");
        if (seen) return;

        setVisible(true);

        // start fade out after 2.8s
        const fadeTimer = setTimeout(() => setFadeOut(true), 3000);

        // fully remove after fade completes
        const removeTimer = setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("bbma_splash_seen", "true");
        }, 4000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[999] bg-ebony flex flex-col items-center justify-center gap-8 transition-opacity duration-600 ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
            {/* Animated bass guitar SVG */}
            <div className="w-40 h-auto">
                <svg
                    viewBox="0 0 200 420"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    {/* Body outline */}
                    <path
                        d="M100 420
                           C60 420 20 390 15 350
                           C10 310 30 285 35 265
                           C40 245 38 230 35 215
                           C28 190 20 170 25 145
                           C30 118 55 105 70 100
                           L75 60
                           C76 45 85 35 100 35
                           C115 35 124 45 125 60
                           L130 100
                           C145 105 170 118 175 145
                           C180 170 172 190 165 215
                           C162 230 160 245 165 265
                           C170 285 190 310 185 350
                           C180 390 140 420 100 420Z"
                        stroke="#D9A246"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        style={{
                            strokeDasharray: 1200,
                            strokeDashoffset: 1200,
                            animation: "drawGuitar 1.8s ease forwards 0.2s",
                        }}
                    />

                    {/* Body inner curve left */}
                    <path
                        d="M45 280 C30 300 28 325 40 345"
                        stroke="#8C6A3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        style={{
                            strokeDasharray: 100,
                            strokeDashoffset: 100,
                            animation: "drawGuitar 0.6s ease forwards 1.4s",
                        }}
                    />

                    {/* Body inner curve right */}
                    <path
                        d="M155 280 C170 300 172 325 160 345"
                        stroke="#8C6A3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        style={{
                            strokeDasharray: 100,
                            strokeDashoffset: 100,
                            animation: "drawGuitar 0.6s ease forwards 1.4s",
                        }}
                    />

                    {/* Neck */}
                    <path
                        d="M82 100 L82 35 M118 100 L118 35"
                        stroke="#D9A246"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                        style={{
                            strokeDasharray: 200,
                            strokeDashoffset: 200,
                            animation: "drawGuitar 0.8s ease forwards 0.8s",
                        }}
                    />

                    {/* Headstock */}
                    <path
                        d="M82 35 C82 15 88 8 100 8 C112 8 118 15 118 35"
                        stroke="#D9A246"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                        style={{
                            strokeDasharray: 120,
                            strokeDashoffset: 120,
                            animation: "drawGuitar 0.5s ease forwards 1.0s",
                        }}
                    />

                    {/* Frets */}
                    {[55, 68, 80].map((y, i) => (
                        <line
                            key={i}
                            x1="83" y1={y} x2="117" y2={y}
                            stroke="#8C6A3F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            style={{
                                strokeDasharray: 40,
                                strokeDashoffset: 40,
                                animation: `drawGuitar 0.3s ease forwards ${1.2 + i * 0.1}s`,
                            }}
                        />
                    ))}

                    {/* Strings */}
                    {[89, 95, 105, 111].map((x, i) => (
                        <line
                            key={i}
                            x1={x} y1="12" x2={x} y2="340"
                            stroke="#EDE0CC"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            opacity="0.4"
                            style={{
                                strokeDasharray: 400,
                                strokeDashoffset: 400,
                                animation: `drawGuitar 1s ease forwards ${1.5 + i * 0.08}s`,
                            }}
                        />
                    ))}

                    {/* Sound hole */}
                    <circle
                        cx="100"
                        cy="270"
                        r="30"
                        stroke="#8C6A3F"
                        strokeWidth="2"
                        fill="none"
                        style={{
                            strokeDasharray: 190,
                            strokeDashoffset: 190,
                            animation: "drawGuitar 0.8s ease forwards 1.6s",
                        }}
                    />

                    {/* Tuning pegs left */}
                    {[14, 22, 30].map((y, i) => (
                        <circle
                            key={i}
                            cx="78"
                            cy={y}
                            r="4"
                            stroke="#8C6A3F"
                            strokeWidth="1.5"
                            fill="none"
                            style={{
                                strokeDasharray: 30,
                                strokeDashoffset: 30,
                                animation: `drawGuitar 0.3s ease forwards ${1.1 + i * 0.08}s`,
                            }}
                        />
                    ))}

                    {/* Tuning pegs right */}
                    {[14, 22, 30].map((y, i) => (
                        <circle
                            key={i}
                            cx="122"
                            cy={y}
                            r="4"
                            stroke="#8C6A3F"
                            strokeWidth="1.5"
                            fill="none"
                            style={{
                                strokeDasharray: 30,
                                strokeDashoffset: 30,
                                animation: `drawGuitar 0.3s ease forwards ${1.1 + i * 0.08}s`,
                            }}
                        />
                    ))}

                    {/* Bridge */}
                    <rect
                        x="85"
                        y="335"
                        width="30"
                        height="8"
                        rx="2"
                        stroke="#8C6A3F"
                        strokeWidth="1.5"
                        fill="none"
                        style={{
                            strokeDasharray: 80,
                            strokeDashoffset: 80,
                            animation: "drawGuitar 0.4s ease forwards 1.9s",
                        }}
                    />

                    <style>{`
                        @keyframes drawGuitar {
                            to {
                                stroke-dashoffset: 0;
                            }
                        }
                    `}</style>
                </svg>
            </div>

            {/* Brand text */}
            <div
                className="flex flex-col items-center gap-2"
                style={{
                    opacity: 0,
                    animation: "fadeInText 0.6s ease forwards 1.8s",
                }}
            >
                <p className="font-display text-3xl font-bold text-parchment tracking-wide">
                    BBMA
                </p>
                <p className="font-mono text-maple text-xs tracking-[0.3em] uppercase">
                    Bassist Barry Music Academy
                </p>
            </div>

            {/* Loading dots */}
            <div
                className="flex items-center gap-2"
                style={{
                    opacity: 0,
                    animation: "fadeInText 0.4s ease forwards 2.2s",
                }}
            >
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-maple"
                        style={{
                            animation: `bounce 0.8s ease-in-out infinite ${i * 0.15}s`,
                        }}
                    />
                ))}
            </div>

            <style jsx global>{`
                @keyframes fadeInText {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); opacity: 0.4; }
                    50% { transform: translateY(-6px); opacity: 1; }
                }
            `}</style>
        </div>
    );
}