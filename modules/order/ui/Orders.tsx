"use client";

import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
    getOrders,
    updateOrderStatus,
    assignStaffToOrder,
} from "../order.service";
import OrderCard from "./OrderCard";
import OrderSkeletonCard from "./OrderSkeletonCard";
import { OrderDataType } from "../order.types";

import { StaffDataType } from "@/modules/auth/auth.types";
import { getAllStaff } from "@/modules/auth/auth.service";
import CustomSelect from "@/components/CustomSelect";


const STATUS_LIST = [
    "Pending",
    "Accepted",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
];

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
    Pending: ["Accepted", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    Accepted: ["Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    Preparing: ["Out for Delivery", "Delivered", "Cancelled"],
    "Out for Delivery": ["Delivered", "Cancelled"],
};

const STATUS_COLORS: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-blue-100 text-blue-700",
    Preparing: "bg-purple-100 text-purple-700",
    "Out for Delivery": "bg-indigo-100 text-indigo-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
    const [orders, setOrders] = useState<OrderDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState<StaffDataType[]>([]);

    const [filter, setFilter] = useState("All");

    const [selectedOrder, setSelectedOrder] = useState<OrderDataType | null>(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedStaff, setSelectedStaff] = useState("");
    const [modalType, setModalType] = useState<"status" | "staff" | null>(null);

    useEffect(() => {
        fetchOrders();
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        setLoading(true);
        const res = await getAllStaff();
        if (res.success) setMembers(res.staffs || []);
        setLoading(false);
    };

    const fetchOrders = async () => {
        setLoading(true);
        const res = await getOrders();
        if (res.success) setOrders(res.orders || []);
        setLoading(false);
    };

    // Filter logic
    const filteredOrders =
        filter === "All"
            ? orders
            : orders.filter((o) => o.status === filter);

    // Open modals
    const openStatusModal = (order: OrderDataType) => {
        if (order.status === "Delivered") return;
        setSelectedOrder(order);
        setSelectedStatus(order.status);
        setModalType("status");
    };

    const openStaffModal = (order: OrderDataType) => {
        if (order.status === "Delivered") return;

        setSelectedOrder(order);
        setSelectedStaff(order.assignedStaff ? String(order.assignedStaff) : "");
        setModalType("staff");
    };

    // Confirm actions
    const confirmAction = async () => {
        if (!selectedOrder) return;
        setLoading(true);

        try {
            if (modalType === "status") {
                const res = await updateOrderStatus(
                    selectedOrder.id,
                    selectedStatus
                );
                res.success
                    ? toast.success(res.message)
                    : toast.error(res.message);
            }

            if (modalType === "staff") {
                const res = await assignStaffToOrder(
                    selectedOrder.id,
                    selectedStaff
                );
                res.success
                    ? toast.success(res.message)
                    : toast.error(res.message);
            }

            fetchOrders();
        } catch {
            toast.error("Something went wrong");
        }

        setModalType(null);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">All Orders</h1>
            {/* Tabs */}
            <div className="flex gap-3 flex-wrap">
                {["All", ...STATUS_LIST].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-lg text-sm border shadow-sm
            ${filter === tab
                                ? "bg-black text-white"
                                : "bg-white text-gray-600"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders Grid */}
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <OrderSkeletonCard key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredOrders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            openStatusModal={openStatusModal}
                            openStaffModal={openStaffModal}
                            STATUS_COLORS={STATUS_COLORS}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalType && (
                <div onClick={() => setModalType(null)} className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
                    <div className="bg-white p-6 rounded-xl w-[350px]" onClick={(e) => e.stopPropagation()}>
                        <h2 className="font-semibold mb-4">
                            {modalType === "status"
                                ? "Update Status"
                                : "Assign Staff"}
                        </h2>

                        {modalType === "status" && selectedOrder && (
                            <CustomSelect
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                options={(ALLOWED_TRANSITIONS[selectedOrder.status] || [])
                                    .map((s) => ({
                                        label: s,
                                        value: s,
                                    }))
                                }
                            />
                        )}

                        {modalType === "staff" && (
                            <CustomSelect
                                value={selectedStaff}
                                onChange={setSelectedStaff}
                                options={members.map((m) => ({
                                    label: m.firstName + " " + m.lastName,
                                    value: String(m.id), // important
                                }))}
                                placeholder="Select Staff"
                            />
                        )}

                        <div className="flex justify-between w-full gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-3 py-1 border rounded-lg w-full"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAction}
                                className="px-3 py-1 bg-black text-white rounded-lg w-full"
                            >
                                {loading ? "Saving..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;