import { MessageCircle, Bot, CheckCircle, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    number: '1',
    title: 'Start a Conversation',
    description: 'Click the chat button and simply tell our AI what you need—new booking, changes, or cancellation.',
  },
  {
    icon: Bot,
    number: '2',
    title: 'AI Handles Everything',
    description: 'Agent14 understands your request, checks availability, and coordinates with the restaurant instantly.',
  },
  {
    icon: CheckCircle,
    number: '3',
    title: 'Get Instant Confirmation',
    description: 'Receive immediate confirmation with all your booking details. It\'s that simple.',
  },
];

declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      utilAPI?: {
        launchChat: () => void;
      };
    };
  }
}

export const HowItWorks = () => {
  const handleOpenChat = () => {
    if (window.embeddedservice_bootstrap?.utilAPI?.launchChat) {
      window.embeddedservice_bootstrap.utilAPI.launchChat();
    }
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to your perfect dining experience
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+48px)] w-[calc(100%-48px)] h-px bg-border" />
              )}
              
              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center shadow-sm">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleOpenChat}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-border rounded-xl text-foreground font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Try It Now — It's Free
          </button>
        </div>
      </div>
    </section>
  );
};
