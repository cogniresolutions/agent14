import agentLogo from '@/assets/agent14-logo.png';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/30">
      <div className="container mx-auto px-6 h-18 flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-primary/30 shadow-cyber">
            <img src={agentLogo} alt="Agent14 Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Agent<span className="text-primary glow-text">14</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
            How It Works
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};
