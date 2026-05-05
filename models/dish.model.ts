import mongoose from "mongoose";

const DishSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        newPrice: {
            type: Number
        },
        imagePath: {
            type: String,
            required: true
        },
        imageId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ["Appetizers", "Main Course", "Sides", "Desserts", "Beverages"]
        },
        tags: {
            type: [String],
            default: []
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviews: {
            type: Number,
            default: 0
        },
        calories: {
            type: Number,
            required: true
        },
        prepTime: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const DishModel = mongoose.models.Dish || mongoose.model("Dish", DishSchema);

export default DishModel;