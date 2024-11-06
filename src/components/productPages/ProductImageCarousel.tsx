import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import EmblaCarousel from 'embla-carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ProductImageCarouselProps {
  images: string[];
}

EmblaCarousel.globalOptions = { loop: true }

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);

  const scrollToImage = (index: number) => {
    setCurrentIndex(index);
    api?.scrollTo(index);
    api
  };


  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    scrollToImage(newIndex);
  };

  useEffect(() => {
    if (!api) return;

    // Set initial index on load
    setCurrentIndex(api.selectedScrollSnap());

    // Listen to carousel's drag and select events
    api.on("select", () => setCurrentIndex(api.selectedScrollSnap()));
    api.on("scroll", () => setCurrentIndex(api.selectedScrollSnap()));

    return () => {
      // Clean up listeners on unmount
      api.off("select", () => setCurrentIndex(api.selectedScrollSnap()));
      api.off("scroll", () => setCurrentIndex(api.selectedScrollSnap()));
    };
  }, [api]);

  return (
    <div className="relative w-full h-full flex">
      <div className="flex flex-col space-y-2 mr-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => scrollToImage(index)}
            className="focus:outline-none"
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={88}  // set the width to match your design, e.g., 64px for w-16
              height={88} // set the height to match your design, e.g., 64px for h-16
              className={`object-cover rounded-md border-2 ${currentIndex === index ? "border-gray-800" : "border-transparent"} min-w-14`}
            />

          </button>
        ))}
      </div>

      <Carousel className="relative w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="relative w-full h-full p-12">
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        className="object-cover min-w-[50px] sm:min-w-[300px] md:min-w-[400px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-8 right-1/4 transform -translate-x-1/2 flex space-x-4">
          <CarouselPrevious onClick={handlePrevious} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" />
          <CarouselNext onClick={handleNext} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" />
        </div>
      </Carousel>
    </div>
  );
}
