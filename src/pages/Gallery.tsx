import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";

const categories = ["All", "On Set", "Personal", "Events"] as const;

const images = [
  { id: 1, category: "On Set", label: "On the set of Mercy" },
  { id: 2, category: "On Set", label: "Vertical drama filming" },
  { id: 3, category: "Personal", label: "1968 Mustang restoration" },
  { id: 4, category: "Events", label: "LA Film Festival" },
  { id: 5, category: "On Set", label: "Behind the scenes – Love Story" },
  { id: 6, category: "Personal", label: "Family moments" },
  { id: 7, category: "Events", label: "Fan meet-and-greet" },
  { id: 8, category: "On Set", label: "Lifetime film set" },
  { id: 9, category: "Personal", label: "Daily workout" },
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
                  className="group relative aspect-square w-full bg-gradient-to-br rounded-lg overflow-hidden cursor-pointer border border-border hover:border-primary/30 transition-colors"
                  style={{}}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground/40 mb-2" />
                    <span className="text-muted-foreground text-xs">{img.label}</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl bg-card border-border">
          {selected && (
            <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted rounded flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">{selected.label}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{selected.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
