"use client";
import { useEffect, useRef, useState } from "react";

const CLOUDINARY_VIDEO_URL = "https://res.cloudinary.com/dysyzuviq/video/upload/IMG_0947_jwjigt.mp4";

export default function IntroVideo() {
    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasPlayed) {
                        // auto play when section comes into view
                        if (videoRef.current) {
                            videoRef.current.play();
                            setIsPlaying(true);
                            setHasPlayed(true);
                        }
                    } else if (!entry.isIntersecting) {
                        // pause when scrolled away
                        if (videoRef.current && !videoRef.current.paused) {
                            videoRef.current.pause();
                            setIsPlaying(false);
                        }
                    }
                });
            },
            { threshold: 0.4 } // play when 40% of section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasPlayed]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <section ref={sectionRef} className="bg-parchment py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left — text */}
                    <div>
                        <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase mb-3">
                            See It For Yourself
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-ebony mb-6 leading-tight">
                            What Is Bassist Barry
                            <span className="text-rosewood"> Music Academy?</span>
                        </h2>
                        <p className="text-ebony/65 leading-relaxed mb-6">
                            In under a minute, Barry breaks down exactly what BBMA is,
                            who it's for, and what you'll walk away with — whether
                            you've never touched a bass or you've been playing for years.
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                "Structured learning at every level",
                                "Gospel-rooted techniques from a professional",
                                "Exclusive ebooks and video lessons",
                                "Learn at your own pace, from anywhere in the world",
                            ].map((point, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-maple flex-shrink-0" />
                                    <p className="text-ebony/70 text-sm">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — video */}
                    <div className="relative">
                        {/* Decorative offset border */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brass/25 rounded-2xl -z-10" />

                        <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl bg-ebony group">
                            <video
                                ref={videoRef}
                                src={CLOUDINARY_VIDEO_URL}
                                className="w-full h-full object-contain"
                                muted
                                playsInline
                                preload="metadata"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />

                            {/* Custom controls overlay */}
                            <div className="absolute inset-0 flex items-end justify-between p-4 bg-linear-to-t from-ebony/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Play/pause button */}
                                <button
                                    onClick={togglePlay}
                                    className="w-10 h-10 rounded-full bg-maple flex items-center justify-center hover:bg-maple/90 transition"
                                >
                                    {isPlaying ? (
                                        // pause icon
                                        <svg className="w-4 h-4 text-ebony fill-current" viewBox="0 0 24 24">
                                            <rect x="6" y="4" width="4" height="16" />
                                            <rect x="14" y="4" width="4" height="16" />
                                        </svg>
                                    ) : (
                                        // play icon
                                        <svg className="w-4 h-4 text-ebony fill-current ml-0.5" viewBox="0 0 24 24">
                                            <polygon points="5,3 19,12 5,21" />
                                        </svg>
                                    )}
                                </button>

                                {/* Mute/unmute button */}
                                <button
                                    onClick={toggleMute}
                                    className="flex items-center gap-2 bg-ebony/60 text-parchment text-xs px-3 py-1.5 rounded-full hover:bg-ebony/80 transition"
                                >
                                    {isMuted ? (
                                        <>
                                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                                <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                            </svg>
                                            Tap for sound
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                                            </svg>
                                            Sound on
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Initial play hint — shows before video plays */}
                            {!hasPlayed && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-maple/90 flex items-center justify-center animate-pulse">
                                        <svg className="w-6 h-6 text-ebony fill-current ml-1" viewBox="0 0 24 24">
                                            <polygon points="5,3 19,12 5,21" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Muted indicator below video */}
                        {isMuted && isPlaying && (
                            <p className="text-center text-ebony/40 text-xs font-mono mt-3 animate-pulse">
                                Video is muted - hover and tap "Tap for sound" to hear Barry
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}