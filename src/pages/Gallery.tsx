import { useState, useEffect } from "react";
import { Camera, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

// Dynamically import all gallery images and videos
const videoModules = import.meta.glob("@/assets/videos/*.mp4", { eager: true });
const galleryVideos = Object.values(videoModules).map((mod) => (mod as { default: string }).default);

import BackgroundSlideshow from "@/components/BackgroundSlideshow";

const categories = ["All", "Photos", "Videos"] as const;

const Gallery = () => {
  const [filter, setFilter] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const showPhotos = filter === "All" || filter === "Photos";
  const showVideos = filter === "All" || filter === "Videos";

  return (
    <>
      <div className="fixed inset-0 -z-50">
        <BackgroundSlideshow />
      </div>

      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Portfolio</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Gallery</h1>
            <p className="text-muted-foreground text-lg">
              A collection of moments, projects, and behind-the-scenes footage.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="container mx-auto px-4">

          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className="text-xs uppercase tracking-wider"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Photos Grid */}
          {showPhotos && (
            <div className="mb-16">
              {filter === "All" && <h2 className="text-2xl font-serif font-bold mb-6">Photos</h2>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Dynamically import images again for grid or pass from props? 
                    Better to keep it simple and re-import here or export from component (complicated).
                    Let's re-import locally for now to avoid circular deps or complex state lifting.
                */}
                {Object.values(import.meta.glob("@/assets/gallery/*.jpg", { eager: true })).map((mod) => (mod as { default: string }).default).map((src: string, i: number) => (
                  <ScrollReveal key={i} delay={i % 3 * 0.05}>
                    <button
                      onClick={() => setSelectedImage(src)}
                      className="group relative aspect-square w-full bg-muted rounded-lg overflow-hidden cursor-pointer border border-border hover:border-primary/30 transition-colors"
                    >
                      <img
                        src={src}
                        alt={`Gallery image ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                        <Camera className="h-8 w-8 text-white/80 mb-2" />
                        <span className="text-white text-xs font-medium tracking-wide">View Photo</span>
                      </div>
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* Videos Grid */}
          {showVideos && (
            <div>
              {filter === "All" && <h2 className="text-2xl font-serif font-bold mb-6">Videos</h2>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryVideos.map((src, i) => (
                  <ScrollReveal key={i} delay={i % 3 * 0.05}>
                    <div className="group relative aspect-video w-full bg-black rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-colors">
                      <video
                        src={src}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        muted
                        loop
                        playsInline
                        onMouseOver={(e) => e.currentTarget.play()}
                        onMouseOut={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                        onClick={() => setSelectedVideo(src)}
                      />
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm group-hover:bg-primary/80 transition-colors">
                          <Play className="h-6 w-6 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-transparent border-none p-0 shadow-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <DialogClose className="absolute -top-10 right-0 p-2 bg-black/50 rounded-full hover:bg-white/20 text-white transition-colors">
              <X className="h-6 w-6" />
            </DialogClose>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full screen"
                className="max-w-full max-h-[85vh] rounded-md shadow-2xl object-contain bg-black"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl bg-black border-border p-0 overflow-hidden">
          {selectedVideo && (
            <div className="aspect-video w-full">
              <video
                src={selectedVideo}
                className="w-full h-full"
                controls
                autoPlay
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
