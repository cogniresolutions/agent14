import { Calendar, Clock, MessageSquare, Shield, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Chat naturally with our AI agent. No forms, no menus—just tell it what you need.',
  },
  {
    icon: Calendar,
    title: 'Instant Booking',
    description: 'Reserve tables in seconds. Our AI handles availability and confirms instantly.',
  },
  {
    icon: Clock,
    title: 'Easy Modifications',
    description: 'Change date, time, or party size with a simple message. We handle the rest.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared. Book with confidence.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Powered by Salesforce Agentforce for instant, reliable responses.',
  },
  {
    icon: Globe,
    title: '24/7 Available',
    description: 'Book anytime, anywhere. Our AI concierge never sleeps.',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Intelligent Reservations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the future of dining reservations with AI-powered assistance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-500 hover:shadow-cyber animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-500">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
