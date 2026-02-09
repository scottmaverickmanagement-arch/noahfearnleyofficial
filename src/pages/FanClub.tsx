import { useState } from "react";
import { Star, Users, Ticket, Gift, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";

const benefits = [
  { icon: Lock, title: "Exclusive Access", desc: "Members-only content, behind-the-scenes footage, and personal updates directly from Noah." },
  { icon: Users, title: "Meet-and-Greet Events", desc: "Intimate connections through exclusive meet-and-greet events in cities nationwide." },
  { icon: Star, title: "Private Shows", desc: "Access to private screenings, live Q&As, and behind-the-scenes set visits." },
  { icon: Ticket, title: "VIP Treatment", desc: "Front-row seats, backstage passes, and priority access at all regular appearances." },
  { icon: Gift, title: "Auctions & Giveaways", desc: "Signed scripts, props from vertical dramas, modeling portfolio items, and football memorabilia." },
];

const FanClub = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — connect to backend later
  };

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Members Only</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Join the Fan Club</h1>
            <p className="text-muted-foreground text-lg">
              Get exclusive access to Noah's world — from intimate meet-and-greets to signed memorabilia and VIP events.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Card className="bg-card border-border h-full text-center hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <b.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-2">{b.title}</h3>
                    <p className="text-muted-foreground text-sm">{b.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 max-w-md">
          <ScrollReveal>
            <h2 className="font-serif text-3xl font-bold text-center mb-8">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-1.5 block">Full Name</label>
                <Input
                  id="name"
                  placeholder="Noah Fearnley"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium mb-1.5 block">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData((d) => ({ ...d, password: e.target.value }))}
                  required
                  minLength={8}
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Join the Fan Club <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-muted-foreground text-xs text-center">
                By joining, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default FanClub;
