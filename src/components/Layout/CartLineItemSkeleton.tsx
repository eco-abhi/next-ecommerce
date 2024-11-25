import React from 'react'

export const CartLineItemSkeleton = () => {
    return (
        <div className="group animate-pulse">
            <div className="flex items-start gap-6 py-6 px-4 rounded-xl">
                {/* Image Skeleton */}
                <div className="relative aspect-square h-24 w-24 min-w-24 overflow-hidden rounded-xl bg-gray-200" />

                <div className="flex flex-1 flex-col">
                    {/* Product Name and Details Skeleton */}
                    <div className="flex items-start justify-between gap-2">
                        <div className="space-y-3">
                            {/* Product Name */}
                            <div className="h-5 w-40 bg-gray-200 rounded-md" />

                            {/* Size and Color */}
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded-md" />
                                <div className="h-4 w-28 bg-gray-200 rounded-md" />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-20 bg-gray-200 rounded-md" />
                            </div>
                        </div>
                    </div>

                    {/* Quantity and Remove Button */}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Quantity Label */}
                            <div className="h-4 w-16 bg-gray-200 rounded-md" />
                            {/* Quantity Select */}
                            <div className="h-8 w-16 bg-gray-200 rounded-lg" />
                        </div>

                        {/* Remove Button */}
                        <div className="h-4 w-16 bg-gray-200 rounded-md" />
                    </div>
                </div>
            </div>
            <div className="h-px w-full bg-gray-100" />
        </div>
    )
}
