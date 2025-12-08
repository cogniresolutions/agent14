import { MessageCircle, Bot, CheckCircle } from 'lucide-react';
import agentLogo from '@/assets/agent14-logo-new.png';
import { launchChat } from '@/components/chatbot/SalesforceChatbot';

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Start a conversation',
    description: 'Click the chat button and tell our AI what you need: new booking, changes, or cancellation.',
  },
  {
    icon: Bot,
    number: '02',
    title: 'AI handles everything',
    description: 'Agent14 understands your request, checks availability, and coordinates with the restaurant.',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Get instant confirmation',
    description: 'Receive immediate confirmation with all your booking details. Simple as that!',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book your table in 3 simple steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From request to confirmation in under a minute
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="relative inline-flex mb-6">
                <div className="w-24 h-24 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-lg">
                  <step.icon className="w-10 h-10" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
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
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={launchChat}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition-all"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src={agentLogo} alt="Agent14" className="w-full h-full object-cover" />
            </div>
            Start booking now - It's free
          </button>
        </div>
      </div>
    </section>
  );
};
