"use client"

import { useEffect, useState } from "react";

import { DishDataType } from "../dish.types";
import { getDishes } from "../dish.service";
import DishCardSkeleton from "./DishCardSkeleton";
import DishCard from "./DishCard";


const Dishes = () => {
    const [dishes, setDishes] = useState<DishDataType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                setLoading(true);

                const response = await getDishes();

                if (response.success) {
                    setDishes(response.dishes || []);
                }
            } catch (error) {
                console.error("Failed to fetch dishes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">All Menu</h1>
                {/* add button */}
            </div>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <DishCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {dishes.map((dish) => (
                        <DishCard
                            key={dish.id}
                            card={dish}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dishes