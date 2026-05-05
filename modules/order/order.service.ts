import { OrdersResponseDataType, OrdersResponseType, UpdateOrderStatusResponseDataType } from "./order.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getOrders = async (): Promise<OrdersResponseDataType> => {
    const response: OrdersResponseType = await apiCall({
        url: `${URL}/order/get-all`,
        method: 'GET',
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        orders: data.orders || [],
    };
};

export const updateOrderStatus = async (id: number, status: string): Promise<UpdateOrderStatusResponseDataType> => {
    const response: UpdateOrderStatusResponseDataType = await apiCall({
        url: `${URL}/order/update-status`,
        method: 'POST',
        body: { id, status },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const assignStaffToOrder = async (id: number, assignedStaff: string): Promise<UpdateOrderStatusResponseDataType> => {
    const response: UpdateOrderStatusResponseDataType = await apiCall({
        url: `${URL}/order/add-staff`,
        method: 'POST',
        body: { id, assignedStaff },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};