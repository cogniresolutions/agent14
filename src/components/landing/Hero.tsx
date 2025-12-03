import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import agentLogo from '@/assets/agent14-logo.png';

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero = ({ onOpenChat }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary animate-fade-in">
            <Zap className="w-4 h-4" />
            AI-Powered Reservation System
          </div>
          
          {/* Logo showcase */}
          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl overflow-hidden ring-2 ring-primary/40 shadow-cyber animate-glow">
                <img src={agentLogo} alt="Agent14" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-foreground animate-slide-up text-balance" style={{ animationDelay: '200ms' }}>
            Your AI Dining
            <br />
            <span className="text-primary glow-text">Concierge</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up text-balance" style={{ animationDelay: '300ms' }}>
            Book, modify, or cancel restaurant reservations instantly through our intelligent AI agent. No calls, no waiting—just seamless dining experiences.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <button
              onClick={onOpenChat}
              className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base shadow-glow hover:shadow-cyber transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Start Reservation</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-cyber-glow to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse-soft" />
              No account required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
