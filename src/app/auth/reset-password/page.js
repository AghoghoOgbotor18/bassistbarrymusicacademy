"use client";
import { useState } from "react";
import { createClient } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;
    const isInvalid = !password || !confirmPassword || passwordsMismatch;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInvalid) return;

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-parchment">
            <div className="bg-white rounded-xl max-w-sm w-full p-6 border border-brass/20 shadow-sm">
                <h1 className="font-display text-xl font-bold text-ebony mb-1">
                    Set new password
                </h1>
                <p className="text-sm text-ebony/60 mb-6">
                    Choose a strong password for your account.
                </p>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {/* New password */}
                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-brass/30 rounded-lg px-3 py-2 pr-10 placeholder:text-black/30"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-ebony/40 hover:text-ebony transition"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                            </button>
                        </div>
                        {!password && (
                            <p className="text-red-600 text-xs mt-1">Password is required</p>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full border border-brass/30 rounded-lg px-3 py-2 pr-10 placeholder:text-black/30"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-ebony/40 hover:text-ebony transition"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                            </button>
                        </div>
                        {passwordsMismatch && (
                            <p className="text-red-600 text-xs mt-1">Passwords do not match</p>
                        )}
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isInvalid || loading}
                        className="bg-maple text-ebony font-medium py-2.5 rounded-lg hover:bg-maple/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? "Updating..." : "Update password"}
                    </button>
                </form>
            </div>
        </div>
    );
}