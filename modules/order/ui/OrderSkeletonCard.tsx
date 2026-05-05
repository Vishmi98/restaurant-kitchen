const OrderSkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl shadow p-5 h-[250px] animate-pulse space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>

            <div className="border-t pt-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
        </div>
    );
};

export default OrderSkeletonCard;
