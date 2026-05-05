import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/mongodb";
import { EmailService } from "@/services/email.service";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import StaffModel from "@/models/staff.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const { email, firstName, role } = body;

        if (!email || !firstName || !role) {
            return sendErrorResponse("Email, firstName and role are required", 200);
        }

        const normalizedEmail = email.toLowerCase().trim();
        const userRole = role;

        const user = await StaffModel.findOne({
            email: normalizedEmail,
            firstName,
            role: userRole,
        });

        if (!user) {
            return sendErrorResponse("User not found", 200);
        }

        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 💾 Update DB
        await StaffModel.updateOne({ _id: user._id }, { password: hashedPassword });

        // 📧 Send reset password email
        await EmailService.sendPasswordResetEmail(email, newPassword);

        return sendSuccessResponse("Password has been reset. Check your email for the new password.", 200);
    } catch (error) {
        console.log("Error:", error);
        return sendErrorResponse("Server error", 200);
    }
}
