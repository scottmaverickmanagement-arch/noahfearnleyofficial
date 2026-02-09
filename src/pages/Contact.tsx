import { useState } from "react";
import { Mail, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder
  };

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Get in Touch</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Contact</h1>
            <p className="text-muted-foreground text-lg">For inquiries, collaborations, or just to say hello.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="c-name" className="text-sm font-medium mb-1.5 block">Name</label>
                  <Input id="c-name" placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required className="bg-card" />
                </div>
                <div>
                  <label htmlFor="c-email" className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input id="c-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required className="bg-card" />
                </div>
                <div>
                  <label htmlFor="c-subject" className="text-sm font-medium mb-1.5 block">Subject</label>
                  <Input id="c-subject" placeholder="Subject" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} required className="bg-card" />
                </div>
                <div>
                  <label htmlFor="c-message" className="text-sm font-medium mb-1.5 block">Message</label>
                  <Textarea id="c-message" placeholder="Your message..." rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required className="bg-card" />
                </div>
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Management & Press</h3>
                  <a href="mailto:management@noahfearnley.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    management@noahfearnley.com
                  </a>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Follow Noah</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                      { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                      { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                      { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
                    ].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <s.icon className="h-4 w-4" /> {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
