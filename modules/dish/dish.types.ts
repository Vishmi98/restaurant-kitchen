export type Category = "Appetizers" | "Main Course" | "Sides" | "Desserts" | "Beverages";

export type DishDataType = {
    id: number;
    name: string;
    price: number;
    newPrice?: number;
    imagePath: string;
    imageId: string;
    description: string;
    category: Category;
    tags: string[];
    rating: number;
    reviews: number;
    calories: number;
    prepTime: string;
};

export type CustomerDataType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export type DishesResponseDataType = {
    success: boolean;
    message: string;
    dishes: DishDataType[];
}

export type DishesResponseType = {
    success: boolean;
    message: string;
    data: {
        dishes: DishDataType[];
    }
}

export type DishResponseDataType = {
    success: boolean;
    message: string;
    data: DishDataType;
}

export type DishResponseType = {
    success: boolean;
    message: string;
    dish: DishDataType | null;
}