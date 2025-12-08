import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Cookie, Shield, Settings, BarChart3, Users, Globe, Lock } from "lucide-react";

const CookiePolicy = () => {
  const lastUpdated = "December 8, 2025";

  return (
    <>
      <Helmet>
        <title>Cookie Policy - Agent14 | Data Privacy & Cookies</title>
        <meta
          name="description"
          content="Learn about how Agent14 uses cookies and similar technologies, our compliance with GDPR, PCI DSS, and global data protection regulations."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Cookie className="w-4 h-4" />
                <span className="text-sm font-medium">Cookie Policy</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Cookie Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  Introduction
                </h2>
                <p className="text-muted-foreground mb-4">
                  Agent14 ("we," "our," or "us") uses cookies and similar tracking technologies 
                  on our website and AI-powered restaurant reservation platform. This Cookie Policy 
                  explains what cookies are, how we use them, your choices regarding cookies, and 
                  how we comply with global data protection regulations including GDPR, CCPA, PCI DSS, 
                  and other applicable laws.
                </p>
                <p className="text-muted-foreground">
                  By continuing to use our website, you consent to our use of cookies in accordance 
                  with this policy. You can manage your cookie preferences at any time through your 
                  browser settings or our cookie consent manager.
                </p>
              </section>

              {/* What Are Cookies */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  What Are Cookies?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or 
                  mobile phone) when you visit a website. They are widely used to make websites work 
                  efficiently, provide a better user experience, and give website owners useful information 
                  about how their site is being used.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-2">First-Party Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Set by Agent14 directly when you visit our website.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-2">Third-Party Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Set by our trusted partners for analytics and security purposes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Types of Cookies We Use */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-primary" />
                  Types of Cookies We Use
                </h2>

                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      1. Essential Cookies (Strictly Necessary)
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      These cookies are essential for the website to function properly. They enable 
                      core functionality such as security, network management, and accessibility. 
                      You cannot opt out of these cookies.
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 text-foreground">Cookie Name</th>
                            <th className="text-left py-2 text-foreground">Purpose</th>
                            <th className="text-left py-2 text-foreground">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2 font-mono">turnstile_verified</td>
                            <td className="py-2">Bot protection verification status</td>
                            <td className="py-2">24 hours</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 font-mono">sb-auth-token</td>
                            <td className="py-2">User authentication session</td>
                            <td className="py-2">Session</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">cookie_consent</td>
                            <td className="py-2">Stores your cookie preferences</td>
                            <td className="py-2">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Performance Cookies */}
                  <div className="border-l-4 border-gold pl-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      2. Performance & Analytics Cookies
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      These cookies help us understand how visitors interact with our website by 
                      collecting and reporting information anonymously. This helps us improve our 
                      services and user experience.
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 text-foreground">Cookie Name</th>
                            <th className="text-left py-2 text-foreground">Provider</th>
                            <th className="text-left py-2 text-foreground">Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2 font-mono">_ga, _gid</td>
                            <td className="py-2">Google Analytics</td>
                            <td className="py-2">Visitor analytics and behavior</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">cf_clearance</td>
                            <td className="py-2">Cloudflare</td>
                            <td className="py-2">Security and performance</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      3. Functional Cookies
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      These cookies enable personalized features and remember your preferences 
                      (such as language, region, or display settings) to provide a more enhanced 
                      and personalized experience.
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 text-foreground">Cookie Name</th>
                            <th className="text-left py-2 text-foreground">Purpose</th>
                            <th className="text-left py-2 text-foreground">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2 font-mono">user_preferences</td>
                            <td className="py-2">Language and display settings</td>
                            <td className="py-2">1 year</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">chat_session</td>
                            <td className="py-2">Chatbot conversation continuity</td>
                            <td className="py-2">Session</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Security Cookies */}
                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      4. Security Cookies
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      These cookies protect against fraud, unauthorized access, and security threats. 
                      They are essential for maintaining the integrity and security of our platform.
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 text-foreground">Cookie Name</th>
                            <th className="text-left py-2 text-foreground">Provider</th>
                            <th className="text-left py-2 text-foreground">Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2 font-mono">cf_bm</td>
                            <td className="py-2">Cloudflare</td>
                            <td className="py-2">Bot management and protection</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 font-mono">__cf_bm</td>
                            <td className="py-2">Cloudflare Turnstile</td>
                            <td className="py-2">Human verification</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">csrf_token</td>
                            <td className="py-2">Agent14</td>
                            <td className="py-2">Cross-site request forgery protection</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              {/* GDPR Compliance */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  GDPR Compliance (European Union)
                </h2>
                <p className="text-muted-foreground mb-4">
                  Under the General Data Protection Regulation (GDPR), we are committed to protecting 
                  your personal data and privacy. Here's how we comply:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">1</span>
                    </span>
                    <span><strong className="text-foreground">Lawful Basis:</strong> We obtain explicit consent before placing non-essential cookies on your device.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">2</span>
                    </span>
                    <span><strong className="text-foreground">Transparency:</strong> We clearly explain what cookies we use, why we use them, and how long they last.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">3</span>
                    </span>
                    <span><strong className="text-foreground">Right to Withdraw:</strong> You can withdraw your consent at any time through our cookie settings or your browser.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">4</span>
                    </span>
                    <span><strong className="text-foreground">Data Minimization:</strong> We only collect the minimum data necessary for the stated purposes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">5</span>
                    </span>
                    <span><strong className="text-foreground">Data Subject Rights:</strong> You have the right to access, rectify, erase, and port your data.</span>
                  </li>
                </ul>
              </section>

              {/* PCI DSS Compliance */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  PCI DSS Compliance
                </h2>
                <p className="text-muted-foreground mb-4">
                  While Agent14 does not directly process payment card data (payments are handled 
                  by PCI-compliant third-party processors), we maintain strict security standards 
                  for any session data related to transactions:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-foreground">No Card Storage:</strong> We never store credit card numbers, CVVs, or sensitive authentication data in cookies.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-foreground">Secure Transmission:</strong> All cookies are transmitted over encrypted HTTPS connections using TLS 1.3.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-foreground">HttpOnly Flags:</strong> Sensitive cookies are marked as HttpOnly to prevent client-side script access.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-foreground">Secure Flags:</strong> All authentication cookies use the Secure flag to ensure HTTPS-only transmission.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-foreground">SameSite Attribute:</strong> We use SameSite=Strict or SameSite=Lax to prevent CSRF attacks.</span>
                  </li>
                </ul>
              </section>

              {/* Other Regulations */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  Global Regulatory Compliance
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      CCPA (California, USA)
                    </h3>
                    <p className="text-muted-foreground">
                      California residents have the right to know what personal information is collected, 
                      request deletion, and opt-out of the sale of personal information. We do not sell 
                      your personal information. To exercise your rights, contact us at privacy@agent14.online.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      LGPD (Brazil)
                    </h3>
                    <p className="text-muted-foreground">
                      We comply with Brazil's Lei Geral de Proteção de Dados, providing transparency 
                      about data processing activities and honoring data subject rights including 
                      access, correction, deletion, and data portability.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      POPIA (South Africa)
                    </h3>
                    <p className="text-muted-foreground">
                      We adhere to the Protection of Personal Information Act requirements, ensuring 
                      lawful processing, purpose limitation, and adequate security measures for 
                      personal information.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      PDPA (Singapore, Thailand)
                    </h3>
                    <p className="text-muted-foreground">
                      We comply with the Personal Data Protection Acts of Singapore and Thailand, 
                      including consent requirements, purpose limitation, and data protection obligations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      PIPEDA (Canada)
                    </h3>
                    <p className="text-muted-foreground">
                      We follow the Personal Information Protection and Electronic Documents Act 
                      principles, including accountability, consent, and safeguards for personal information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Managing Cookies */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-primary" />
                  Managing Your Cookie Preferences
                </h2>
                <p className="text-muted-foreground mb-4">
                  You have several options for controlling and managing cookies:
                </p>

                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-2">Browser Settings</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Most web browsers allow you to control cookies through their settings:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• <strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                      <li>• <strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                      <li>• <strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                      <li>• <strong>Edge:</strong> Settings → Privacy, search, and services → Cookies</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-2">Opt-Out Links</h4>
                    <p className="text-sm text-muted-foreground">
                      You can opt out of specific third-party cookies:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                      <li>• <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-Out</a></li>
                      <li>• <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices (EU)</a></li>
                      <li>• <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Network Advertising Initiative</a></li>
                    </ul>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-2">⚠️ Important Notice</h4>
                    <p className="text-sm text-muted-foreground">
                      Disabling essential cookies may affect the functionality of our website and 
                      prevent you from using certain features, including authentication and the 
                      AI reservation chatbot.
                    </p>
                  </div>
                </div>
              </section>

              {/* Third-Party Services */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Third-Party Services
                </h2>
                <p className="text-muted-foreground mb-4">
                  We use the following third-party services that may set cookies:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-1">Cloudflare</h4>
                    <p className="text-sm text-muted-foreground">Security, bot protection, and performance optimization</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-1">Salesforce</h4>
                    <p className="text-sm text-muted-foreground">AI chatbot and reservation management</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-1">Supabase</h4>
                    <p className="text-sm text-muted-foreground">Authentication and database services</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-1">Google Analytics</h4>
                    <p className="text-sm text-muted-foreground">Website usage analytics (with anonymization)</p>
                  </div>
                </div>
              </section>

              {/* Data Retention */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  Data Retention
                </h2>
                <p className="text-muted-foreground mb-4">
                  Cookie data is retained for the following periods:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <strong className="text-foreground">Session cookies:</strong> Deleted when you close your browser
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gold" />
                    <strong className="text-foreground">Persistent cookies:</strong> Up to 1 year, depending on purpose
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <strong className="text-foreground">Analytics data:</strong> Aggregated for up to 26 months
                  </li>
                </ul>
              </section>

              {/* Updates to Policy */}
              <section className="mb-12 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Updates to This Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices, technology, legal requirements, or other factors. We will notify you 
                  of any material changes by posting a notice on our website and updating the 
                  "Last updated" date. We encourage you to review this policy periodically.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Questions or Concerns?
                </h2>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about our use of cookies or this policy, please contact us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:privacy@agent14.online"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Shield className="w-5 h-5" />
                    privacy@agent14.online
                  </a>
                  <a
                    href="mailto:dpo@agent14.online"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    <Users className="w-5 h-5" />
                    Data Protection Officer
                  </a>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CookiePolicy;
