import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Agent14</title>
        <meta name="description" content="Agent14 Terms of Service - Read our terms and conditions for using our AI-powered restaurant reservation platform." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Agent14. These Terms of Service ("Terms") govern your access to and use of the Agent14 platform, including our website, AI-powered chatbot, and related services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  If you do not agree to these Terms, you may not access or use the Service. We reserve the right to modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Agent14 provides an AI-powered restaurant reservation platform that allows users to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                  <li>Make restaurant reservations through our AI chatbot</li>
                  <li>Modify or cancel existing reservations</li>
                  <li>Participate in our loyalty rewards program</li>
                  <li>Receive personalized dining recommendations</li>
                  <li>Manage dining preferences and history</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Account Registration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">To access certain features of the Service, you must create an account. You agree to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Keep your account credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Be responsible for all activities that occur under your account</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You must be at least 16 years old to create an account and use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Reservation Terms</h2>
                <h3 className="text-xl font-medium text-foreground mb-3">4.1 Making Reservations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you make a reservation through Agent14, you are requesting a booking at a third-party restaurant. Reservations are subject to availability and confirmation by the restaurant partner.
                </p>

                <h3 className="text-xl font-medium text-foreground mb-3 mt-6">4.2 Cancellation Policy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cancellation policies vary by restaurant. We recommend canceling or modifying reservations at least 24 hours in advance. Failure to honor a reservation (no-show) may result in restrictions on your account.
                </p>

                <h3 className="text-xl font-medium text-foreground mb-3 mt-6">4.3 Accuracy of Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide accurate information about restaurants, menus, and availability, we cannot guarantee the accuracy of all information provided by our restaurant partners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Loyalty Program</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Participation in our loyalty program is subject to the following:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Points are earned for completed reservations and may vary by restaurant</li>
                  <li>Points have no cash value and cannot be transferred or sold</li>
                  <li>We reserve the right to modify point values and redemption options</li>
                  <li>Points may expire after 12 months of account inactivity</li>
                  <li>Abuse of the loyalty program may result in account termination</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. User Conduct</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Make fraudulent or speculative reservations</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Use automated systems or bots without our written permission</li>
                  <li>Harass, abuse, or harm other users or restaurant staff</li>
                  <li>Post or transmit any harmful, offensive, or illegal content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Service and its original content, features, and functionality are owned by Agent14 and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our Service without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service may contain links to or integrate with third-party websites, services, or content. We are not responsible for the content, policies, or practices of any third-party services. Your use of third-party services is at your own risk and subject to their terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, AGENT14 SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Agent14, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately. All provisions of these Terms which by their nature should survive termination shall survive.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Governing Law and Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Agent14 operates, without regard to its conflict of law provisions. Any disputes arising under these Terms shall first be attempted to be resolved through good-faith negotiation. If resolution cannot be reached, disputes shall be submitted to binding arbitration.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">14. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">15. Entire Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Agent14 regarding the use of the Service and supersede all prior agreements and understandings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">16. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-foreground font-medium">Agent14</p>
                  <p className="text-muted-foreground">Email: legal@agent14.online</p>
                  <p className="text-muted-foreground">Support: support@agent14.online</p>
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

export default TermsOfService;
