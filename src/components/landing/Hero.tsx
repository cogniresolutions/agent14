import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero = ({ onOpenChat }: HeroProps) => {
  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent-foreground animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            AI-Powered Reservation System
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-normal leading-tight text-foreground animate-slide-up text-balance">
            Effortless Dining
            <br />
            <span className="italic text-muted-foreground">Reservations</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up text-balance" style={{ animationDelay: '100ms' }}>
            Book, modify, or cancel your restaurant reservations instantly through our intelligent AI concierge. No calls, no waiting—just seamless dining experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <button
              onClick={onOpenChat}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base shadow-elevated hover:shadow-chat transition-all duration-300 hover:scale-105"
            >
              Start Reservation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-sm text-muted-foreground">
              No account required
            </span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
};
