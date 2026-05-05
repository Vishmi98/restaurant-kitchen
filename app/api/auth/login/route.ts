import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { generateToken } from "@/utils/jwt";
import { VerificationService } from "@/services/verification.service";
import StaffModel from "@/models/staff.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return sendErrorResponse("Email and password are required", 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await StaffModel.findOne({ email: normalizedEmail });

        if (!user) {
            return sendErrorResponse("Invalid email or password", 200);
        }

        if (user.role !== "admin" && user.role !== "staff") {
            return sendErrorResponse("Access denied. Admins only.", 403);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendErrorResponse("Invalid email or password", 200);
        }

        if (!user.isVerify) {
            await VerificationService.handleEmailVerification(normalizedEmail);
            return sendSuccessResponse("Please verify your account", {
                isVerify: false,
                token: ""
            });
        }

        const token = generateToken({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerify: user.isVerify,
            email: user.email,
            role: user.role,
            phone: user?.phone,
        });

        return sendSuccessResponse("Login successful", {
            token,
            isVerify: true,
        });

    } catch (err: any) {
        console.error("Login Error:", err);
        return sendErrorResponse("An unknown error occurred", 500);
    }
}
