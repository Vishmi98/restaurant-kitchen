import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import { VerificationService } from "@/services/verification.service";
import StaffModel from "@/models/staff.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { firstName, lastName, email, password, phone, role } = await req.json();

        if (!firstName || !lastName || !email || !password || !phone) {
            return sendErrorResponse("All fields are required", 200);
        }

        const normalizedEmail = email.toLowerCase().trim();
        const userRole = role || 'staff';

        const existingUser = await StaffModel.findOne({
            email: normalizedEmail,
            role: userRole,
        });

        if (existingUser) {
            return sendErrorResponse("User with this email and role already exists", 200);
        }

        const lastUser = await StaffModel.findOne().sort({ id: -1 });
        const id = lastUser ? lastUser.id + 1 : 1;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new StaffModel({
            id,
            firstName,
            lastName,
            email: normalizedEmail,
            password: hashedPassword,
            phone,
            role: role || 'staff',
        });

        await newUser.save();

        try {
            await VerificationService.handleEmailVerification(email);
        } catch (emailError) {
            console.error("Verification email failed to send:", emailError);
        }

        return sendSuccessResponse("Staff member registered successfully", {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        });

    } catch (err: any) {
        console.error("Register Error:", err);
        return sendErrorResponse("An unknown error occurred", 500);
    }
}
