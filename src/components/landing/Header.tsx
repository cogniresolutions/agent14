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
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top banner */}
      <div className="bg-primary py-2 px-6 text-center text-sm">
        <span className="text-primary-foreground">
          <span className="font-semibold">New:</span> AI-Powered Reservations Now Available!{' '}
          <button onClick={handleOpenChat} className="underline hover:opacity-80 transition-opacity">
            Try it now
          </button>
        </span>
      </div>
      
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <img 
            src={agentLogo} 
            alt="Agent14 Logo" 
            className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#loyalty" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Rewards
          </a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            FAQ
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={handleOpenChat}
            className="px-5 py-2.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
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
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
            <a href="#features" className="px-4 py-3 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="px-4 py-3 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors">
              How It Works
            </a>
            <a href="#loyalty" className="px-4 py-3 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors">
              Rewards
            </a>
            <a href="#faq" className="px-4 py-3 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors">
              FAQ
            </a>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleOpenChat}
                className="flex-1 px-4 py-3 text-sm font-semibold border border-border rounded-lg hover:bg-muted transition-colors"
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
