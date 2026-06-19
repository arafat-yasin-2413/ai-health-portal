"use server";

import { GoogleGenAI } from "@google/genai";

// ১. সার্ভার ও ক্লায়েন্ট দুই দিকের সেফটির জন্য ফলব্যাকসহ API Key ভ্যালিডেশন
const apiKey =
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error(
        "❌ CRITICAL ERROR: Gemini API Key is missing in environment variables!",
    );
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function parseMedicalDocument(
    base64Data: string,
    mimeType: string,
    patientId: string,
) {
    try {
        // ২. রানটাইম গেটওয়ে চেক
        if (!ai) {
            return {
                success: false,
                error: "Server configuration error: Gemini API connection could not be established.",
            };
        }

        // ৩. স্ট্রং Base64 স্যানিটাইজেশন (কোনো প্রকার URI স্কিম বা প্রিফিক্স থাকলে তা রিমুভ করবে)
        const base64Content = base64Data.includes("base64,")
            ? base64Data.split("base64,")[1]
            : base64Data;

        const filePart = {
            inlineData: {
                data: base64Content,
                mimeType: mimeType,
            },
        };

        const prompt = `
            You are an expert clinical data extraction engine.
            Analyze the attached medical document (PDF/Image) carefully.
            Extract the data accurately without inventing any facts.
            If a field is missing, use an empty string "" or empty array [].

            Return the output STRICTLY as a raw JSON object matching this schema without markdown blocks:
            {
                "patientId": "${patientId}",
                "recordId": "REC-${Math.floor(100000 + Math.random() * 900000)}",
                "doctorName": "Extracted Doctor Name",
                "date": "YYYY-MM-DD (Extract prescription date, if missing use today)",
                "patientCase": "Brief summary of symptoms or clinical notes",
                "respiratoryRate": "Extract RR if available, else 'N/A'",
                "bloodPressure": "Extract BP if available, else 'N/A'",
                "medicines": [
                    { "name": "Drug Name", "dosage": "e.g. 1+0+1", "duration": "e.g. 7 Days", "category": "Antibiotic OR Gastric OR Vitamin OR Calcium OR General" }
                ]
            }
        `;

        // ৪. এপিআই কল এক্সিকিউশন
        // ৫. জেমিনি মডেল এক্সিকিউশন (with a quick automatic retry fallback)
        let response;
        try {
            response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [filePart, prompt],
                config: { responseMimeType: "application/json" },
            });
        } catch (firstError: any) {
            // যদি ডিমান্ড হাই থাকে বা ৫0৩ এরর আসে, ২ সেকেন্ড অপেক্ষা করে ১.৫ মডেল দিয়ে ব্যাকআপ ট্রাই করবে
            console.log(
                "Model 2.5 busy, switching automatically to 1.5-flash...",
            );
            await new Promise((resolve) => setTimeout(resolve, 2000)); // ২ সেকেন্ড পজ

            response = await ai.models.generateContent({
                model: "gemini-1.5-flash", // ফলব্যাক মডেল
                contents: [filePart, prompt],
                config: { responseMimeType: "application/json" },
            });
        }

        let rawJson = response.text;

        if (!rawJson) {
            throw new Error(
                "Gemini AI returned an empty or invalid content stream.",
            );
        }

        // ৫. সেফটি ফিল্টার: জেমিনি যদি প্রম্পট অমান্য করে মার্কডাউন ব্যাকটিক্স (```json) দেয়, তা ক্লিন করার মেকানিজম
        if (rawJson.includes("```")) {
            rawJson = rawJson
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();
        }

        // ৬. টাইপ-সেফ ডাটা পার্সিং
        const parsedData = JSON.parse(rawJson);

        return { success: true, data: parsedData };
    } catch (error: unknown) {
        // টার্মিনালে আসল এরর অবজেক্টটি ডিটেইলসে দেখতে পাবেন (যেমন: Auth Failure, Model Not Found বা Syntax Error)
        console.error("Detailed Server AI Pipeline Crash Logs:", error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : "Parsing layer extraction exception";

        return {
            success: false,
            error: `AI Error: ${errorMessage}`,
        };
    }
}

// "use server";

// import { MedicalRecord, MedicineCategory } from "@/types/medical";

// // to clean wrong markdown
// function cleanJsonString(rawString: string): string {
//     let cleaned = rawString.trim();
//     if (cleaned.startsWith("```")) {
//         cleaned = cleaned
//             .replace(/^```json/, "")
//             .replace(/^```/, "")
//             .trim();
//     }
//     return cleaned;
// }

// export async function parseMedicalDocument(
//     base64Data: string,
//     patientId: string,
// ): Promise<{ success: boolean; data?: MedicalRecord; error?: string }> {
//     const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

//     if (!apiKey) {
//         return {
//             success: false,
//             error: "System Configuration Error: GEMINI_API_KEY is missing on server environment variables.",
//         };
//     }

//     // system prompt
//     const systemPrompt = `
//     You are an expert Clinical Intelligence AI Parser. Your task is to extract medical data from the provided raw text or prescription scan and return a valid JSON object matching the exact JSON schema provided below.
//     Do not include any introductory sentences, markdown code block wrappers (like \`\`\`json), or conversational text. Output ONLY the raw valid JSON string.

//     CRITICAL RULES FOR EXTRACTION:
//     1. Medicine Category Mapping: You must categorize each extracted medicine into one of these exact string values: 'Antibiotic', 'Vitamin', 'Calcium', 'Gastric', or 'Other'.
//     2. Empty Values: If certain fields (like respiratoryRate or bloodPressure) are completely missing from the text, default them to "Not Available".
//     3. Test Values: Always pair the diagnostic test name with its numerical value or observed state clearly.

//     REQUIRED JSON OUTPUT SCHEMA FORMAT:
//     {
//       "recordId": "GEN-UUID",
//       "patientId": "${patientId}",
//       "date": "YYYY-MM-DD format based on consultation date (if missing use current date 2026-06-17)",
//       "doctorName": "Doctor's name with prefix Dr.",
//       "patientCase": "Comprehensive breakdown of patient complaints/symptoms summary",
//       "respiratoryRate": "Value in bpm (e.g., '18 bpm')",
//       "bloodPressure": "Value in mmHg (e.g., '120/80')",
//       "medicines": [
//         {
//           "name": "Full medicine name",
//           "dosage": "Dosage parameters (e.g., '1+0+1' or '500mg')",
//           "duration": "Duration specified (e.g., '7 days')",
//           "category": "Must be exactly one of: 'Antibiotic' | 'Vitamin' | 'Calcium' | 'Gastric' | 'Other'"
//         }
//       ],
//       "testResults": [
//         {
//           "testName": "Name of clinical laboratory test",
//           "value": "Numerical result with metric units or state flag"
//         }
//       ]
//     }
//   `;

//     try {
//         const base64Content = base64Data.split(",")[1] || base64Data;
//         const response = await fetch(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
//             {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     contents: [
//                         {
//                             parts: [
//                                 { text: systemPrompt },
//                                 {
//                                     text: `RAW MEDICAL DOCUMENT FOR EXTRACTION:\n\n${base64Content}`,
//                                 },
//                             ],
//                         },
//                     ],
//                 }),
//             },
//         );

//         if (!response.ok) {
//             return {
//                 success: false,
//                 error: `Gemini Engine Gate Error: Status code ${response.status}`,
//             };
//         }
//         const jsonRes = await response.json();
//         const rawAiText = jsonRes?.candidates?.[0]?.content?.parts?.[0]?.text;

//         if (!rawAiText) {
//             return {
//                 success: false,
//                 error: "AI Engine returned an unparseable or empty token payload.",
//             };
//         }

//         const sanitizedJsonString = cleanJsonString(rawAiText);
//         const parsedRecord: MedicalRecord = JSON.parse(sanitizedJsonString);

//         // unique id for medical record
//         parsedRecord.recordId = `REC-${Math.floor(100000 + Math.random() * 900000)}`;

//         return { success: true, data: parsedRecord };
//     } catch (err: unknown) {
//         const errorMessage =
//             err instanceof Error ? err.message : "Something went wrong";
//         return {
//             success: false,
//             error:
//                 errorMessage ||
//                 "An unhandled crash occured within the AI middleware channel.",
//         };
//     }
// }
