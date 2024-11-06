import React from 'react';
import { ProductRatings } from './ProductRatings';

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
        <>
            <div>
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 font-josefin_sans">{title}</h1>

                {/* Rating and Review Count */}
                <div className="flex items-center space-x-2 mt-2">
                    <ProductRatings rating={rating} />
                    <span className="text-sm text-gray-800">
                        ({reviewCount.toLocaleString()})
                    </span>
                </div>

                {/* Prices */}
                <div className="flex items-baseline space-x-2 mt-6">
                    <span className="text-gray-500 line-through text-base">{originalPrice}</span>
                    {discountedPrice && <span className="text-xl font-semibold text-gray-900">{discountedPrice}</span>}
                </div>

                {/* Discount Tags */}
                {discounts && <div className="flex space-x-2 mt-3">
                    {discounts.map((discount, index) => (
                        <span
                            key={index}
                            className="bg-green-100 text-green-700 text-sm font-medium px-2 py-1 rounded-md"
                        >
                            {discount.label}
                        </span>
                    ))}
                </div>}

            </div>
            <div className='mt-9'>
                {/* whatsIncluded */}
                <p className="text-gray-700 text-sm">{whatsIncluded}</p>
            </div>
        </>
    );
};

export default ProductInfo;
