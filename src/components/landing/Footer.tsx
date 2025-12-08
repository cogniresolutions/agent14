import { Link } from 'react-router-dom';
import agentLogoFull from '@/assets/agent14-logo-new.png';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features', isExternal: true },
    { label: 'How It Works', href: '#how-it-works', isExternal: true },
    { label: 'Pricing', href: '#', isExternal: true },
    { label: 'FAQ', href: '#faq', isExternal: true },
  ],
  company: [
    { label: 'About Us', href: '#', isExternal: true },
    { label: 'For Restaurants', href: '#', isExternal: true },
    { label: 'Careers', href: '#', isExternal: true },
    { label: 'Contact', href: 'mailto:support@agent14.online', isExternal: true },
  ],
  resources: [
    { label: 'Blog', href: '/blog', isExternal: false },
    { label: 'API Docs', href: '/api-docs', isExternal: false },
    { label: 'Status', href: '/status', isExternal: false },
    { label: 'Security', href: '/security', isExternal: false },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy', isExternal: false },
    { label: 'Terms of Service', href: '/terms-of-service', isExternal: false },
    { label: 'Cookie Policy', href: '#', isExternal: true },
  ],
};

export const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-background border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src={agentLogoFull} alt="Agent14 Logo" className="h-10 w-auto object-contain" />
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-light text-primary tracking-wide uppercase">Agent</span>
                <span className="text-xl font-bold text-gold">14</span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered restaurant reservations. Book smarter, dine better.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  )}
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
