import React, { useState } from 'react';

interface ProductSizeOption {
    label: string;
}

interface ProductSizeSelectorProps {
    sizes: ProductSizeOption[];
    onSizeSelect?: (size: string) => void;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({ sizes, onSizeSelect }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
        if (onSizeSelect) onSizeSelect(size);
    };

    return (
        <div className="space-y-2">
            {/* Title and Selected Size */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">Size</span>
                    <span className="text-lg font-semibold text-gray-800">
                        {selectedSize || 'Select a size'}
                    </span>
                </div>
                <a href="#" className="text-sm text-gray-600 underline hover:text-gray-800">
                    Size Guide
                </a>
            </div>

            {/* Size Options */}
            <div className="grid grid-cols-3 gap-8 mt-2">
                {sizes.map((sizeOption, index) => (
                    <button
                        key={index}
                        onClick={() => handleSizeClick(sizeOption.label)}
                        className={`px-4 py-2 border transition font-medium text-gray-800 ${selectedSize === sizeOption.label
                            ? 'bg-gray-800 text-white'
                            : 'border-gray-400 hover:border-gray-800'
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
