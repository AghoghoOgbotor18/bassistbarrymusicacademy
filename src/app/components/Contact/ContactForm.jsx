"use client";
import { useState, useReducer } from "react";
import { FaPaperPlane } from "react-icons/fa";

const initialState = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

function formReducer(state, action) {
    switch (action.type) {
        case "update_field":
            return { ...state, [action.field]: action.value };
        case "reset":
            return initialState;
        default:
            return state;
    }
}

const subjects = [
    "Question about a course",
    "Payment issue",
    "Technical support",
    "Partnership enquiry",
    "Other",
];

export default function ContactForm() {
    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        dispatch({ type: "update_field", field: e.target.name, value: e.target.value });
        if (error) setError(null);
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    };

    const isFieldEmpty = (field) => touched[field] && formData[field].trim() === "";

    const isFormInvalid =
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.subject ||
        !formData.message.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, subject: true, message: true });
        if (isFormInvalid) return;

        setLoading(true);
        setError(null);

        try {
            // Resend email integration will go here later
            // For now we simulate a successful send
            await new Promise((res) => setTimeout(res, 1500));
            setSuccess(true);
            dispatch({ type: "reset" });
            setTouched({});
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                <div className="w-16 h-16 rounded-full bg-ebony flex items-center justify-center">
                    <FaPaperPlane className="text-maple text-2xl" />
                </div>
                <div>
                    <h3 className="font-display text-2xl font-bold text-ebony mb-2">
                        Message Sent!
                    </h3>
                    <p className="text-ebony/60 leading-relaxed max-w-sm">
                        Thanks for reaching out. Barry will get back to you
                        within 24-48 hours.
                    </p>
                </div>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-maple text-sm hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div>
            <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase mb-3">
                Send a Message
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ebony mb-8">
                Fill in the Form
            </h2>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Name */}
                <div>
                    <label className="text-ebony/70 text-sm font-medium mb-1.5 block">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your full name"
                        className={`w-full border rounded-xl px-4 py-3 text-ebony placeholder:text-ebony/30 outline-none transition focus:border-maple ${
                            isFieldEmpty("name")
                                ? "border-red-400 bg-red-50"
                                : "border-brass/30 bg-white focus:bg-white"
                        }`}
                    />
                    {isFieldEmpty("name") && (
                        <p className="text-red-500 text-xs mt-1">Name is required</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="text-ebony/70 text-sm font-medium mb-1.5 block">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="your@email.com"
                        className={`w-full border rounded-xl px-4 py-3 text-ebony placeholder:text-ebony/30 outline-none transition focus:border-maple ${
                            isFieldEmpty("email")
                                ? "border-red-400 bg-red-50"
                                : "border-brass/30 bg-white focus:bg-white"
                        }`}
                    />
                    {isFieldEmpty("email") && (
                        <p className="text-red-500 text-xs mt-1">Email is required</p>
                    )}
                </div>

                {/* Subject */}
                <div>
                    <label className="text-ebony/70 text-sm font-medium mb-1.5 block">
                        Subject
                    </label>
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-xl px-4 py-3 text-ebony outline-none transition focus:border-maple appearance-none bg-white ${
                            isFieldEmpty("subject")
                                ? "border-red-400 bg-red-50"
                                : "border-brass/30"
                        } ${!formData.subject ? "text-ebony/30" : "text-ebony"}`}
                    >
                        <option value="" disabled>Select a subject</option>
                        {subjects.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                        ))}
                    </select>
                    {isFieldEmpty("subject") && (
                        <p className="text-red-500 text-xs mt-1">Please select a subject</p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label className="text-ebony/70 text-sm font-medium mb-1.5 block">
                        Message
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Write your message here..."
                        rows={5}
                        className={`w-full border rounded-xl px-4 py-3 text-ebony placeholder:text-ebony/30 outline-none transition focus:border-maple resize-none ${
                            isFieldEmpty("message")
                                ? "border-red-400 bg-red-50"
                                : "border-brass/30 bg-white focus:bg-white"
                        }`}
                    />
                    <div className="flex items-center justify-between mt-1">
                        {isFieldEmpty("message") ? (
                            <p className="text-red-500 text-xs">Message is required</p>
                        ) : (
                            <span />
                        )}
                        <p className="text-ebony/30 text-xs">
                            {formData.message.length} characters
                        </p>
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isFormInvalid || loading}
                    className="flex items-center justify-center gap-2 bg-ebony text-parchment font-medium py-3.5 rounded-xl hover:bg-rosewood transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-parchment/30 border-t-parchment rounded-full animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <FaPaperPlane className="text-sm" />
                            Send Message
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}