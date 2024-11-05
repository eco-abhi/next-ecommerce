import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import Image from "next/image";

interface ProductImageCarouselProps {
  images: string[];
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle thumbnail click
  const scrollToImage = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <div className="relative w-full max-w-xs">
      {/* Main Carousel */}
      <Carousel className="relative w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className={index === currentIndex ? 'block' : 'hidden'}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="relative w-full h-64">
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Overlayed Navigation Buttons */}
        <div className="absolute bottom-8 right-1/4 transform -translate-x-1/2 flex space-x-4">
          <CarouselPrevious
            onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          />
          <CarouselNext
            onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          />
        </div>
      </Carousel>

      {/* Thumbnail Row */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((image, index) => (
          <button key={index} onClick={() => scrollToImage(index)} className="focus:outline-none">
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-12 h-12 object-cover rounded-md border-2 ${currentIndex === index ? 'border-gray-800' : 'border-transparent'
                }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
