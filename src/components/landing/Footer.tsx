import { Agent14Logo } from './Agent14Logo';

export const Footer = () => {
  return (
    <footer id="contact" className="py-16 px-6 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Agent14Logo size="sm" variant="light" />
            <span className="font-serif text-xl font-semibold tracking-tight">
              Agent<span className="text-primary-foreground/70">14</span>
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-primary-foreground/70">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms
            </a>
            <a href="mailto:support@agent14.com" className="hover:text-primary-foreground transition-colors">
              support@agent14.com
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Agent14. All rights reserved. Powered by Salesforce Agentforce.
        </div>
      </div>
    </footer>
  );
};
