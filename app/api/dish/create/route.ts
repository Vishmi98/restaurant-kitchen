import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ImageKitService } from "@/services/imagekit";
import DishModel from "@/models/dish.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // Extract Text Fields
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price");
        const newPrice = formData.get("newPrice");
        const category = formData.get("category") as string;
        const calories = formData.get("calories");
        const prepTime = formData.get("prepTime") as string;
        const rating = formData.get("rating");
        const reviews = formData.get("reviews");

        // Handling tags (sent as a stringified array or comma-separated string)
        const tagsString = formData.get("tags") as string;
        const tags = tagsString ? tagsString.split(",").map(t => t.trim()) : [];

        // Extract Image
        const dishImage = formData.get("image") as File | null;

        // ✅ Basic Validation
        if (!name?.trim() || !price || !category || !dishImage) {
            return sendErrorResponse("Required fields (ID, Name, Price, Category, and Image) are missing.", 200);
        }

        // ✅ Initialize Image variables
        let imagePath = "";
        let imageId = "";

        // ✅ Upload Image to ImageKit
        try {
            const buffer = Buffer.from(await dishImage.arrayBuffer());
            const filename = `${Date.now()}-${dishImage.name}`;

            // Uploading to a specific 'dishes' folder
            const uploaded = await ImageKitService.uploadImage(buffer, filename, "restaurant/dishes");

            imagePath = uploaded.url;
            imageId = uploaded.fileId;
        } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
            return sendErrorResponse("Failed to upload dish image.", 200);
        }

        const lastDish = await DishModel.findOne().sort({ id: -1 });
        const nextId = lastDish ? lastDish.id + 1 : 1;

        // ✅ Save to Database
        const newDish = await DishModel.create({
            id: nextId,
            name,
            description,
            price: Number(price),
            newPrice: newPrice ? Number(newPrice) : undefined,
            imagePath,
            imageId,
            category,
            tags,
            calories: Number(calories),
            prepTime,
            rating: Number(rating),
            reviews: Number(reviews),
        });

        return sendSuccessResponse("Dish created successfully.", newDish);

    } catch (error: any) {
        return sendErrorResponse("Internal Server Error", 200);
    }
}