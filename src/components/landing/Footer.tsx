import agentLogo from '@/assets/agent14-logo.png';

const footerLinks = {
  product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'For Restaurants', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: 'mailto:support@agent14.online' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-card/50 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-primary/20">
                <img src={agentLogo} alt="Agent14 Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display text-xl font-semibold tracking-tight text-foreground">
                Agent<span className="text-primary">14</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered restaurant reservations. Book, modify, or cancel with a simple conversation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Agent14. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by Salesforce Agentforce
          </p>
        </div>
      </div>
    </footer>
  );
};
