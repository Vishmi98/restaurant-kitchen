import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    phone: String,
    address: String,
});

const OrderItemSchema = new mongoose.Schema({
    dishId: Number,
    name: String,
    price: Number,
    quantity: Number,
    imagePath: String,
});

const OrderSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            required: true
        },

        customer: {
            type: CustomerSchema,
            required: true
        },

        items: {
            type: [OrderItemSchema],
            required: true
        },

        totalAmount: {
            type: Number,
            required: true
        },

        deliveryFee: {
            type: Number,
            default: 0
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "Card"],
            required: true
        },

        isPaid: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Preparing",
                "Out for Delivery",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        },

        assignedStaff: {
            type: Number,
            default: 0
        },

        note: String,

        estimatedDeliveryTime: Date
    },
    {
        timestamps: true
    }
);

OrderSchema.virtual("staffInfo", {
    ref: "Staff",
    localField: "assignedStaff",
    foreignField: "id",
    justOne: true
});

OrderSchema.set("toObject", { virtuals: true });
OrderSchema.set("toJSON", { virtuals: true });

const OrderModel =
    mongoose.models.Order ||
    mongoose.model("Order", OrderSchema);

export default OrderModel;