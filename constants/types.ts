import { Method } from "axios";

export type UserStoreUserType = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    isVerify: boolean;
    role: string
}

export type ApiCallOptions = {
    url: string;
    method?: Method; // GET, POST, PUT, etc.
    body?: Record<string, any>;
    params?: Record<string, any>;
    isAuth?: boolean;
}

export interface CommonButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string; // Optional: Tailwind class like 'bg-blue-500'
    textColor?: string;       // Optional: Tailwind class like 'text-white'
    shadowColor?: string;
    className?: string;       // For custom container styles
    textClassName?: string;   // For custom text styles
    disabled?: boolean;
    loading?: boolean;
}
