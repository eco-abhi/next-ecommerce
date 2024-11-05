import React from 'react';

interface DiscountTag {
    label: string;
    color: string;
}

interface ProductDetailsProps {
    title: string;
    rating: number;
    reviewCount: number;
    originalPrice: string;
    discountedPrice: string;
    discounts: DiscountTag[];
    whatsIncluded: string;
}

const ProductInfo: React.FC<ProductDetailsProps> = ({
    title,
    rating,
    reviewCount,
    originalPrice,
    discountedPrice,
    discounts,
    whatsIncluded,
}) => {
    return (
        <div className="space-y-2">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

            {/* Rating and Review Count */}
            <div className="flex items-center space-x-2">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`font-josefin_sans text-yellow-500 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <span className="text-sm text-gray-600">({reviewCount.toLocaleString()})</span>
            </div>

            {/* Prices */}
            <div className="flex items-baseline space-x-2">
                <span className="text-gray-500 line-through">{originalPrice}</span>
                <span className="text-2xl font-semibold text-gray-900">{discountedPrice}</span>
            </div>

            {/* Discount Tags */}
            <div className="flex space-x-2">
                {discounts.map((discount, index) => (
                    <span
                        key={index}
                        className="bg-green-100 text-green-700 text-sm font-medium px-2 py-1 rounded-md"
                    >
                        {discount.label}
                    </span>
                ))}
            </div>

            {/* whatsIncluded */}
            <p className="text-gray-700 text-sm mt-2">{whatsIncluded}</p>
        </div>
    );
};

export default ProductInfo;
