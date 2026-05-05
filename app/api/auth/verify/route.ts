import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse } from "@/services/apiResponse";
import { VerificationService } from "@/services/verification.service";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const { email, code, role } = body;

        const result = await VerificationService.handleVerifyEmail(email, code, role);

        return result;
    } catch (error) {
        console.log("Error:", error);
        return sendErrorResponse("Server error", 200);
    }
}
