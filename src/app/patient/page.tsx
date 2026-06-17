"use client";

import { useState, useEffect } from "react";
import { parseMedicalDocument } from "@/app/actions/ai";
import { appendMedicalRecord, safeGetStorage } from "@/utils/storageEngine";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Sparkles, Loader2, Database, FileText } from "lucide-react";

export default function PatientPage() {
    const [mounted, setMounted] = useState(false);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<any[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        setLogs(safeGetStorage("medical_audit_logs", []));
    }, []);

    const handleDemoParse = async () => {
        if (!inputText.trim())
            return alert(
                "Please paste a clinical document text snippet first.",
            );
        setLoading(true);
        setErrorMsg(null);

        // processing data for demo patient
        const result = await parseMedicalDocument(inputText, "PAT-101");

        if (result.success && result.data) {
            appendMedicalRecord(result.data);
            setLogs(safeGetStorage("medical_audit_logs", []));
            setInputText("");
            alert(`Success! Generated Record ID: ${result.data.recordId}`);
        } else {
            setErrorMsg(
                result.error ||
                    "An unexpected extraction boundary break occurred.",
            );
        }
        setLoading(false);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="max-w-4xl mx-auto p-6 mt-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">
                    Patient Document Hub
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Form Input Area */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <Card className="bg-white border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-indigo-600" />
                                    AI Document Text Scanner Emulator
                                </CardTitle>
                                <CardDescription>
                                    Paste raw prescriptions or
                                    medical notes below to validate the Day 2 AI
                                    Schema & Storage Engine.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <textarea
                                    className="w-full min-h-40 p-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-sans"
                                    placeholder="Example: Dr. Arman Ahmed. Date: 2026-06-15. Patient complaints of severe headache. Prescribed Napa Extend 1+1+1 for 5 days. Run Blood Test, Hemoglobin count is 13.5."
                                    value={inputText}
                                    onChange={(e) =>
                                        setInputText(e.target.value)
                                    }
                                    disabled={loading}
                                />

                                {errorMsg && (
                                    <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2 rounded border border-rose-100">
                                        {errorMsg}
                                    </p>
                                )}

                                <Button
                                    onClick={handleDemoParse}
                                    disabled={loading}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium w-full flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            AI Core Pipeline Restructuring
                                            Data...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-4 w-4" />
                                            Execute Safe AI Extraction Engine
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Real-time Audit Log Pipeline Viewer */}
                    <div className="md:col-span-1">
                        <Card className="bg-white border-slate-200 shadow-sm h-full flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                    <Database className="h-4 w-4" />
                                    Live System Audit Pipeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto max-h-70 space-y-3 pt-0">
                                {logs.length === 0 ? (
                                    <p className="text-xs text-slate-400 italic">
                                        No files parsed in this current browser
                                        sandbox yet.
                                    </p>
                                ) : (
                                    logs.map((log: any) => (
                                        <div
                                            key={log.id}
                                            className="p-2.5 bg-slate-50 rounded border text-[11px] font-mono border-slate-100">
                                            <div className="text-emerald-600 font-bold">
                                                {log.action}
                                            </div>
                                            <div className="text-slate-500 text-[10px] my-0.5">
                                                {log.timestamp}
                                            </div>
                                            <div className="text-slate-700 font-sans leading-tight mt-1">
                                                {log.details}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
