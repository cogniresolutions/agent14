import { MessageSquare, Calendar, Clock, Shield, Zap, Globe, Bell, CreditCard } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Language',
    description: 'Just type or speak naturally. No complex forms or menus to navigate.',
  },
  {
    icon: Calendar,
    title: 'Instant Booking',
    description: 'Reserve your table in seconds with real-time availability.',
  },
  {
    icon: Clock,
    title: 'Easy Changes',
    description: 'Modify date, time, or party size with a simple message.',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Get timely notifications so you never miss a reservation.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared with third parties.',
  },
  {
    icon: Globe,
    title: 'Always Available',
    description: 'Book anytime, anywhere. Our AI concierge never sleeps.',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 px-6 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Agent14
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Experience the future of restaurant reservations
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
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
