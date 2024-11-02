// components/CarouselSkeleton.tsx

import React from 'react';

const ImageCarouselSkeleton: React.FC = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden animate-pulse">
            {/* Background image placeholder */}
            <div className="absolute inset-0 bg-gray-300"></div>

            {/* Overlay with title and subtitle placeholders */}
            <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-center p-4 md:p-8 space-y-4">
                <div className="h-8 md:h-10 lg:h-12 w-3/4 md:w-2/3 lg:w-1/2 bg-gray-400 rounded"></div>
                <div className="h-4 md:h-6 lg:h-8 w-2/3 md:w-1/2 lg:w-1/3 bg-gray-400 rounded"></div>
            </div>

            {/* Navigation dots placeholder */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="w-3 h-3 bg-gray-400 rounded-full"
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarouselSkeleton;
