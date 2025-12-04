import { MessageSquare, Calendar, Clock, Shield, Bell, Globe, Smartphone, Zap } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Chat naturally with our AI. No complex forms or confusing menus to navigate.',
  },
  {
    icon: Calendar,
    title: 'Instant Booking',
    description: 'Reserve your table in seconds with real-time availability checking.',
  },
  {
    icon: Clock,
    title: 'Easy Modifications',
    description: 'Change date, time, or party size with a simple message anytime.',
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
    title: '24/7 Available',
    description: 'Book anytime, anywhere. Our AI concierge never sleeps.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Perfect experience on any device - phone, tablet, or desktop.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Powered by Salesforce Agentforce for instant, reliable responses.',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need for effortless dining
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI-powered platform makes restaurant reservations simple, fast, and stress-free
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
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
