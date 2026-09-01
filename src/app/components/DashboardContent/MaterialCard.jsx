"use client";
import { useState } from "react";
import { FaPlay, FaBookOpen, FaUserAlt } from "react-icons/fa";

function getYouTubeId(url) {
    if (!url) return "";
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
}

export default function MaterialCard({ material }) {
    const [playing, setPlaying] = useState(false);
    const [thumbError, setThumbError] = useState(false);

    if (material.type === "video") {

        // advanced one-on-one — no URL
        if (!material.url) {
            return (
                <div className="bg-white border border-brass/15 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    <div className="aspect-video bg-ebony flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <FaUserAlt className="text-maple text-5xl" />
                            <span className="font-mono text-parchment/40 text-xs tracking-widest uppercase">
                                Personal Session
                            </span>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-1 flex-1">
                        <span className="font-mono text-xs text-maple tracking-widest uppercase">
                            1-on-1 Class
                        </span>
                        <h3 className="font-display font-bold text-ebony text-base">
                            {material.title}
                        </h3>
                        {material.description && (
                            <p className="text-ebony/55 text-sm leading-relaxed">
                                {material.description}
                            </p>
                        )}
                        <div className="mt-3 bg-maple/10 border border-maple/30 rounded-lg px-4 py-3">
                            <p className="text-ebony/70 text-xs leading-relaxed">
                                📅 Barry will reach out to you directly to schedule your personal session. Check your registered email.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        const videoId = getYouTubeId(material.url);
        const thumbnail = thumbError
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        return (
            <div className="bg-white border border-brass/15 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                {playing ? (
                    <div className="aspect-video">
                        <iframe
                            src={`${material.url}?autoplay=1&rel=0&modestbranding=1`}
                            title={material.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <button
                        onClick={() => setPlaying(true)}
                        className="relative w-full aspect-video bg-ebony flex items-center justify-center group cursor-pointer overflow-hidden"
                    >
                        {/* YouTube thumbnail */}
                        <img
                            src={thumbnail}
                            alt={material.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={() => setThumbError(true)}
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-ebony/50 group-hover:bg-ebony/40 transition-colors duration-200" />

                        {/* Play button */}
                        <div className="w-14 h-14 rounded-full bg-maple flex items-center justify-center group-hover:scale-110 transition-transform duration-200 z-10 shadow-lg">
                            <FaPlay className="text-ebony text-lg ml-1" />
                        </div>

                        {/* Title overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-ebony/90 to-transparent z-10">
                            <p className="text-parchment text-sm font-medium leading-snug line-clamp-1">
                                {material.title}
                            </p>
                            <p className="text-parchment/50 text-xs font-mono mt-0.5">
                                Click to play
                            </p>
                        </div>
                    </button>
                )}

                <div className="p-4 flex flex-col gap-1 flex-1">
                    <span className="font-mono text-xs text-maple tracking-widest uppercase">
                        Video Lesson
                    </span>
                    <h3 className="font-display font-bold text-ebony text-base">
                        {material.title}
                    </h3>
                    {material.description && (
                        <p className="text-ebony/55 text-sm leading-relaxed">
                            {material.description}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    if (material.type === "ebook" || material.type === "document") {
        return (
            <div className="bg-white border border-brass/15 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <div className="aspect-video bg-ebony flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <FaBookOpen className="text-maple text-5xl" />
                        <span className="font-mono text-parchment/40 text-xs tracking-widest uppercase">
                            Digital Ebook
                        </span>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-1 flex-1">
                    <span className="font-mono text-xs text-brass tracking-widest uppercase">
                        Ebook
                    </span>
                    <h3 className="font-display font-bold text-ebony text-base">
                        {material.title}
                    </h3>
                    {material.description && (
                        <p className="text-ebony/55 text-sm leading-relaxed">
                            {material.description}
                        </p>
                    )}
                    {material.signedUrl ? (
                        <a
                            href={material.signedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 bg-ebony text-parchment text-sm px-4 py-2 rounded-lg hover:bg-rosewood transition w-fit"
                        >
                            <FaBookOpen className="text-xs" />
                            Download Ebook
                        </a>
                    ) : (
                        <div className="mt-3 flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-brass/30 border-t-brass rounded-full animate-spin" />
                            <p className="text-ebony/40 text-xs italic">
                                Generating download link...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}