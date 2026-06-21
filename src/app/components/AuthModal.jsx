"use client";
import { FaTimes } from "react-icons/fa";
import { useAuthModal } from "../context/AuthModalContext";
import { useReducer, useState } from "react";

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

    const requiredFields = mode === "signup"
        ? ["name", "email", "password", "confirmPassword"]
        : ["email", "password"];

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
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allTouched = requiredFields.reduce(
            (acc, field) => ({ ...acc, [field]: true }),
            {}
        );
        setTouched(allTouched);
        if (isFormInvalid) return;
        console.log(formData);
        dispatch({ type: "reset" });
    };

    const switchMode = (nextMode) => {
        setMode(nextMode);
        setTouched({});
        setError(null);
    };

    return (
        <div
        className="fixed inset-0 bg-ebony/70 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
        onClick={closeModal}
        >
        <div className="bg-parchment rounded-xl max-w-sm w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-3 right-3 text-ebony/60 hover:text-ebony">
                <FaTimes />
            </button>

            <h2 className="font-display text-xl font-bold text-ebony mb-4">
            {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                {mode === "signup" && (
                    <div>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="Full name" required className="w-full border border-brass/30 rounded-lg px-3 py-2" />
                        {isFieldEmpty("name") && <p className="text-red-600 text-sm mt-1">Name is required</p>}
                    </div>
                )}

                <div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email" required className="w-full border border-brass/30 rounded-lg px-3 py-2" />
                    {isFieldEmpty("email") && <p className="text-red-600 text-sm mt-1">Email is required</p>}
                </div>

                <div>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} placeholder="Password" required className="w-full border border-brass/30 rounded-lg px-3 py-2" />
                    {isFieldEmpty("password") && <p className="text-red-600 text-sm mt-1">Password is required</p>}
                </div>

                {mode === "signup" && (
                    <div>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm Password" required className="w-full border border-brass/30 rounded-lg px-3 py-2" />
                        {isFieldEmpty("confirmPassword") && <p className="text-red-600 text-sm mt-1">Please confirm your password</p>}
                        {!isFieldEmpty("confirmPassword") && passwordsMismatch && (
                            <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                        )}
                    </div>
                )}

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={isFormInvalid}
                    className="bg-maple text-ebony font-medium py-2 rounded-lg hover:bg-maple/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {mode === "login" ? "Log in" : "Sign up"}
                </button>
            </form>

            <p className="text-sm text-ebony/90 mt-4 text-center">
            {mode === "login" ? (
                <>Don't have an account? <button onClick={() => switchMode("signup")} className="text-maple font-medium hover:underline">Sign up</button></>
            ) : (
                <>Already have an account? <button onClick={() => switchMode("login")} className="text-maple font-medium hover:underline">Log in</button></>
            )}
            </p>
        </div>
        </div>
    );
}