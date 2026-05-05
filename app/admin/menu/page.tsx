"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

import Dishes from '@/modules/dish/ui/Dishes'
import { getCookieUser } from '@/utils/cookie.util';


const MenuPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    return (
        <Dishes />
    )
}

export default MenuPage