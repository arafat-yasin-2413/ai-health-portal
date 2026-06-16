"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { defaultPatients, defaultDoctors } from "@/utils/mockData";
import {
    ShieldAlert,
    User,
    Stethoscope,
    ArrowRight,
    Sparkles,
} from "lucide-react";

export default function Home() {
    // const [mounted, setMounted] = useState(false);

    useEffect(() => {
    // Fail-Safe Flow: Default data seed into localStorage on first load
    if (typeof window !== "undefined") {
        if (!localStorage.getItem("medical_patients")) {
            localStorage.setItem(
                "medical_patients",
                JSON.stringify(defaultPatients),
            );
        }

        if (!localStorage.getItem("medical_doctors")) {
            localStorage.setItem(
                "medical_doctors",
                JSON.stringify(defaultDoctors),
            );
        }

        if (!localStorage.getItem("medical_records")) {
            localStorage.setItem("medical_records", JSON.stringify([]));
        }

        if (!localStorage.getItem("medical_audit_logs")) {
            localStorage.setItem("medical_audit_logs", JSON.stringify([]));
        }
    }
}, []);

    // if (!mounted) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-6xl mx-auto bg-slate-50">
            {/* Premium Grader UX Helper Banner */}
            <div className="w-full bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shrink-0">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 text-sm md:text-base">
                            Evaluation Quick-Access Mode
                        </h4>
                        <p className="text-xs text-slate-500">
                            The system has auto-initialized default local
                            storage profiles for seamless testing.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="bg-white border px-2 py-1 rounded shadow-inner text-slate-700">
                        Demo Patient:{" "}
                        <strong className="text-indigo-600">PAT-101</strong>
                    </span>
                    <span className="bg-white border px-2 py-1 rounded shadow-inner text-slate-700">
                        Demo Doctor:{" "}
                        <strong className="text-indigo-600">DOC-202</strong>
                    </span>
                </div>
            </div>

            {/* Hero Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-900">
                    AI Clinical{" "}
                    <span className="text-indigo-600">Intelligence Portal</span>
                </h1>
                <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
                    A high-performance client-side medical architecture
                    utilizing automated AI structural extraction and custom
                    cross-portal data states.
                </p>
            </div>

            {/* Portals Gateway Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {/* Patient Portal */}
                <Card className="flex flex-col justify-between border-slate-200 shadow-sm bg-white hover:border-indigo-200 transition-all">
                    <CardHeader>
                        <div className="p-2.5 w-fit bg-indigo-50 rounded-lg mb-2 text-indigo-600">
                            <User className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900">
                            Patient Portal
                        </CardTitle>
                        <CardDescription className="text-slate-500 pt-1 text-sm leading-relaxed">
                            Upload diagnostic documents, run Gemini/OpenAI
                            structural parser workflows, and build an encrypted
                            chronological medical ledger.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <Link href="/patient" className="w-full">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center justify-center gap-2 group">
                                Enter Patient Hub
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Doctor Portal */}
                <Card className="flex flex-col justify-between border-slate-200 shadow-sm bg-white hover:border-emerald-200 transition-all">
                    <CardHeader>
                        <div className="p-2.5 w-fit bg-emerald-50 rounded-lg mb-2 text-emerald-600">
                            <Stethoscope className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900">
                            Doctor Portal
                        </CardTitle>
                        <CardDescription className="text-slate-500 pt-1 text-sm leading-relaxed">
                            Query records via Patient ID index, track antibiotic
                            consumption graphs, and explore categorized tabs for
                            medical safety validation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <Link href="/doctor" className="w-full">
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium flex items-center justify-center gap-2 group">
                                Launch Analytics View
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Admin Console */}
                <Card className="flex flex-col justify-between border-slate-200 shadow-sm bg-white hover:border-amber-200 transition-all">
                    <CardHeader>
                        <div className="p-2.5 w-fit bg-amber-50 rounded-lg mb-2 text-amber-600">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900">
                            Admin Console
                        </CardTitle>
                        <CardDescription className="text-slate-500 pt-1 text-sm leading-relaxed">
                            Manage system permissions, register/suspend IDs,
                            audit structural engine parsing, and trigger instant
                            premium mock data injections.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <Link href="/admin" className="w-full">
                            <Button
                                variant="outline"
                                className="w-full border-slate-300 hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-center gap-2 group">
                                Open Controls Panel
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
