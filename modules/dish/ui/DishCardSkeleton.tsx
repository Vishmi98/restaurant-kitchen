import React from 'react'

const DishCardSkeleton = () => {
    return (
        <div className="text-white p-2 text-center items-center justify-center shadow-lg">
            {/* Image Circle */}
            <div className="md:w-full h-[200px] w-[200px] mx-auto bg-gray-200 animate-pulse rounded-full text-center" />

            {/* Name Link Area */}
            <div className="h-6 bg-gray-200 animate-pulse rounded mt-4 mb-1 w-full mx-auto" />
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2  w-3/4 mx-auto" />

            {/* Stars Area */}
            <div className="h-3 bg-gray-200 animate-pulse rounded mb-2 w-1/4 mx-auto" />

            {/* Price Area */}
            <div className="h-5 bg-gray-200 animate-pulse rounded w-1/3 mx-auto" />
        </div>
    )
}

export default DishCardSkeleton