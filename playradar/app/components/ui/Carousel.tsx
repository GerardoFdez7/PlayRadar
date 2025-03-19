import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import placeholder from "@/assets/placeholder.png";
import Image from "next/image";
import Thumb from "@/components/ui/Thumb";

interface CarouselProps {
  items: Array<{
    id: string;
    type: "image" | "video";
    src: string;
    alt: string;
    preview?: string;
  }>;
  options?: EmblaOptionsType;
  children?: React.ReactNode;
}

const Carousel = (props: CarouselProps) => {
  const { items, options } = props;
  const orderedItems = [...items].sort((a, b) => {
    if (a.type === "video" && b.type !== "video") return -1;
    if (b.type === "video" && a.type !== "video") return 1;
    return 0;
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla m-8">
      <div className="overflow-hidden rounded-lg" ref={emblaMainRef}>
        <div className="flex gap-4">
          {orderedItems.map((item) => (
            <div className="flex-[0_0_100%] min-w-0" key={item.id}>
              <div className="relative mb-6 w-full aspect-video">
                {item.type === "image" ? (
                  <Image
                    src={item.src || placeholder}
                    alt={item.alt}
                    fill
                    className="object-cover transition-opacity rounded-lg"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                ) : (
                  <video
                    className="object-cover transition-opacity w-full h-full rounded-lg"
                    controls
                    src={item.src}
                    aria-label={item.alt}
                    poster={item.preview}
                    preload="metadata"
                    autoPlay
                    muted
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="px-6 lg:px-10 ">
        <div className="overflow-hidden rounded-xl" ref={emblaThumbsRef}>
          <div className="flex gap-3 lg:gap-6">
            {orderedItems.map((item, index) => (
              <Thumb
                key={item.id}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imageSrc={item.preview || item.src}
                altText={item.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
