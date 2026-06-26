"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    {
        question: "Do I need a bass guitar before enrolling?",
        answer: "Yes — you'll need a bass guitar to practice with. However, you can enroll and receive your ebook before getting your instrument, so you can study the theory while you source one.",
    },
    {
        question: "Which tier should I start with?",
        answer: "If you've never played bass before, start with Beginner. If you can already play basic scales and simple songs, Intermediate might suit you. If you're already gigging or recording, Advanced is for you. When in doubt, start at Beginner — the foundation is everything.",
    },
    {
        question: "How is the ebook delivered?",
        answer: "Your ebook is automatically sent to the email address you registered with, immediately after your Paystack payment is confirmed. Check your spam folder if you don't see it within a few minutes.",
    },
    {
        question: "Can I upgrade from one tier to another?",
        answer: "Yes. You can enroll in a higher tier at any time by making a new payment for that tier. Your dashboard will be updated to reflect your new access level.",
    },
    {
        question: "How long do I have access to the materials?",
        answer: "Lifetime. Once you enroll and pay, your dashboard access and ebook are yours forever. There are no recurring fees or subscriptions.",
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept all major debit/credit cards, bank transfers, and USSD codes via Paystack — Nigeria's most trusted payment gateway.",
    },
    {
        question: "Is there a refund policy?",
        answer: "Because our materials are delivered digitally and immediately, we do not offer refunds once an ebook has been sent and dashboard access has been granted. Please review the course contents carefully before purchasing.",
    },
    {
        question: "Can I watch the videos on my phone?",
        answer: "Yes. Your dashboard is fully mobile-responsive, so you can access your video lessons and course materials from any device — phone, tablet, or desktop.",
    },
];

export default function CoursesFAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="bg-ebony py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <p className="font-mono text-maple text-sm tracking-[0.2em] uppercase text-center mb-3">
                    Got Questions?
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment text-center mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-parchment/50 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                    Everything you need to know before enrolling.
                    Can't find your answer? Reach out via the contact page.
                </p>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                                openIndex === i
                                    ? "border-maple/50 bg-white/5"
                                    : "border-parchment/10 bg-white/3 hover:border-parchment/20"
                            }`}
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                            >
                                <span className={`font-medium text-sm leading-snug transition-colors ${
                                    openIndex === i ? "text-maple" : "text-parchment"
                                }`}>
                                    {faq.question}
                                </span>
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                                    openIndex === i
                                        ? "border-maple text-maple"
                                        : "border-parchment/30 text-parchment/30"
                                }`}>
                                    {openIndex === i
                                        ? <FaMinus className="text-xs" />
                                        : <FaPlus className="text-xs" />
                                    }
                                </div>
                            </button>

                            {openIndex === i && (
                                <div className="px-6 pb-5">
                                    <p className="text-parchment/60 text-sm leading-relaxed border-t border-parchment/10 pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}