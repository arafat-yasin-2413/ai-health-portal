
export type MedicineCategory = 'Antibiotic' | 'Vitamin' | 'Calcium' | 'Gastric' | 'Other';


export interface Medicine {
    name: string;
    dosage: string;
    duration: string;
    category: MedicineCategory;
}

export interface DiagnosticTest {
    testName: string;
    value: string;
}

export interface MedicalRecord {
    recordId: string;
    patientId: string;
    patientName: string;
    date: string; // year-mm-dd
    doctorName: string;
    patientCase: string;
    respiratoryRate: string;
    bloodPressure: string;
    medicines: Medicine[];
    testResults: DiagnosticTest[];
}

export interface PatientProfile {
    patientId: string;
    name: string;
    status: 'Active' | 'Suspended';
}

export interface DoctorProfile {
    doctorId: string;
    name: string;
    status: 'Active' | 'Suspended';
}

export interface AuditLog {
    id: string;
    timestamp: string;
    action: string;
    details: string;
}