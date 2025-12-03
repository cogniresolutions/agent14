import { UtensilsCrossed } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="py-16 px-6 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-medium">
              TableFlow
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-primary-foreground/70">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms
            </a>
            <a href="mailto:support@tableflow.com" className="hover:text-primary-foreground transition-colors">
              support@tableflow.com
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} TableFlow. All rights reserved. Powered by Salesforce Agentforce.
        </div>
      </div>
    </footer>
  );
};
