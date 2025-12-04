import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How does Agent14 work?',
    answer: 'Agent14 uses advanced AI powered by Salesforce Agentforce to understand your reservation requests in natural language. Simply tell our chatbot what you need—whether it\'s booking a new table, changing an existing reservation, or cancelling—and it handles everything instantly.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account is required to use Agent14. Just start chatting and make your reservation. However, creating an account allows you to save your preferences and view your reservation history.',
  },
  {
    question: 'Is Agent14 free to use?',
    answer: 'Yes, Agent14 is completely free for diners. We partner with restaurants who benefit from our AI-powered reservation system.',
  },
  {
    question: 'Which restaurants are available?',
    answer: 'We\'re continuously adding new restaurant partners. Our AI can help you find available tables at partner restaurants in your area. Just tell us your preferences and we\'ll show you what\'s available.',
  },
  {
    question: 'Can I modify or cancel my reservation?',
    answer: 'Absolutely! Just chat with Agent14 and say you want to modify or cancel your reservation. The AI will guide you through the process and confirm the changes instantly.',
  },
  {
    question: 'How far in advance can I book?',
    answer: 'Booking windows vary by restaurant, but most allow reservations up to 30 days in advance. Some high-demand restaurants may have longer or shorter windows.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 px-6 bg-muted/50">
      <div className="container mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Agent14
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openIndex === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
