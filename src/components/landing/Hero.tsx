import { ArrowRight, MessageSquare, Star, Clock, Users } from 'lucide-react';
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

const stats = [
  { icon: Users, value: '50K+', label: 'Happy Diners' },
  { icon: Star, value: '4.9', label: 'User Rating' },
  { icon: Clock, value: '<30s', label: 'Avg. Booking Time' },
];

export const Hero = () => {
  const handleOpenChat = () => {
    if (window.embeddedservice_bootstrap?.utilAPI?.launchChat) {
      window.embeddedservice_bootstrap.utilAPI.launchChat();
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-primary mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            Powered by Salesforce Agentforce
          </div>

          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-slide-up">
            Restaurant Reservations,{' '}
            <span className="text-primary">Reimagined</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up text-balance" style={{ animationDelay: '100ms' }}>
            Book your perfect table in seconds with our AI concierge. No phone calls, 
            no waiting on hold—just tell us what you need.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <button
              onClick={handleOpenChat}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              Start Booking
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-sm text-muted-foreground">
              No account required
            </span>
          </div>

          {/* Demo preview card */}
          <div className="relative max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-elevated">
              <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-primary/20 flex-shrink-0 shadow-md">
                  <img src={agentLogo} alt="Agent14" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground mb-1">Agent14</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hi! I'm your AI dining concierge. I can help you book, modify, or cancel reservations. 
                    What would you like to do today?
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Book a table', 'Change reservation', 'Cancel booking'].map((option) => (
                  <button
                    key={option}
                    onClick={handleOpenChat}
                    className="px-4 py-2.5 text-sm bg-secondary text-secondary-foreground rounded-lg border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
