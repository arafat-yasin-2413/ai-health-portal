import React from "react";

export default function LoaderSkeleton() {
    return (
        <div className="space-y-4 animate-pulse bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                </div>
            </div>
            <div className="space-y-2 pt-2">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
        </div>
    );
}
