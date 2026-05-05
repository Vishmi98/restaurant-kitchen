import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order.model";
import DishModel from "@/models/dish.model";
import { sendSuccessResponse, sendErrorResponse } from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { customer, items, paymentMethod, note } = body;

        if (!customer || !items?.length) {
            return sendErrorResponse("Missing data", 200);
        }

        // --- Logic Start ---
        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {
            const dish = await DishModel.findOne({ id: item.dishId });
            if (!dish) continue;

            subtotal += dish.price * item.quantity;
            orderItems.push({
                dishId: dish.id,
                name: dish.name,
                price: dish.price,
                quantity: item.quantity,
                imagePath: dish.imagePath
            });
        }
        const deliveryFee = 5.00;

        const totalWithDelivery = subtotal + deliveryFee;
        const lastOrder = await OrderModel.findOne().sort({ id: -1 });
        const nextId = lastOrder ? lastOrder.id + 1 : 1;

        const order = await OrderModel.create({
            id: nextId,
            customer,
            items: orderItems,
            totalAmount: totalWithDelivery,
            deliveryFee: deliveryFee,
            paymentMethod,
            note,
            estimatedDeliveryTime: new Date(Date.now() + 45 * 60000)
        });

        return sendSuccessResponse("Order placed successfully", order);

    } catch (error) {
        console.error(error);
        return sendErrorResponse("Server Error", 500);
    }
}