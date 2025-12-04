import { Menu, X, ChevronDown } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground">
      {/* Top banner */}
      <div className="bg-secondary-foreground/10 py-2 px-6 text-center text-sm">
        <span className="text-secondary-foreground/80">
          <span className="font-semibold text-primary">New:</span> AI-Powered Reservations Now Available!{' '}
          <button onClick={handleOpenChat} className="underline hover:text-primary transition-colors">
            Try it now
          </button>
        </span>
      </div>
      
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <img src={agentLogo} alt="Agent14 Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">
            Agent<span className="text-primary">14</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors">
            Reviews
          </a>
          <a href="#faq" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors">
            FAQ
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={handleOpenChat}
            className="px-5 py-2.5 text-sm font-semibold text-secondary-foreground hover:text-primary transition-colors"
          >
            Login
          </button>
          <button
            onClick={handleOpenChat}
            className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md"
          >
            Try it free
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-secondary-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-secondary border-t border-secondary-foreground/10">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
            <a href="#features" className="px-4 py-3 text-sm text-secondary-foreground/80 hover:text-primary rounded-lg transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="px-4 py-3 text-sm text-secondary-foreground/80 hover:text-primary rounded-lg transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="px-4 py-3 text-sm text-secondary-foreground/80 hover:text-primary rounded-lg transition-colors">
              Reviews
            </a>
            <a href="#faq" className="px-4 py-3 text-sm text-secondary-foreground/80 hover:text-primary rounded-lg transition-colors">
              FAQ
            </a>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleOpenChat}
                className="flex-1 px-4 py-3 text-sm font-semibold border border-secondary-foreground/20 rounded-lg hover:bg-secondary-foreground/10 transition-colors"
              >
                Login
              </button>
              <button
                onClick={handleOpenChat}
                className="flex-1 px-4 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg"
              >
                Try it free
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
