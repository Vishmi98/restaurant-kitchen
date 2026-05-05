export type LoginFormType = {
    email: string;
    password: string;
}

export type LoginResponseType = {
    success: boolean;
    message?: string;
    token?: string
}

export type LoginResponseDataType = {
    success: boolean;
    message: string;
    data: { token: string, isVerify: boolean }
}

export type RegisterFormType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}

export type RegisterResponseType = {
    success: boolean;
    message: string;
    email: string;
}

export type RegisterResponseDataType = {
    success: boolean;
    message: string;
    data: { email: string }
}

export type VerifyEmailTypes = {
    code: string;
}

export type VerifyDataType = {
    email: string;
    code: string;
}

export type PasswordResetFormType = {
    email: string;
    firstName: string;
    role: string;
}

export type ResetPasswordResponseType = {
    success: boolean;
    message: string;
}

export type StaffDataType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    isVerify: boolean;
    role: string;
}

export type StaffResponseDataType = {
    success: boolean;
    message: string;
    staffs: StaffDataType[];
}

export type StaffResponseType = {
    success: boolean;
    message: string;
    data: {
        staffs: StaffDataType[];
    }
}