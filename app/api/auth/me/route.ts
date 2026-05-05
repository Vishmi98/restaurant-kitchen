import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendErrorResponse("Unauthorized", 401);
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("Missing JWT_SECRET");

        const decoded = jwt.verify(token, secret) as any;
        
        if (decoded.role !== 'admin' && decoded.role !== 'staff') {
            return sendErrorResponse("Forbidden", 403);
        }

        return sendSuccessResponse("Authorized", decoded);
    } catch (err: any) {
        return sendErrorResponse("Unauthorized", 401);
    }
}
