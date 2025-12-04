import { Menu, X } from 'lucide-react';
import { useState } from 'react';
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

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenChat = () => {
    if (window.embeddedservice_bootstrap?.utilAPI?.launchChat) {
      window.embeddedservice_bootstrap.utilAPI.launchChat();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 shadow-md">
            <img src={agentLogo} alt="Agent14 Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            Agent<span className="text-primary">14</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <a href="#how-it-works" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            How It Works
          </a>
          <a href="#features" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            Features
          </a>
          <a href="#testimonials" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            Reviews
          </a>
          <a href="#faq" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleOpenChat}
            className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-lg">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
            <a href="#how-it-works" className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
              How It Works
            </a>
            <a href="#features" className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
              Features
            </a>
            <a href="#testimonials" className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
              Reviews
            </a>
            <a href="#faq" className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
              FAQ
            </a>
            <button
              onClick={handleOpenChat}
              className="mt-2 px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
