import { ArrowRight, Check, Star } from 'lucide-react';
import agentLogo from '@/assets/agent14-logo.png';

declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      utilAPI?: {
        launchChat: () => void;
      };
    };
  }
}

const features = [
  'AI-powered instant bookings',
  'Modify or cancel with a message',
  'No phone calls or waiting',
];

export const Hero = () => {
  const handleOpenChat = () => {
    if (window.embeddedservice_bootstrap?.utilAPI?.launchChat) {
      window.embeddedservice_bootstrap.utilAPI.launchChat();
    }
  };

  return (
    <section className="relative bg-muted overflow-hidden">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              AI reservation system for{' '}
              <span className="text-primary">smart diners</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Book tables instantly, modify reservations effortlessly, and never wait on hold again. 
              Let AI handle your dining plans!
            </p>

            {/* Feature checklist */}
            <ul className="space-y-4 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleOpenChat}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base shadow-lg hover:bg-primary/90 transition-all"
              >
                Try it free
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground rounded-lg font-semibold text-base hover:bg-background transition-all"
              >
                See features
              </a>
            </div>

            {/* Award badge */}
            <p className="text-sm text-muted-foreground">
              Best AI Booking System 2024 - powered by Salesforce Agentforce
            </p>
          </div>

          {/* Right content - Demo card */}
          <div className="relative lg:pl-8">
            {/* Background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full" />
            
            {/* Stats badge */}
            <div className="absolute -top-4 right-0 lg:right-8 bg-accent text-accent-foreground px-4 py-3 rounded-xl shadow-lg z-10">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-xs">Happy diners</div>
            </div>

            {/* Main card */}
            <div className="relative bg-background rounded-2xl shadow-xl border border-border p-6 max-w-md mx-auto">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md bg-slate-900 p-1">
                  <img src={agentLogo} alt="Agent14" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">Agent14</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hi! I'm your AI dining concierge. I can help you book, modify, or cancel reservations. What would you like to do?
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Book a table', 'Change reservation', 'Cancel booking'].map((option) => (
                  <button
                    key={option}
                    onClick={handleOpenChat}
                    className="px-4 py-2 text-sm bg-muted text-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {/* Confirmation popup */}
              <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Reservation confirmed!</p>
                    <p className="text-xs text-muted-foreground">Tonight at 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Rating badge */}
              <div className="absolute -bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
