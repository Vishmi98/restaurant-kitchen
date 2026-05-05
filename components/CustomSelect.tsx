"use client";

import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface Option {
    label: string;
    value: string;
}

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
}

const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder = "Select...",
}: Props) => {
    const [open, setOpen] = useState(false);

    const selected = options.find((o) => o.value === value);

    return (
        <div className="relative w-full mb-3">
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between bg-white text-sm"
            >
                <span className={`${!value ? "text-gray-400" : ""}`}>
                    {selected?.label || placeholder}
                </span>
                <BiChevronDown size={16} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
                ${value === opt.value ? "bg-gray-100 font-medium" : ""}
              `}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;