"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

import Orders from '@/modules/order/ui/Orders'
import { getCookieUser } from '@/utils/cookie.util';


const FoodOrdersPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    return (
        <Orders />
    )
}

export default FoodOrdersPage