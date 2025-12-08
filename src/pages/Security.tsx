import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Shield, Lock, Bot, Brain, Eye, Server, CheckCircle2, ShieldCheck } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Bot,
      title: "Cloudflare Bot Protection",
      description: "Advanced Turnstile verification prevents automated attacks and ensures only genuine users access our platform.",
      features: [
        "Real-time bot detection and blocking",
        "Invisible challenge system for seamless UX",
        "Protection against credential stuffing",
        "DDoS mitigation at the edge"
      ]
    },
    {
      icon: Brain,
      title: "Salesforce Einstein Trust Layer",
      description: "Enterprise-grade AI security powered by Salesforce's trusted infrastructure.",
      features: [
        "Zero data retention policy for prompts",
        "Secure data masking and anonymization",
        "Audit trails for all AI interactions",
        "SOC 2 Type II compliant infrastructure"
      ]
    },
    {
      icon: Shield,
      title: "Prompt Injection Safeguards",
      description: "Multi-layered defense against prompt manipulation and jailbreak attempts.",
      features: [
        "Input sanitization and validation",
        "Contextual boundary enforcement",
        "Malicious pattern detection",
        "Automatic threat response protocols"
      ]
    },
    {
      icon: Lock,
      title: "Data Encryption",
      description: "End-to-end encryption ensures your data remains private and secure.",
      features: [
        "AES-256 encryption at rest",
        "TLS 1.3 for data in transit",
        "Secure key management",
        "Regular encryption audits"
      ]
    },
    {
      icon: Eye,
      title: "Privacy Controls",
      description: "Comprehensive privacy measures aligned with global standards.",
      features: [
        "GDPR and CCPA compliant",
        "Data minimization practices",
        "Right to deletion honored",
        "Transparent data processing"
      ]
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Built on enterprise-grade cloud infrastructure with multiple redundancies.",
      features: [
        "Multi-region deployment",
        "99.9% uptime SLA",
        "Automated backup systems",
        "24/7 security monitoring"
      ]
    }
  ];

  const trustIndicators = [
    { label: "Enterprise Security", value: "SOC 2 Type II" },
    { label: "Data Encryption", value: "AES-256" },
    { label: "Uptime SLA", value: "99.9%" },
    { label: "Compliance", value: "GDPR Ready" }
  ];

  return (
    <>
      <Helmet>
        <title>Security - Agent14 | Enterprise-Grade Protection</title>
        <meta
          name="description"
          content="Learn about Agent14's comprehensive security measures including Cloudflare protection, Salesforce Einstein Trust Layer, and advanced prompt injection safeguards."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-medium">Enterprise-Grade Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your Data, <span className="text-primary">Protected</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Agent14 employs multiple layers of security to ensure your reservation data 
              and conversations remain private, secure, and protected from threats.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-primary mb-1">
                    {indicator.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {indicator.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features Grid */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Comprehensive Security Architecture
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our multi-layered security approach protects your data at every level, 
                from network edge to AI interactions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prompt Injection Protection Detail */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Advanced AI Security with Einstein Trust Layer
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our AI reservation assistant is powered by Salesforce Agentforce, which includes 
                  the Einstein Trust Layer—a comprehensive security framework designed to protect 
                  against prompt injection attacks and ensure safe AI interactions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Secure Grounding</h4>
                      <p className="text-sm text-muted-foreground">
                        AI responses are grounded in trusted data sources, preventing hallucinations 
                        and unauthorized data disclosure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Data Masking</h4>
                      <p className="text-sm text-muted-foreground">
                        Sensitive information is automatically masked before being processed, 
                        ensuring PII protection throughout.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Toxicity Detection</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time monitoring filters harmful content and prevents misuse 
                        of the AI system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Protection Against Common Attacks
                </h3>
                <div className="space-y-4">
                  {[
                    { attack: "Direct Prompt Injection", status: "Protected" },
                    { attack: "Jailbreak Attempts", status: "Protected" },
                    { attack: "Data Extraction Attacks", status: "Protected" },
                    { attack: "Role Confusion Attacks", status: "Protected" },
                    { attack: "Context Manipulation", status: "Protected" },
                    { attack: "Encoding/Obfuscation", status: "Protected" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{item.attack}</span>
                      <span className="flex items-center gap-2 text-primary font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Questions About Security?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team is ready to discuss our security measures in detail and address 
              any concerns you may have about data protection.
            </p>
            <a
              href="mailto:security@agent14.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <Shield className="w-5 h-5" />
              Contact Security Team
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Security;
