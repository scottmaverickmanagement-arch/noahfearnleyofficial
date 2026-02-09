import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Noah Fearnley</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Rising actor captivating audiences from vertical dramas to Hollywood screens.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-[0.15em] text-xs">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "About", path: "/about" },
                { label: "Filmography", path: "/filmography" },
                { label: "Fan Club", path: "/fan-club" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-[0.15em] text-xs">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-3">Get the latest news and updates.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <Input placeholder="Your email" type="email" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">© 2026 Noah Fearnley. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">Terms of Service</a>
          </div>
          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
