"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { products } from "@wix/stores";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ProductImageCarouselProps {
  imageUrls: products.MediaItem[];
}

export function ProductImageCarousel({ imageUrls }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const scrollToImage = (index: number) => {
    setCurrentIndex(index);
    api?.scrollTo(index);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    scrollToImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % imageUrls.length;
    scrollToImage(newIndex);
  };

  useEffect(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    api.on("select", () => setCurrentIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full max-w-4xl mx-auto border-2">
      {/* Thumbnail Navigation */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] p-2">
        {imageUrls.map((item, index) => (
          <button
            key={item._id}
            onClick={() => scrollToImage(index)}
            className="focus:outline-none flex-shrink-0"
          >
            <Image
              src={item.image?.url || ""}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className={cn(
                "object-cover rounded-md border-2 transition-all duration-200",
                currentIndex === index
                  ? "border-primary shadow-md"
                  : "border-transparent hover:border-gray-300"
              )}
            />
          </button>
        ))}
      </div>

      {/* Main Image Carousel */}
      <div className="relative flex-grow">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {imageUrls.map((item, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="border-none shadow-none">
                  <CardContent className="p-1">
                    <div className="relative aspect-square overflow-hidden group">
                      <Zoom>
                        <Image
                          src={item.image?.url || ""}
                          alt={`Product image ${index + 1}`}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover rounded-lg cursor-zoom-in"
                        />
                      </Zoom>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Controls */}
          <div className="absolute bottom-10 right-10 flex space-x-2 z-10">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </Carousel>
      </div>
    </div>
  );
}