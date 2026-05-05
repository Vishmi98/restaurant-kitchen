import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import "@/models/staff.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function GET() {
    try {
        await connectDB();

        const orders = await OrderModel.find()
            .select("-_id -__v -createdDate -updatedDate")
            .populate({ path: "staffInfo", select: "-_id" })

        return sendSuccessResponse("Orders fetched successfully", { orders });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
