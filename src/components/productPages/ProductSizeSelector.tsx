import React, { useState } from 'react';

interface ProductSizeOption {
    label: string;
}

interface ProductSizeSelectorProps {
    sizeGuideModalChild?: React.ReactNode;
    sizes: ProductSizeOption[];
    onSizeSelect?: (size: string) => void;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({ sizes, onSizeSelect, sizeGuideModalChild }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
        if (onSizeSelect) onSizeSelect(size);
    };

    return (
        <div className="space-y-4 w-4/5">
            {/* Title and Selected Size */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-normal">Size:</span>
                    <span className="text-base font-normal text-gray-700">
                        {selectedSize || 'Select a size'}
                    </span>
                </div>
                {sizeGuideModalChild}
            </div>

            {/* Size Options */}
            <div className="grid grid-cols-3 gap-2 mt-2 w-full">
                {sizes.map((sizeOption, index) => (
                    <button
                        key={index}
                        onClick={() => handleSizeClick(sizeOption.label)}
                        className={`text-nowrap px-4 py-2 border transition font-medium text-gray-800 ${selectedSize === sizeOption.label
                            ? 'bg-[#111827] text-white'
                            : 'border-gray-400 hover:bg-gray-300'
                            }`}
                    >
                        {sizeOption.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductSizeSelector;
