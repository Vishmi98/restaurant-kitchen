"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    // Simulating Auth Logic
    useEffect(() => {
        const user = true; // Replace with getCookieUser()
        if (!user) {
            router.push("/login");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar - Desktop always visible, Mobile hidden by default */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
                <TopNav onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}