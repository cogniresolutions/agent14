import { CalendarCheck, Clock, Mail, MessageSquare, RefreshCw, Shield } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Conversational Booking',
    description: 'Simply chat with our AI to make reservations. Natural language, instant results.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Modifications',
    description: 'Change date, time, or party size through a quick conversation with our agent.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Book anytime, anywhere. Our AI concierge never sleeps.',
  },
  {
    icon: Mail,
    title: 'Email Confirmations',
    description: 'Receive instant confirmation emails with all your reservation details.',
  },
  {
    icon: CalendarCheck,
    title: 'Smart Scheduling',
    description: 'Get intelligent suggestions based on availability and your preferences.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your information is protected with enterprise-grade security.',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Our intelligent reservation system handles the complexity so you can focus on enjoying your meal.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-elevated transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <feature.icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
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
