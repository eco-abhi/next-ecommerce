import React, { useState, useEffect } from 'react';

interface ColorOption {
    name: string;
    color: string; // Can be a color code or a pattern
    inStock: boolean;
}

interface ProductColorSelectorProps {
    colors: ColorOption[];
    setSelectedColorOption: (color: ColorOption | null) => void;
}

const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({ colors, setSelectedColorOption }) => {
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

    // Use effect to update selected color only when it changes
    useEffect(() => {
        setSelectedColorOption(selectedColor);
    }, [selectedColor]);

    return (
        <div className="space-y-4 w-4/5">
            {/* Title and Selected Color */}
            <div className="flex items-center space-x-2">
                <span className="text-lg font-normal">Color: </span>
                <span className="text-base font-normal text-gray-700">
                    {selectedColor ? selectedColor.name : 'Select a color'}
                </span>
            </div>

            {/* Color Options */}
            <div className="flex flex-wrap gap-2">
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
