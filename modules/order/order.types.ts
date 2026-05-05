import { StaffDataType } from "../auth/auth.types";

export type CustomerType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
};

export type OrderItemDataType = {
    dishId: number;
    name: string;
    price: number;
    quantity: number;
    imagePath: string;
};

export type OrderDataType = {
    id: number;
    customer: CustomerType;
    items: OrderItemDataType[];
    totalAmount: number;
    deliveryFee: number;
    paymentMethod: string;
    isPaid: boolean;
    status: string;
    note: string;
    estimatedDeliveryTime: string;
    assignedStaff: number | string;
    staffInfo: StaffDataType
};

export type OrdersResponseDataType = {
    success: boolean;
    message: string;
    orders: OrderDataType[];
}

export type OrdersResponseType = {
    success: boolean;
    message: string;
    data: {
        orders: OrderDataType[];
    }
}

export type UpdateOrderStatusResponseDataType = {
    success: boolean;
    message: string;
    data: OrderDataType
}


