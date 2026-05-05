"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const router = useRouter();

    // Simulated Auth
    useEffect(() => {
        const user = true; // replace with real auth
        if (!user) {
            router.push("/");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    if (!isAuthorized) return null;

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <TopNav onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}