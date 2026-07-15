"use client";
import { FaTimes } from "react-icons/fa";
import { useAuthModal } from "../context/AuthModalContext";
import { useReducer, useState, useEffect } from "react";
import { createClient } from "../lib/supabase";
import { useRouter } from "next/navigation";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
};

function formReducer(state, action){
    switch(action.type){
        case "update_field":
            return{
                ...state,
                [action.field]: action.value,
            };
        case "reset": 
            return initialState;
        default: 
            return state;
    }    
}

export default function AuthModal() {
    const { open, mode, setMode, closeModal } = useAuthModal();
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState({});
    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const router = useRouter();
    const supabase = createClient();

    // auto-dismiss success message after 4 seconds
    useEffect(() => {
        if (!successMessage) return;
        const timer = setTimeout(() => setSuccessMessage(null), 4000);
        return () => clearTimeout(timer);
    }, [successMessage]);

    const requiredFields = mode === "signup"
        ? ["name", "email", "password", "confirmPassword"]
        : mode === "login"
        ? ["email", "password"]
        : ["email"];

    const passwordsMismatch =
        mode === "signup" &&
        formData.confirmPassword.length > 0 &&
        formData.password !== formData.confirmPassword;

    const hasEmptyRequired = requiredFields.some(
        (field) => formData[field].trim() === ""
    );

    const isFormInvalid = hasEmptyRequired || passwordsMismatch;
    const isFieldEmpty = (field) => touched[field] && formData[field].trim() === "";

    if (!open) return null;

    const handleChange = (e) => {
        dispatch({
            type: "update_field",
            field: e.target.name,
            value: e.target.value
        });
        // clear error as soon as user starts correcting
        if (error) setError(null);
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allTouched = requiredFields.reduce(
            (acc, field) => ({ ...acc, [field]: true }),
            {}
        );
        setTouched(allTouched);
        if (isFormInvalid) return;

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            if (mode === "login") {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error){
                    throw new Error("Invalid email/password");
                    console.log(error);
                } ;
                closeModal();
                dispatch({ type: "reset" });
                router.refresh();
                router.push("/dashboard");

            } else if (mode === "forgot") {
                const { error } = await supabase.auth.resetPasswordForEmail(
                    formData.email,
                    { redirectTo: `${window.location.origin}/auth/reset-password` }
                );
                if (error) throw error;
                setSuccessMessage("Password reset link sent! Check your email.");
                dispatch({ type: "reset" });

            } else {
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: { full_name: formData.name },
                    },
                });
                if (error) throw error;
                setSuccessMessage("Account created! Check your email to confirm before logging in.");
                dispatch({ type: "reset" });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const switchMode = (nextMode) => {
        setMode(nextMode);
        setTouched({});
        setError(null);
        setSuccessMessage(null);
    };

    const handleClose = () => {
        closeModal();
        setSuccessMessage(null);
        setError(null);
        setTouched({});
        dispatch({ type: "reset" });
    };

    return (
        <div
            className="fixed inset-0 bg-ebony/70 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
            onClick={handleClose}
        >
            <div
                className="bg-parchment rounded-xl max-w-sm w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-ebony/60 hover:text-ebony"
                >
                    <FaTimes />
                </button>

                <h2 className="font-display text-xl font-bold text-ebony mb-1">
                    {mode === "login" ? "Welcome back"
                    : mode === "signup" ? "Create your account"
                    : "Reset your password"}
                </h2>

                {mode === "forgot" && !successMessage && (
                    <p className="text-sm text-ebony/60 mb-4">
                        Enter your email and we'll send you a reset link.
                    </p>
                )}

                {/* Success message */}
                {successMessage && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 mt-4">
                    {mode === "signup" && (
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Full name"
                                required
                                className="w-full border border-brass/30 rounded-lg px-3 py-2 placeholder:text-black/30"
                            />
                            {isFieldEmpty("name") && (
                                <p className="text-red-600 text-sm mt-1">Name is required</p>
                            )}
                        </div>
                    )}

                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email"
                            required
                            className="w-full border border-brass/30 rounded-lg px-3 py-2 placeholder:text-black/30"
                        />
                        {isFieldEmpty("email") && (
                            <p className="text-red-600 text-sm mt-1">Email is required</p>
                        )}
                    </div>

                    {(mode === "login" || mode === "signup") && (
                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Password"
                                required
                                className="w-full border border-brass/30 rounded-lg px-3 py-2 placeholder:text-black/30"
                            />
                            {isFieldEmpty("password") && (
                                <p className="text-red-600 text-sm mt-1">Password is required</p>
                            )}
    
                            {mode === "login" && (
                                <div className="text-right mt-1">
                                    <button
                                        type="button"
                                        onClick={() => switchMode("forgot")}
                                        className="text-sm text-maple hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {mode === "signup" && (
                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Confirm Password"
                                required
                                className="w-full border border-brass/30 rounded-lg px-3 py-2 placeholder:text-black/30"
                            />
                            {isFieldEmpty("confirmPassword") && (
                                <p className="text-red-600 text-sm mt-1">Please confirm your password</p>
                            )}
                            {!isFieldEmpty("confirmPassword") && passwordsMismatch && (
                                <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                            )}
                        </div>
                    )}

                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isFormInvalid || loading}
                        className="bg-maple text-ebony font-medium py-2 rounded-lg hover:bg-maple/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? mode === "login" ? "Logging in..."
                            : mode === "signup" ? "Creating account..."
                            : "Sending reset link..."
                            : mode === "login" ? "Log in"
                            : mode === "signup" ? "Sign up"
                            : "Send reset link"
                        }
                    </button>
                </form>

                <p className="text-sm text-ebony/90 mt-4 text-center">
                    {mode === "login" && (
                        <>
                            Don't have an account?{" "}
                            <button
                                onClick={() => switchMode("signup")}
                                className="text-maple font-medium hover:underline"
                            >
                                Sign up
                            </button>
                        </>
                    )}
                    {mode === "signup" && (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => switchMode("login")}
                                className="text-maple font-medium hover:underline"
                            >
                                Log in
                            </button>
                        </>
                    )}
                    {mode === "forgot" && (
                        <>
                            Remember your password?{" "}
                            <button
                                onClick={() => switchMode("login")}
                                className="text-maple font-medium hover:underline"
                            >
                                Back to login
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}