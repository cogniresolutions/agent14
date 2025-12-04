import { ArrowRight, MessageSquare } from 'lucide-react';
import agentLogo from '@/assets/agent14-logo.png';

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
    <section className="py-20 md:py-28 px-6 bg-primary">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-8 shadow-lg bg-background p-2">
          <img src={agentLogo} alt="Agent14" className="w-full h-full object-cover rounded-lg" />
        </div>
        
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
          Ready to simplify your reservations?
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
          Join thousands of diners who've discovered the easiest way to book restaurants. 
          Start your first reservation in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleOpenChat}
            className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground rounded-lg font-semibold text-lg shadow-lg hover:bg-background/90 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            Try it free
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/20 transition-all border border-primary-foreground/20"
          >
            Learn more
          </a>
        </div>
        
        <p className="mt-8 text-sm text-primary-foreground/60">
          No credit card required • Powered by Salesforce Agentforce
        </p>
      </div>
    </section>
  );
};
