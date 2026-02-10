import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Dynamically import all gallery images
const galleryModules = import.meta.glob("@/assets/gallery/*.jpg", { eager: true });
const galleryImages = Object.values(galleryModules).map((mod) => (mod as { default: string }).default);

interface BackgroundSlideshowProps {
    className?: string;
    overlayOpacity?: number; // Optional overlay opacity override
}

const BackgroundSlideshow = ({ className, overlayOpacity = 0.9 }: BackgroundSlideshowProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.min(galleryImages.length, 10));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cn("absolute inset-0 z-[-1] overflow-hidden", className)}>
            <div
                className="absolute inset-0 bg-background z-10 transition-opacity duration-300"
                style={{ opacity: overlayOpacity }}
            />
            {galleryImages.slice(0, 10).map((src, index) => (
                <div
                    key={src}
                    className={cn(
                        "absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out",
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    )}
                    style={{ backgroundImage: `url(${src})` }}
                />
            ))}
        </div>
    );
};

export default BackgroundSlideshow;
