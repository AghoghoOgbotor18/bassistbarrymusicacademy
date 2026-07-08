import { FaLock } from "react-icons/fa";

export default function LockedCard() {
    return (
        <div className="bg-white border border-brass/10 rounded-2xl overflow-hidden opacity-50 select-none">
            <div className="aspect-video bg-ebony/10 flex items-center justify-center">
                <FaLock className="text-ebony/20 text-3xl" />
            </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="h-2.5 bg-ebony/10 rounded-full w-12" />
                <div className="h-4 bg-ebony/10 rounded-full w-36" />
                <div className="h-3 bg-ebony/10 rounded-full w-24" />
            </div>
        </div>
    );
}