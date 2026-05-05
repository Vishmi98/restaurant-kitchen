import { connectDB } from "@/lib/mongodb";
import DishModel from "@/models/dish.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST() {
    try {
        await connectDB();

        const dishes = await DishModel.find()
            .select("-_id -__v -createdDate -updatedDate")

        return sendSuccessResponse("Dishes fetched successfully", { dishes });
    } catch (error) {
        return sendErrorResponse("Server error", 200);
    }
}
