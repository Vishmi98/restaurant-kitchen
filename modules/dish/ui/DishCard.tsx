"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { DishDataType } from "../dish.types";


export interface ExtendedDishCardProps {
    card: DishDataType;
}

const DishCard = ({ card }: ExtendedDishCardProps) => {
    return (
        <div className="group relative bg-white p-2 text-center rounded-3xl shadow-sm border-2 border-transparent hover:border-primary transition-all">
            {/* Image */}
            <div className="relative w-full h-[200px] overflow-hidden rounded-full">
                <Image
                    src={card.imagePath}
                    alt={card.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Name */}
            <div>
                <h3 className="text-lg font-semibold font-libre">
                    {card.name}
                </h3>
            </div>

            {/* Stars */}
            <div className="text-yellow-400 text-sm">★★★★★</div>

            {/* Price */}
            <div className="text-lg font-bold">
                {card.newPrice && (
                    <span className="line-through text-gray-500 mr-2">
                        {card.newPrice}
                    </span>
                )}
                {card.price}
            </div>
        </div>
    );
};

export default DishCard;