import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How does Agent14 work?',
    answer: 'Agent14 uses advanced AI to understand your reservation requests in natural language. Simply tell our chatbot what you need—whether it\'s booking a new table, changing an existing reservation, or cancelling—and it handles everything instantly.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account is required to use Agent14. Just start chatting and make your reservation. However, creating an account allows you to save your preferences and view your reservation history.',
  },
  {
    question: 'Is Agent14 free to use?',
    answer: 'Yes, Agent14 is completely free for diners. We partner with restaurants who pay a small fee for each successful reservation.',
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
    <section id="faq" className="py-20 md:py-28 px-6 bg-card/30">
      <div className="container mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Agent14
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
