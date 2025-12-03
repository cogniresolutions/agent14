import { MessageCircle, Bot, CheckCircle, Mail } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'Start a Chat',
    description: 'Click the chat button and tell our AI what you need—new reservation, change, or cancellation.',
  },
  {
    icon: Bot,
    step: '02',
    title: 'AI Processes',
    description: 'Agent14 understands your request and handles everything with the restaurant instantly.',
  },
  {
    icon: CheckCircle,
    step: '03',
    title: 'Instant Confirmation',
    description: 'Receive immediate confirmation in chat with all your booking details.',
  },
  {
    icon: Mail,
    step: '04',
    title: 'Email Receipt',
    description: 'Get a professional confirmation email for your records.',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-card/30 border-y border-border/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Four Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From request to confirmation in under a minute
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-gradient-to-r from-primary/40 to-primary/10" />
              )}
              
              <div className="text-center space-y-4">
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-500">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-glow">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
