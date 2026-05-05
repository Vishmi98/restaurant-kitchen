import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        isVerify: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ['customer', 'admin', 'staff'],
            default: 'customer'
        }
    },
    {
        timestamps: true
    }
);

const StaffModel = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);

export default StaffModel;