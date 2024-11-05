import React, { useState } from 'react';

interface ColorOption {
    name: string;
    color: string; // Can be a color code or a pattern
}

interface ProductColorSelectorProps {
    colors: ColorOption[];
}

const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({ colors }) => {
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

    return (
        <div className="space-y-2">
            {/* Title and Selected Color */}
            <div className="flex items-center space-x-2">
                <span className="text-lg font-normal">Color</span>
                <span className="text-lg font-bold text-gray-800">
                    {selectedColor ? selectedColor.name : 'Select a color'}
                </span>
            </div>

            {/* Color Options */}
            <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((colorOption, index) => (
                    <button
                        key={index}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center focus:outline-none transition ${selectedColor?.name === colorOption.name
                            ? 'border-gray-800'
                            : 'border-gray-300'
                            }`}
                        onClick={() => setSelectedColor(colorOption)}
                    >
                        <div
                            className="w-8 h-8 rounded-full"
                            style={{
                                backgroundColor: colorOption.color.includes('url') ? 'transparent' : colorOption.color,
                                backgroundImage: colorOption.color.includes('url') ? colorOption.color : 'none',
                                backgroundSize: 'cover',
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductColorSelector;
