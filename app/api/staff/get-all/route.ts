import { connectDB } from "@/lib/mongodb";
import StaffModel from "@/models/staff.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function GET() {
    try {
        await connectDB();

        const staffs = await StaffModel.find()
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Staffs fetched successfully", { staffs });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
