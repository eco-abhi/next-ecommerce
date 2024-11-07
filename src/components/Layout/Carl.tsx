// types.ts
export interface CarouselItem {
    id: number;
    bgColor: string;
    pattern: string;
    imagePath?: string;
}

// components/InfiniteCarousel/InfiniteCarousel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InfiniteCarouselProps {
    items: CarouselItem[];
    className?: string;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
    items: originalItems,
    className = '',
}) => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef(0);
    const currentTranslateRef = useRef(0);
    const animationRef = useRef<number>();

    // Create array with cloned items for infinite effect
    const items = [
        originalItems[originalItems.length - 1],
        ...originalItems,
        originalItems[0],
    ];

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (isTransitioning) return;

        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.pageX;
        dragStartRef.current = clientX;
        currentTranslateRef.current = -activeIndex * 100;

        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grabbing';
            carouselRef.current.style.transition = 'none';
        }

        startAnimation();
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || isTransitioning) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.pageX;
        const dragDistance = clientX - dragStartRef.current;
        const dragPercentage = (dragDistance / (carouselRef.current?.offsetWidth ?? 1)) * 100;
        currentTranslateRef.current = -activeIndex * 100 + dragPercentage;
    };

    const handleDragEnd = () => {
        if (!isDragging || isTransitioning) return;

        setIsDragging(false);
        cancelAnimation();

        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grab';
            carouselRef.current.style.transition = 'transform 0.3s ease-out';
        }

        const draggedPercentage = currentTranslateRef.current + activeIndex * 100;
        const threshold = 20; // 20% drag threshold

        if (Math.abs(draggedPercentage) > threshold) {
            if (draggedPercentage > 0) {
                handlePrev();
            } else {
                handleNext();
            }
        } else {
            // Snap back to current position
            snapToSlide(activeIndex);
        }
    };

    const startAnimation = () => {
        if (!carouselRef.current) return;

        const animate = () => {
            if (carouselRef.current) {
                carouselRef.current.style.transform = `translateX(${currentTranslateRef.current}%)`;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
    };

    const cancelAnimation = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const snapToSlide = (index: number) => {
        if (!carouselRef.current) return;

        setIsTransitioning(true);
        setActiveIndex(index);
        carouselRef.current.style.transform = `translateX(${-index * 100}%)`;

        setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
    };

    const handleNext = () => {
        if (isTransitioning) return;

        const newIndex = activeIndex + 1;
        snapToSlide(newIndex);

        if (newIndex === items.length - 1) {
            // Reset to first real slide after animation
            setTimeout(() => {
                if (carouselRef.current) {
                    carouselRef.current.style.transition = 'none';
                    snapToSlide(1);
                    setTimeout(() => {
                        if (carouselRef.current) {
                            carouselRef.current.style.transition = 'transform 0.3s ease-out';
                        }
                    }, 10);
                }
            }, 300);
        }
    };

    const handlePrev = () => {
        if (isTransitioning) return;

        const newIndex = activeIndex - 1;
        snapToSlide(newIndex);

        if (newIndex === 0) {
            // Reset to last real slide after animation
            setTimeout(() => {
                if (carouselRef.current) {
                    carouselRef.current.style.transition = 'none';
                    snapToSlide(items.length - 2);
                    setTimeout(() => {
                        if (carouselRef.current) {
                            carouselRef.current.style.transition = 'transform 0.3s ease-out';
                        }
                    }, 10);
                }
            }, 300);
        }
    };

    useEffect(() => {
        // Initialize carousel
        if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.3s ease-out';
            snapToSlide(1);
        }

        return () => {
            cancelAnimation();
        };
    }, []);

    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            <div
                ref={carouselRef}
                className="flex cursor-grab touch-pan-y"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {items.map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className={`flex-shrink-0 w-full h-96 relative ${item.bgColor}`}
                        style={{ width: '100%' }}
                    >
                        {item.imagePath ? (
                            <img
                                src={item.imagePath}
                                alt={`Slide ${item.id}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 rounded-full" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full 
                     shadow-lg hover:bg-white transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full 
                     shadow-lg hover:bg-white transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {originalItems.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors 
                         ${index + 1 === activeIndex ? 'bg-white' : 'bg-white/50'}`}
                        onClick={() => snapToSlide(index + 1)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default InfiniteCarousel;