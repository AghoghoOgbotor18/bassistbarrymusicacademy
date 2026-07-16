"use client";
import { useState } from "react";
import { FaPlay, FaBookOpen } from "react-icons/fa";

export default function MaterialCard({ material }) {
    const [playing, setPlaying] = useState(false);

    if (material.type === "video") {
        return (
            <div className="bg-white border border-brass/15 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                {playing ? (
                    <div className="aspect-video">
                        <iframe
                            src={`${material.url}?autoplay=1&rel=0`}
                            title={material.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <button
                        onClick={() => setPlaying(true)}
                        className="relative w-full aspect-video bg-ebony flex items-center justify-center group cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-full bg-maple flex items-center justify-center group-hover:scale-110 transition-transform duration-200 z-10">
                            <FaPlay className="text-ebony text-lg ml-1" />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-t from-ebony/60 to-transparent" />
                        <p className="absolute bottom-3 left-4 text-parchment/60 text-xs font-mono">
                            Click to play
                        </p>
                    </button>
                )}
                <div className="p-4 flex flex-col gap-1 flex-1">
                    <span className="font-mono text-xs text-maple tracking-widest uppercase">
                        Video
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
                    {/* uses signedUrl generated in dashboard/page.js */}
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
                        <p className="text-ebony/30 text-xs mt-3 italic">
                            Generating download link...
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return null;
}