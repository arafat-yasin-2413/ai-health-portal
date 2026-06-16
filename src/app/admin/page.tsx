"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { premiumMockPatients, premiumMockRecords, premiumMockAuditLogs, defaultPatients, defaultDoctors } from "@/utils/mockData";
import { Database, CheckCircle, Trash2, ShieldAlert } from "lucide-react";
import { PortalNav } from "@/components/nav/portal-nav";

export default function AdminPage() {
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'danger', text: string } | null>(null);

  const injectData = () => {
    localStorage.setItem("medical_patients", JSON.stringify(premiumMockPatients));
    localStorage.setItem("medical_records", JSON.stringify(premiumMockRecords));
    localStorage.setItem("medical_audit_logs", JSON.stringify(premiumMockAuditLogs));
    setStatusMsg({ type: 'success', text: "Premium medical histories & chronological records injected successfully!" });
  };

  const clearStorage = () => {
    localStorage.setItem("medical_patients", JSON.stringify(defaultPatients));
    localStorage.setItem("medical_doctors", JSON.stringify(defaultDoctors));
    localStorage.setItem("medical_records", JSON.stringify([]));
    localStorage.setItem("medical_audit_logs", JSON.stringify([]));
    setStatusMsg({ type: 'danger', text: "Local storage sanitized back to default baseline states." });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PortalNav />
      <main className="max-w-4xl mx-auto p-6 mt-8">
        <div className="flex items-center gap-3 mb-8">
          <ShieldAlert className="h-8 w-8 text-amber-500" />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Control Panel</h1>
            <p className="text-sm text-slate-500">Configure global mock variables and inject instant database schemas for live evaluation.</p>
          </div>
        </div>

        <Card className="border-slate-200 bg-white shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5 text-indigo-600" />
              Developer System Mock Configuration
            </CardTitle>
            <CardDescription>
              Use these shortcuts to skip clinical document scanning and immediately populate all doctor analytics graphs and historical charts.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={injectData} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex-1 flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Inject Pre-made Multi-Year Mock Dataset
            </Button>
            <Button 
              onClick={clearStorage} 
              variant="destructive" 
              className="font-medium flex-1 flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Wipe & Reset LocalStorage
            </Button>
          </CardContent>
        </Card>

        {statusMsg && (
          <div className={`p-4 rounded-lg border text-sm font-medium ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {statusMsg.text}
          </div>
        )}
      </main>
    </div>
  );
}