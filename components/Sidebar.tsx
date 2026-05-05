"use client"

import { GiFlame } from 'react-icons/gi';
import { LuLayoutDashboard, LuUtensilsCrossed } from 'react-icons/lu';
import { BiStar, BiX } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const menuItems = [
    { name: 'Dashboard', icon: <LuLayoutDashboard size={20} />, path: '/admin' },
    { name: 'Menu', icon: <LuUtensilsCrossed size={20} />, path: '/admin/menu' },
    { name: 'Food Orders', icon: <FaClipboardList size={20} />, path: '/admin/orders' },
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
    const pathname = usePathname();
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 p-5 transition-transform duration-300 transform
                lg:translate-x-0 lg:static lg:inset-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="flex items-start md:items-center justify-between mb-10">
                    <div className="flex flex-col items-start gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <GiFlame className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-2xl font-bold">Food.<span className="text-primary">Admin</span></h1>
                    </div>
                    <button className="lg:hidden" onClick={() => setIsOpen(false)}><BiX size={24} /></button>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsOpen(false)} // Close sidebar on mobile after click
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:bg-orange-50 hover:text-primary'
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}