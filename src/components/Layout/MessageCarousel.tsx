import React, { useState, useRef, useEffect } from 'react';
import LeftCaret from "../../../public/left-caret.svg";
import RightCaret from "../../../public/right-caret.svg";

interface MessageCarouselProps {
    messages: string[];
    autoPlayInterval?: number;
}

const MessageCarousel = ({
    messages,
    autoPlayInterval = 5000
}: MessageCarouselProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    // Create a circular array for infinite scrolling
    const getCircularIndex = (index: number) => {
        if (index < 0) return messages.length - 1;
        if (index >= messages.length) return 0;
        return index;
    };

    const moveSlide = (direction: 'left' | 'right') => {
        if (isAnimating) return;

        setDirection(direction);
        setIsAnimating(true);

        setCurrentIndex(prev =>
            direction === 'right'
                ? getCircularIndex(prev + 1)
                : getCircularIndex(prev - 1)
        );

        // Reset animation state
        setTimeout(() => {
            setIsAnimating(false);
        }, 500); // Match this with animation duration
    };

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            moveSlide('right');
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [currentIndex, isAnimating]);

    const getSlideClassName = (index: number) => {
        const baseClasses = "absolute inset-0 flex  w-full h-full items-center justify-center transition-transform duration-500 ease-in-out";

        if (index === currentIndex) {
            return `${baseClasses} translate-x-0`;
        }

        if (direction === 'right') {
            if (index === getCircularIndex(currentIndex - 1)) {
                return `${baseClasses} -translate-x-full`;
            }
            if (index === getCircularIndex(currentIndex + 1)) {
                return `${baseClasses} translate-x-full`;
            }
        } else {
            if (index === getCircularIndex(currentIndex - 1)) {
                return `${baseClasses} -translate-x-full`;
            }
            if (index === getCircularIndex(currentIndex + 1)) {
                return `${baseClasses} translate-x-full`;
            }
        }

        return `${baseClasses} translate-x-full`;
    };

    return (
        <div className="w-full mx-auto font-geograph">
            <div className="relative overflow-hidden w-full h-[30px] bg-transparent items-center justify-center text-center">

                {/* Slides */}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={getSlideClassName(index)}
                    >
                        <div className="w-full h-full flex items-center justify-center text-center">
                            <p className=" text-sm font-medium text-center">
                                {message}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Navigation buttons */}
                <div className="absolute w-7 h-7 left-12 smaller:left-10 tablet:left-48 laptop:left-72 top-1/2 -translate-y-1/2 rounded-full p-2 flex items-center justify-center transition-colors cursor-pointer" onClick={() => moveSlide('left')}>
                    <LeftCaret color='white' className="stroke-primary-nav" style={{ transform: 'translateX(-2px)' }}
                    />
                </div>

                <div className="absolute w-7 h-7 right-12 smaller:right-10 tablet:right-48 laptop:right-72 top-1/2 -translate-y-1/2 rounded-full p-2 flex items-center justify-center transition-colors cursor-pointer" onClick={() => moveSlide('right')}>
                    <RightCaret color='white' className="stroke-primary-nav" style={{ transform: 'translateX(2px)' }} />
                </div>
            </div>
        </div>
    );
};

export default MessageCarousel;