"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { useState } from "react";

interface ItemImageGalleryProps {
    images: string[];
    alt: string;
}

export default function ItemImageGallery({ images, alt }: ItemImageGalleryProps) {
    const [open, setOpen] = useState(false);
    const [activeImg, setActiveImg] = useState<string | null>(null);

    const handleImageClick = (img: string) => {
        setActiveImg(img);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setActiveImg(null);
    };

    return (
        <>
            <div className="relative w-full aspect-[4/3] bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
                {images && images.length > 0 ? (
                    <Carousel className="w-full h-full">
                        <CarouselContent>
                            {images.map((img, idx) => (
                                <CarouselItem key={img + idx} className="flex items-center justify-center w-full h-full">
                                    <div
                                        className="relative w-full h-60 sm:h-80 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden cursor-zoom-in"
                                        onClick={() => handleImageClick(img)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label="View image in detail"
                                    >
                                        <Image
                                            src={img}
                                            alt={alt}
                                            width={400}
                                            height={300}
                                            className="object-contain w-full h-full"
                                            priority={idx === 0}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                    </Carousel>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
                        No Image
                    </div>
                )}
            </div>
            {open && activeImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    onClick={handleClose}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-2 max-w-3xl w-full flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-2xl font-bold text-zinc-700 dark:text-zinc-200 hover:text-red-500"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <Image
                            src={activeImg}
                            alt={alt}
                            width={1200}
                            height={900}
                            className="object-contain w-full max-h-[80vh] rounded"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
