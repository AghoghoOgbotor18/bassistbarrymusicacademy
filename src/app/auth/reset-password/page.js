"use client";
import { useState } from "react";
import { createClient } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-6 border border-brass/20">
                <h1 className="font-display text-xl font-bold text-ebony mb-1">
                    Set new password
                </h1>
                <p className="text-sm text-ebony/60 mb-6">
                    Choose a strong password for your account.
                </p>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                    <div>
                        <input
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-brass/30 rounded-lg px-3 py-2 placeholder:text-black/30"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-brass/30 rounded-lg px-3 py-2 placeholder:text-black/30"
                        />
                        {passwordsMismatch && (
                            <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                        )}
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={isInvalid || loading}
                        className="bg-maple text-ebony font-medium py-2 rounded-lg hover:bg-maple/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Updating..." : "Update password"}
                    </button>
                </form>
            </div>
        </div>
    );
}