"use client"

import { useEffect, useState } from "react";
import { BiChevronRight, BiStar } from "react-icons/bi";

import { getDishes } from "@/modules/dish/dish.service";
import { ExtendedDishCardProps } from "@/modules/dish/ui/DishCard";
import { DishDataType } from "@/modules/dish/dish.types";


const CategoryCard = ({ name, emoji }: { name: string, emoji: string }) => (
    <div className="min-w-[110px] bg-white p-4 rounded-2xl flex flex-col items-center gap-3 shadow-sm hover:shadow-md cursor-pointer transition-all border border-transparent hover:border-primary group">
        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="text-2xl">{emoji}</span>
        </div>
        <span className="text-sm font-semibold text-slate-500">{name}</span>
    </div>
);

const FoodCard = ({ card }: ExtendedDishCardProps) => (
    <div className="bg-white p-4 rounded-3xl shadow-sm border-2 border-transparent hover:border-primary transition-all">
        <div className="flex gap-4 mb-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={card.imagePath} alt="Dish" className="object-cover w-full h-full" />
            </div>
            <div>
                <h3 className="font-bold text-sm">{card.name}</h3>
                <p className="text-primary font-bold text-lg">{card.price}</p>
                <div className="flex items-center gap-1 mt-1">
                    <BiStar className="fill-primary text-primary" size={12} />
                    <span className="text-[10px] text-slate-400 font-medium">{card.rating} • {card.reviews} Reviews</span>
                </div>
            </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
            {card.description}
        </p>
    </div>
);

const FoodCardSkeleton = () => (
    <div className="bg-white p-4 rounded-3xl border border-slate-100 animate-pulse">
        <div className="flex gap-4 mb-4">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl" />

            <div className="flex-1 space-y-1">
                <div className="h-3 w-3/4 bg-slate-200 rounded" />
                <div className="h-5 w-1/2 bg-slate-200 rounded" />
                <div className="h-3 w-2/3 bg-slate-200 rounded" />
                <div className="h-3 w-2/3 bg-slate-200 rounded" />
            </div>
        </div>

        <div className="space-y-2">
            <div className="h-2 w-full bg-slate-200 rounded" />
            <div className="h-2 w-5/6 bg-slate-200 rounded" />
        </div>
    </div>
);

export default function DashboardPage() {
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
        <div className="space-y-10">
            {/* Category Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Category</h2>
                    {/* <button className="text-primary text-sm font-semibold flex items-center gap-1">View all <BiChevronRight /></button> */}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {['🧁 Bakery', '🍔 Burger', '🥤 Beverage', '🍗 Chicken', '🍕 Pizza'].map(cat => (
                        <CategoryCard key={cat} name={cat.split(' ')[1]} emoji={cat.split(' ')[0]} />
                    ))}
                </div>
            </section>

            {/* Popular Section - Responsive Grid */}
            <section>
                <h2 className="text-xl font-bold mb-6">Popular This Week</h2>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <FoodCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {dishes.map(dish => (
                            <FoodCard key={dish.id} card={dish} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}