import {
    AuditLog,
    DoctorProfile,
    MedicalRecord,
    PatientProfile,
} from "@/types/medical";

// 1. creates id with upload
export const defaultPatients: PatientProfile[] = [
    {
        patientId: "PAT-101",
        name: "Zubair Bin Akhtaruzzaman",
        status: "Active",
    },
    { patientId: "PAT-102", name: "Sarah Khan", status: "Active" },
];

export const defaultDoctors: DoctorProfile[] = [
    { doctorId: "DOC-202", name: "Dr. Arman Ahmed", status: "Active" },
];

// 2. Inject premium mock data -> for admin panel
export const premiumMockPatients: PatientProfile[] = [
    ...defaultPatients,
    { patientId: "PAT-103", name: "Rahim Al-Hasan", status: "Active" },
    { patientId: "PAT-104", name: "Nusrat Jahan", status: "Suspended" },
];

export const premiumMockRecords: MedicalRecord[] = [
    // Patient: PAT-101
    {
        recordId: "REC-001",
        patientId: "PAT-101",
        patientName: "Jobayer",
        date: "2024-03-12",
        doctorName: "Dr. Arman Ahmed",
        patientCase: "Severe Dry Cough and Acute Fatigue",
        respiratoryRate: "22 bpm",
        bloodPressure: "130/85",
        medicines: [
            {
                name: "Azithromycin 500mg",
                dosage: "1+0+0",
                duration: "5 days",
                category: "Antibiotic",
            },
            {
                name: "Napa Extend",
                dosage: "1+1+1",
                duration: "3 days",
                category: "Other",
            },
            {
                name: "Omeprazole 20mg",
                dosage: "1+0+1",
                duration: "14 days",
                category: "Gastric",
            },
        ],
        testResults: [
            { testName: "Hemoglobin", value: "14.2 g/dL" },
            { testName: "Chest X-Ray", value: "Mild congestion observed" },
        ],
    },
    {
        recordId: "REC-002",
        patientId: "PAT-101",
        patientName: "Rakib",
        date: "2025-01-05",
        doctorName: "Dr. Sayed Rahman",
        patientCase: "High Fever and Body Ache",
        respiratoryRate: "19 bpm",
        bloodPressure: "120/80",
        medicines: [
            {
                name: "Amoxicillin 250mg",
                dosage: "1+1+1",
                duration: "7 days",
                category: "Antibiotic",
            },
            {
                name: "Vitamin C",
                dosage: "0+1+0",
                duration: "30 days",
                category: "Vitamin",
            },
            {
                name: "Esomeprazole 40mg",
                dosage: "1+0+0",
                duration: "7 days",
                category: "Gastric",
            },
        ],
        testResults: [
            { testName: "CBC (WBC Count)", value: "11,500 /mcL (Elevated)" },
            { testName: "Platelet Count", value: "250,000 /mcL" },
        ],
    },
    {
        recordId: "REC-003",
        patientId: "PAT-101",
        patientName: "Kamrul",
        date: "2026-05-20",
        doctorName: "Dr. Arman Ahmed",
        patientCase: "Routine Checkup & Vitamin Deficiency Follow-up",
        respiratoryRate: "16 bpm",
        bloodPressure: "118/75",
        medicines: [
            {
                name: "Calcium D3",
                dosage: "0+0+1",
                duration: "60 days",
                category: "Calcium",
            },
            {
                name: "Multivitamin Gold",
                dosage: "1+0+0",
                duration: "30 days",
                category: "Vitamin",
            },
        ],
        testResults: [
            { testName: "Vitamin D Level", value: "18 ng/mL (Deficient)" },
            { testName: "Serum Calcium", value: "9.2 mg/dL" },
        ],
    },
];

export const premiumMockAuditLogs: AuditLog[] = [
    {
        id: "LOG-001",
        timestamp: "2026-06-14 10:15",
        action: "AI PARSE SUCCESS",
        details: "File prescription_v1.pdf structured into JSON successfully.",
    },
    {
        id: "LOG-002",
        timestamp: "2026-06-15 14:30",
        action: "AI PARSE SUCCESS",
        details: "Image report_june.jpg schema verification completed.",
    },
];
