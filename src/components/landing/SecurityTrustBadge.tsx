import { Link } from "react-router-dom";
import { Shield, Lock, Brain, CheckCircle2, ArrowRight } from "lucide-react";

export const SecurityTrustBadge = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="relative overflow-hidden bg-card border border-border rounded-3xl p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Trust Badge Visual */}
              <div className="flex-shrink-0">
                <div className="relative">
                  {/* Outer ring animation */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" style={{ width: '140px', height: '140px' }} />
                  
                  {/* Main badge */}
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                    <div className="text-center">
                      <Shield className="w-12 h-12 md:w-14 md:h-14 text-primary-foreground mx-auto mb-1" />
                      <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">Secured</span>
                    </div>
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center shadow-md">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center shadow-md">
                    <Brain className="w-5 h-5 text-gold" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  Enterprise-Grade Protection
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Your Conversations Are <span className="text-primary">Safe & Secure</span>
                </h2>
                
                <p className="text-muted-foreground mb-6 max-w-xl">
                  Agent14 is protected by Cloudflare, Salesforce Einstein Trust Layer, and 
                  advanced prompt injection safeguards to keep your data private and secure.
                </p>

                {/* Security highlights */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Prompt Attack Detection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Data Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Bot Protection</span>
                  </div>
                </div>

                <Link 
                  to="/security" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Learn about our security
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Certifications */}
              <div className="flex-shrink-0 hidden xl:block">
                <div className="space-y-3">
                  {[
                    { label: "SOC 2 Type II", icon: Shield },
                    { label: "GDPR Ready", icon: Lock },
                    { label: "AI Trust Layer", icon: Brain }
                  ].map((cert, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-lg border border-border"
                    >
                      <cert.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{cert.label}</span>
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
