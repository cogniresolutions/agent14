import { ArrowRight, MessageSquare } from 'lucide-react';

declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      utilAPI?: {
        launchChat: () => void;
      };
    };
  }
}

export const CTA = () => {
  const handleOpenChat = () => {
    if (window.embeddedservice_bootstrap?.utilAPI?.launchChat) {
      window.embeddedservice_bootstrap.utilAPI.launchChat();
    }
  };

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-border p-8 md:p-12 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Simplify Your Reservations?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join thousands of diners who've discovered the easiest way to book restaurants. 
              Start your first reservation in seconds.
            </p>
            <button
              onClick={handleOpenChat}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              Start Booking Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
