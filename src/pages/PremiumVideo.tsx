import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Sparkles, Shield } from "lucide-react";

const PremiumVideo = () => {
  // Tavus embed URL - replace with your actual Tavus conversation ID
  const tavusEmbedUrl = "https://tavus.io/embed"; // Placeholder - user needs to configure

  return (
    <>
      <Helmet>
        <title>Premium Video Concierge - Agent14</title>
        <meta 
          name="description" 
          content="Experience our AI-powered video concierge service. Speak directly with our virtual assistant for personalized restaurant reservations." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Premium Experience</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Video Concierge Service
                </h1>
                <p className="text-lg text-muted-foreground">
                  Experience the future of restaurant reservations with our AI-powered video concierge. 
                  Speak naturally with our virtual assistant powered by Salesforce Agentforce.
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="flex items-start gap-4 p-6 rounded-xl bg-card border">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Face-to-Face</h3>
                    <p className="text-sm text-muted-foreground">
                      Interact with a lifelike AI video avatar
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-xl bg-card border">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Natural Conversation</h3>
                    <p className="text-sm text-muted-foreground">
                      Speak naturally as you would with a human
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-xl bg-card border">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Secure & Private</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade security with Salesforce
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Interface Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video rounded-2xl overflow-hidden bg-card border-2 border-primary/20 shadow-xl">
                  {/* Tavus Video Embed Placeholder */}
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="p-6 rounded-full bg-primary/10 mb-6">
                      <Video className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      Tavus Video Agent
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Configure your Tavus conversation ID in the code to enable the video concierge. 
                      The agent is connected to Salesforce Agentforce for intelligent responses.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" asChild>
                        <a 
                          href="https://www.tavus.io/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Learn about Tavus
                        </a>
                      </Button>
                      <Button asChild>
                        <a 
                          href="https://platform.tavus.io/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Get Tavus API Key
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Uncomment and configure when ready:
                  <iframe 
                    src={tavusEmbedUrl}
                    className="w-full h-full"
                    allow="camera; microphone; autoplay"
                    title="Tavus Video Concierge"
                  />
                  */}
                </div>

                {/* Integration Info */}
                <div className="mt-8 p-6 rounded-xl bg-card border">
                  <h4 className="font-semibold text-foreground mb-3">Integration Details</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    This video concierge uses Tavus for the video avatar interface and connects to 
                    Salesforce Agentforce via our custom proxy endpoint for intelligent conversation handling.
                  </p>
                  <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm text-muted-foreground">
                    <p className="mb-2">
                      <span className="text-primary">Proxy Endpoint:</span>
                    </p>
                    <code className="break-all">
                      https://dfvrviuppfkqjpdyevfv.supabase.co/functions/v1/tavus-agentforce-proxy
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PremiumVideo;
