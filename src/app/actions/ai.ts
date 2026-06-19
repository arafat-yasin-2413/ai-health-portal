"use server";

import { GoogleGenAI, Type } from "@google/genai";

const apiKey =
    process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
    console.error(
        "❌ CRITICAL ERROR: Gemini API Key is missing in environment variables!",
    );
}

// Production safe initialization using the new SDK
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function parseMedicalDocument(
    base64Data: string,
    mimeType: string,
    patientId: string,
) {
    try {
        if (!ai) {
            return {
                success: false,
                error: "Server configuration error: Gemini API connection could not be established.",
            };
        }

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
            Extract the data accurately into the requested JSON schema without inventing any facts.
            If a field is missing, leave it as an empty string or empty array as defined.
        `;

        // Call using the correct model name and structured schema for `@google/genai`
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Updated to the correct model identifier
            contents: [filePart, prompt],
            config: {
                responseMimeType: "application/json",
                // Defining a strict schema guarantees clean JSON output with no markdown backticks
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        patientId: { type: Type.STRING },
                        recordId: { type: Type.STRING },
                        doctorName: {
                            type: Type.STRING,
                            description: "Extracted Doctor Name",
                        },
                        date: {
                            type: Type.STRING,
                            description:
                                "YYYY-MM-DD (Extract prescription date, if missing use today)",
                        },
                        patientCase: {
                            type: Type.STRING,
                            description:
                                "Brief summary of symptoms or clinical notes",
                        },
                        respiratoryRate: {
                            type: Type.STRING,
                            description: "Extract RR if available, else 'N/A'",
                        },
                        bloodPressure: {
                            type: Type.STRING,
                            description: "Extract BP if available, else 'N/A'",
                        },
                        medicines: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    dosage: {
                                        type: Type.STRING,
                                        description: "e.g. 1+0+1",
                                    },
                                    duration: {
                                        type: Type.STRING,
                                        description: "e.g. 7 Days",
                                    },
                                    category: {
                                        type: Type.STRING,
                                        description:
                                            "Antibiotic OR Gastric OR Vitamin OR Calcium OR General",
                                    },
                                },
                                required: [
                                    "name",
                                    "dosage",
                                    "duration",
                                    "category",
                                ],
                            },
                        },
                    },
                    required: [
                        "patientId",
                        "recordId",
                        "doctorName",
                        "date",
                        "patientCase",
                        "respiratoryRate",
                        "bloodPressure",
                        "medicines",
                    ],
                },
            },
        });

        const rawJson = response.text;

        if (!rawJson) {
            throw new Error(
                "Gemini AI returned an empty or invalid content stream.",
            );
        }

        // Since responseSchema enforces strict JSON, you no longer need markdown string replacement logic
        const parsedData = JSON.parse(rawJson);

        // Inject dynamic values if needed, or rely on schema generation
        parsedData.patientId = patientId;
        if (!parsedData.recordId) {
            parsedData.recordId = `REC-${Math.floor(100000 + Math.random() * 900000)}`;
        }

        return { success: true, data: parsedData };
    } catch (error) {
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
