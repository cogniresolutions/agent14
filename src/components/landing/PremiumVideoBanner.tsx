import { Video, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PremiumVideoBanner = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-6 relative">
        <Link 
          to="/premiumvideo"
          className="group block max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            {/* Gold accent border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-accent/30 group-hover:border-accent/50 transition-colors" />
            
            {/* Floating sparkles */}
            <div className="absolute top-4 right-4 text-accent animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute bottom-4 left-4 text-accent/60 animate-pulse delay-300">
              <Sparkles className="w-4 h-4" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/30 group-hover:bg-accent/30 transition-colors">
                  <Video className="w-10 h-10 text-accent" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                    Premium Video Reservations
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent text-accent-foreground uppercase tracking-wider animate-pulse">
                    Beta
                  </span>
                </div>
                <p className="text-primary-foreground/80 text-base md:text-lg mb-4 max-w-xl">
                  Experience the future of dining reservations with our AI Video Concierge. 
                  Face-to-face assistance powered by Salesforce Agentforce.
                </p>
                <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                  <span>Try Video Concierge</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            {/* Corner accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
          </div>
        </Link>
      </div>
    </section>
  );
};
