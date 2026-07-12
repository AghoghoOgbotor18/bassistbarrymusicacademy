import React from "react";
import { FaTimes } from "react-icons/fa";

function ErrorModal({ message, onClose }) {
    if (!message) return null;
    return (
        <div
            className="fixed inset-0 bg-ebony/70 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
            onClick={onClose}
        >
            <div
                className="bg-parchment rounded-2xl max-w-sm w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-ebony/40 hover:text-ebony transition"
                >
                    <FaTimes />
                </button>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <FaTimes className="text-red-500 text-lg" />
                </div>

                <h3 className="font-display text-lg font-bold text-ebony text-center mb-2">
                    Payment Error
                </h3>
                <p className="text-ebony/65 text-sm text-center leading-relaxed mb-6">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className="w-full bg-ebony text-parchment font-medium py-3 rounded-lg hover:bg-rosewood transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
}