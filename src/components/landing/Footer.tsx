import agentLogo from '@/assets/agent14-logo.png';

export const Footer = () => {
  return (
    <footer id="contact" className="py-16 px-6 bg-card/50 border-t border-border/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-primary/30">
              <img src={agentLogo} alt="Agent14 Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">
              Agent<span className="text-primary">14</span>
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Terms
            </a>
            <a href="mailto:support@agent14.com" className="hover:text-primary transition-colors duration-300">
              support@agent14.com
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Agent14. All rights reserved. Powered by Salesforce Agentforce.
        </div>
      </div>
    </footer>
  );
};
