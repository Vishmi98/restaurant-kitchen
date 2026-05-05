import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import DishModel from "@/models/dish.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { name } = body;

        if (!name) {
            return sendErrorResponse("Dish name is required.", 200);
        }

        const dish = await DishModel.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });

        if (!dish) {
            return sendErrorResponse("Dish not found.", 200);
        }

        return sendSuccessResponse("Dish retrieved successfully.", dish);
    } catch (error: any) {
        return sendErrorResponse("Internal server error.", 200);
    }
}
