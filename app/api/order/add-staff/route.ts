import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, assignedStaff } = body;

        if (!id || !assignedStaff) {
            return sendErrorResponse("Order id and staff required", 200);
        }

        // get current order first
        const existingOrder = await OrderModel.findOne({ id });

        if (!existingOrder) {
            return sendErrorResponse("Order not found", 200);
        }

        // prepare update object
        const updateData: any = {
            assignedStaff,
        };

        const order = await OrderModel.findOneAndUpdate(
            { id },
            updateData,
            { new: true }
        );

        return sendSuccessResponse("Staff assigned", order);

    } catch (error) {
        console.error(error);
        return sendErrorResponse("Server Error", 200);
    }
}