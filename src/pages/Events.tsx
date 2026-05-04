import { useState } from "react";
import { CalendarDays, MapPin, X, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";
import ScrollReveal from "@/components/ScrollReveal";

const events = [
  { 
    title: "NYC Premiere — 'Love Story'", 
    date: "February 2, 2026", 
    location: "Lincoln Center, New York, NY", 
    description: "An unforgettable evening at the official premiere of the FX biographic drama series 'Love Story.' Special thank you to Noah's best friend Arnold Fabian for his unwavering support during this career-defining event.", 
    tickets: false,
    passed: true 
  },
  { 
    title: "VIP Meet-and-Greet", 
    date: "March 15, 2026", 
    location: "LA Film Festival, Los Angeles, CA", 
    description: "Thank you to everyone who joined us for this exclusive, intimate meet-and-greet with Noah! It was an incredible experience with photo opportunities and signed memorabilia for our fan club members. We truly appreciate everyone who came out and made it possible.", 
    tickets: false,
    passed: true 
  },
  { 
    title: "Sneak Peek: 'Deep Water'", 
    date: "April 10, 2026", 
    location: "Online Exclusive (Fan Club)", 
    description: "Thank you to all fan club members who tuned in for the exclusive first look at Noah's upcoming independent film 'Deep Water.' The teaser trailer received an incredible response and we're thrilled by the excitement surrounding this project.", 
    tickets: false,
    passed: true 
  },
  { 
    title: "Private Screening — 'Mercy'", 
    date: "April 22, 2026", 
    location: "AMC Theatre, New York, NY", 
    description: "Thank you to everyone who attended the exclusive private screening of 'Mercy' at AMC Theatre in New York. The live Q&A session with Noah was a memorable evening, and we're grateful to all the fan club members who made it so special.", 
    tickets: false,
    passed: true 
  },
  { 
    title: "Fan Club Appreciation Night", 
    date: "May 10, 2026", 
    location: "The Hollywood Roosevelt, Los Angeles, CA", 
    description: "A night dedicated to Noah's most loyal fans. Enjoy cocktails, live entertainment, and special announcements about upcoming projects.", 
    tickets: true,
    cancelled: true
  },
  { 
    title: "Charity Gala for Ocean Conservation", 
    date: "May 15, 2026", 
    location: "The Pierre, New York, NY", 
    description: "Join Noah for a prestigious evening dedicated to protecting our shorelines. Featuring a silent auction, keynote addresses from leading environmentalists, and a special video presentation by Noah. All proceeds support coastal restoration projects.", 
    tickets: true,
    cancelled: true
  },
  { title: "Comic-Con Panel", date: "July 18, 2026", location: "San Diego Convention Center, San Diego, CA", description: "Noah joins the 'Mercy' cast for a Comic-Con panel discussion. Expect exclusive reveals, behind-the-scenes footage, and audience Q&A.", tickets: false },
  { title: "Charity Gala", date: "September 5, 2026", location: "Beverly Hilton, Beverly Hills, CA", description: "Noah hosts a charity gala benefiting youth sports programs. The evening includes a dinner, live auction of memorabilia, and special performances.", tickets: true },
];

const CancellationModal = ({ event, onClose }: { event: { title: string; date: string }; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    onClick={onClose}
  >
    <div
      className="relative bg-card border border-red-500/30 rounded-2xl shadow-2xl max-w-md w-full p-8"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Icon */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 mx-auto mb-6">
        <AlertTriangle className="h-7 w-7 text-red-400" />
      </div>

      {/* Heading */}
      <h3 className="font-serif text-2xl font-bold text-center mb-1">Event Cancelled</h3>
      <p className="text-primary text-sm font-medium text-center mb-6 uppercase tracking-widest">{event.title}</p>

      {/* Body */}
      <div className="space-y-4 text-muted-foreground text-sm leading-relaxed text-center">
        <p>
          We sincerely apologise for any inconvenience caused. Due to <strong className="text-foreground">mixed-up scheduling conflicts</strong>, we have had to cancel the <strong className="text-foreground">{event.title}</strong> scheduled for <strong className="text-foreground">{event.date}</strong>.
        </p>
        <p>
          We deeply value your enthusiasm and support. This event <strong className="text-foreground">will be rescheduled</strong> for a later date, and updated details will be announced as soon as they are confirmed.
        </p>
        <p>
          All ticket holders have already been <strong className="text-foreground">directly contacted</strong> and <strong className="text-foreground">fully refunded</strong>. We are truly sorry for the disruption and look forward to celebrating with you at a future date.
        </p>
        <p className="text-xs text-muted-foreground/70 pt-2">
          — Noah Fearnley Management Team
        </p>
      </div>

      <Button
        className="w-full mt-8"
        variant="outline"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  </div>
);

const Events = () => {
  useSEO({
    title: "Noah Fearnley Events – Meet-and-Greets, Screenings & Appearances",
    description: "Find upcoming Noah Fearnley events, including VIP meet-and-greets, private screenings, and special fan appearances."
  });

  const navigate = useNavigate();
  const [cancelledModal, setCancelledModal] = useState<{ title: string; date: string } | null>(null);

  return (
    <>
      {/* Cancellation Modal */}
      {cancelledModal && (
        <CancellationModal event={cancelledModal} onClose={() => setCancelledModal(null)} />
      )}

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Appearances</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Events</h1>
            <p className="text-muted-foreground text-lg">Upcoming appearances, meet-and-greets, and special events.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          {events.map((event, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <Card
                className={`border-border transition-colors ${
                  event.cancelled
                    ? "bg-card/60 border-red-500/20 hover:border-red-500/40 cursor-pointer opacity-80"
                    : "bg-card hover:border-primary/30"
                }`}
                onClick={event.cancelled ? () => setCancelledModal({ title: event.title, date: event.date }) : undefined}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className={`font-serif text-xl md:text-2xl font-semibold ${event.cancelled ? "line-through text-muted-foreground/60" : ""}`}>
                      {event.title}
                    </h2>
                    <div className="flex gap-2 ml-3 shrink-0">
                      {event.cancelled && (
                        <span className="bg-red-500/10 text-red-400 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-red-500/30">
                          Cancelled
                        </span>
                      )}
                      {event.passed && !event.cancelled && (
                        <span className="bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-primary/20">
                          Passed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-primary" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" /> {event.location}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{event.description}</p>

                  {event.cancelled && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-red-400/80 font-medium">
                        Click to read our apology & cancellation notice →
                      </span>
                    </div>
                  )}

                  {event.tickets && !event.cancelled && (
                    <div className="flex flex-col items-start gap-3">
                      <div className="text-xs text-primary font-medium tracking-wide">
                        * Tickets available exclusively for Fan Club members
                      </div>
                      <Button onClick={(e) => { e.stopPropagation(); navigate("/fan-club"); }}>Get Tickets</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Events;
