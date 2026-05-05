"use client";

import {
    GiFlame
} from "react-icons/gi";

import {
    LuLayoutDashboard,
    LuLogOut,
    LuUtensilsCrossed,
    LuChevronLeft,
    LuChevronRight
} from "react-icons/lu";

import { BiX } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { handleCleanCookie } from "@/utils/cookie.util";
import userStore from "@/store/userStore";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

const menuItems = [
    { name: "Dashboard", icon: <LuLayoutDashboard size={18} />, path: "/admin" },
    { name: "Menu", icon: <LuUtensilsCrossed size={18} />, path: "/admin/menu" },
    { name: "Food Orders", icon: <FaClipboardList size={18} />, path: "/admin/orders" },
];

export default function Sidebar({
    isOpen,
    setIsOpen,
    isCollapsed,
    setIsCollapsed,
}: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (v: boolean) => void;
}) {
    const pathname = usePathname();
    const { removeUser } = userStore();

    const handleLogOut = () => {
        handleCleanCookie();
        removeUser();
        window.location.href = "/";
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
                fixed inset-y-0 left-0 z-50 h-full bg-white border-r border-slate-100 p-4
                transition-all duration-300 transform flex flex-col justify-between
                ${isCollapsed ? "w-20" : "w-64"}
                lg:translate-x-0 lg:static lg:inset-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* TOP */}
                <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-10">
                        {!isCollapsed && (
                            <div className="flex flex-col items-start gap-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <GiFlame className="text-white w-5 h-5" />
                                </div>

                                <h1 className="text-2xl font-bold">
                                    Food.<span className="text-primary">Admin</span>
                                </h1>
                            </div>
                        )}

                        {/* Desktop Collapse Toggle */}
                        <button
                            className="hidden lg:flex cursor-pointer px-3"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            {isCollapsed ? (
                                <TbLayoutSidebarRightCollapseFilled size={20} className="text-gray-400" />
                            ) : (
                                <TbLayoutSidebarLeftCollapseFilled size={20} className="text-gray-400" />
                            )}
                        </button>

                        {/* Mobile Close */}
                        <button
                            className="lg:hidden"
                            onClick={() => setIsOpen(false)}
                        >
                            <BiX size={24} />
                        </button>
                    </div>

                    {/* Menu */}
                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                    flex items-center gap-4 p-3 rounded-xl transition-all
                                    ${isActive
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "text-slate-400 hover:bg-orange-50 hover:text-primary"
                                        }
                                    ${isCollapsed ? "justify-center" : ""}
                                    `}
                                >
                                    {item.icon}

                                    {!isCollapsed && (
                                        <span className="font-medium">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogOut}
                    className={`
                    w-full flex items-center gap-4 p-3 rounded-xl
                    text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all
                    ${isCollapsed ? "justify-center" : ""}
                    `}
                >
                    <LuLogOut size={20} />

                    {!isCollapsed && (
                        <span className="font-medium">Logout</span>
                    )}
                </button>
            </aside>
        </>
    );
}