import React from "react";
import { PiChefHatBold } from "react-icons/pi";

import { OrderDataType } from "../order.types";


interface Props {
    order: OrderDataType;
    openStatusModal: (order: OrderDataType) => void;
    openStaffModal: (order: OrderDataType) => void;
    STATUS_COLORS: Record<string, string>;
}

const OrderCard = ({
    order,
    openStatusModal,
    openStaffModal,
    STATUS_COLORS,
}: Props) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border-2 border-transparent hover:border-primary transition-all p-5 flex flex-col justify-between h-auto gap-5">
            <div className="space-y-2 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">#{order.id}</h3>
                    <button
                        onClick={() => openStatusModal(order)}
                        className={`px-3 py-1 rounded-full text-xs ${STATUS_COLORS[order.status]}`}
                    >
                        {order.status}
                    </button>
                </div>

                {/* Customer */}
                <p className="text-sm text-gray-500">
                    {order.customer.name}
                </p>

                {/* Items */}
                <div className="text-sm space-y-1 max-h-[80px] overflow-hidden">
                    {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                        </div>
                    ))}
                </div>

                {/* Note */}
                {order.note && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs line-clamp-2">
                        {order.note}
                    </div>
                )}
            </div>

            <div>
                <p className="font-bold text-lg">${order.totalAmount}</p>

                {!["Pending", "Delivered", "Cancelled"].includes(order.status) && (
                    <div className="pt-3 border-t border-gray-300">
                        <button
                            onClick={() => openStaffModal(order)}
                            className="text-xs text-white bg-primary shadow-lg shadow-primary/20 px-3 py-1 rounded-md flex items-center gap-1 cursor-pointer"
                        >
                            <PiChefHatBold /> {order.staffInfo?.firstName || "Assign Staff"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderCard;