import React from "react";

export default function TopHeader() {
    return (
        <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                Patient Document Hub
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
                Upload clinical reports using our smart AI Document Extraction
                Engine.
            </p>
        </div>
    );
}
