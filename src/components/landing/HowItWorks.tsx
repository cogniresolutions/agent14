import { MessageCircle, Calendar, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'Chat with AI',
    description: 'Click the chat button and tell our AI what you need—a new booking, modification, or cancellation.',
  },
  {
    icon: Calendar,
    step: '02',
    title: 'Confirm Details',
    description: 'Review and confirm your reservation details. Our AI handles all the restaurant coordination.',
  },
  {
    icon: CheckCircle,
    step: '03',
    title: 'Get Confirmation',
    description: 'Receive an instant email confirmation with your complete reservation details.',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Three simple steps to your perfect dining experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.step} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border" />
              )}
              <div className="relative z-10 w-24 h-24 rounded-full bg-secondary border-4 border-background flex items-center justify-center mx-auto mb-6 shadow-soft">
                <step.icon className="w-10 h-10 text-foreground" />
              </div>
              <span className="text-sm font-bold text-accent mb-2 block">
                {step.step}
              </span>
              <h3 className="font-semibold text-xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
