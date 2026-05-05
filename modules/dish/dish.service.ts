import { URL } from "@/constants/config";
import { DishDataType, DishesResponseDataType, DishesResponseType, DishResponseDataType, DishResponseType } from "./dish.types";

import apiCall from "@/services/api.services";


export const getDishes = async (): Promise<DishesResponseDataType> => {
    const response: DishesResponseType = await apiCall({
        url: `${URL}/dish/get-all`,
        method: 'POST',
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        dishes: data.dishes || [],
    };
};

export const getDishByName = async (props: { name: string }): Promise<DishResponseType> => {
    const { name } = props;

    const response: DishResponseDataType = await apiCall({
        url: `${URL}/dish/get-by-name`,
        method: 'POST',
        body: { name },
    })

    return ({
        success: response.success,
        message: response.message,
        dish: response.data || null
    });
};

export async function fetchDish(name: string): Promise<DishDataType | null> {
    try {
        const res = await getDishByName({ name });
        if (!res.success || !res.dish) {
            return null;
        }
        return res.dish;
    } catch (error) {
        console.error("Error fetching dish data:", error);
        return null;
    }
}