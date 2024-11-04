'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import ImageCarouselSkeleton from "./ImageCarouselSkeleton";
import useLoadingStatus from "@/hooks/useLoadingStatus";

const ImageCarousel: React.FC<CarouselProps> = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isLoading, setIsLoading] = useLoadingStatus(data, 'array');

    useEffect(() => {
        if (data.length <= 1) return; // Don't set interval if only one or no images

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === data.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [data.length]);


    if (isLoading || data.length === 0) {
        return <ImageCarouselSkeleton />;
    }

    return (
        <div className="relative w-full h-[400px] tablet:h-[600px] lg:h-[800px] overflow-hidden">
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    aria-hidden={index !== currentIndex}
                >
                    <Image
                        src={item.data.image!}
                        alt={item.data.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        style={{ objectFit: "cover" }}
                        priority={index === 0}
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4 md:p-8 font-josefin_sans">
                        <div>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold">
                                {item.data.title}
                            </h2>
                            {item.data.subtitle && (
                                <p className="text-md md:text-lg lg:text-xl text-white mt-2">
                                    {item.data.subtitle}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => console.log("Button clicked")}
                            className="
                            absolute bottom-1/3 left-1/2 -translate-x-1/2
                            px-10 py-4 
                            text-black font-semibold 
                            bg-white 
                            border-t border-b border-gray-300 
                            hover:bg-gray-200 hover:shadow-lg
                            transition-transform transform hover:scale-105 duration-300
                            shadow-md
                        "
                        >
                            SHOP NOW
                        </button>
                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            {data.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {data.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"
                                }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentIndex}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;

