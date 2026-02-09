import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";

import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import gallery3 from "@/assets/gallery/gallery-3.jpg";
import gallery4 from "@/assets/gallery/gallery-4.jpg";
import gallery5 from "@/assets/gallery/gallery-5.jpg";
import gallery6 from "@/assets/gallery/gallery-6.jpg";

const categories = ["All", "On Set", "Personal", "Events"] as const;

const images = [
  { id: 1, category: "On Set", label: "Modeling", src: gallery1 },
  { id: 2, category: "On Set", label: "Studio Session", src: gallery2 },
  { id: 3, category: "Personal", label: "Lifestyle", src: gallery3 },
  { id: 4, category: "Events", label: "Headshot", src: gallery4 },
  { id: 5, category: "On Set", label: "Outdoor Shoot", src: gallery5 },
  { id: 6, category: "Personal", label: "Casual", src: gallery6 },
];

const gradients = [
  "from-primary/20 to-secondary",
  "from-secondary to-muted",
  "from-muted to-primary/10",
  "from-primary/10 to-secondary",
  "from-secondary to-primary/20",
  "from-muted to-secondary",
];

const Gallery = () => {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<typeof images[0] | null>(null);

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Photos</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Gallery</h1>
            <p className="text-muted-foreground text-lg">Behind the scenes, on set, and personal moments.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <ScrollReveal key={img.id} delay={i * 0.05}>
                <button
                  onClick={() => setSelected(img)}
                  className="group relative aspect-square w-full bg-muted rounded-lg overflow-hidden cursor-pointer border border-border hover:border-primary/30 transition-colors"
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <Camera className="h-8 w-8 text-white/80 mb-2" />
                    <span className="text-white text-xs font-medium tracking-wide">{img.label}</span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl bg-card border-border">
          {selected && (
            <div className="aspect-[4/3] bg-background rounded overflow-hidden flex items-center justify-center max-h-[80vh]">
              <img
                src={selected.src}
                alt={selected.label}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
