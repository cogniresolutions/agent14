import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { VideoConversation } from "@/components/video/VideoConversation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Video, MessageSquare, Sparkles, Shield, Settings } from "lucide-react";

const PremiumVideo = () => {
  // Default to stock persona - user can configure their own
  const [replicaId, setReplicaId] = useState("r79e1c033f");
  const [personaId, setPersonaId] = useState("");
  const [showConfig, setShowConfig] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  const handleConfigure = () => {
    if (replicaId && personaId) {
      setIsConfigured(true);
      setShowConfig(false);
    }
  };

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
                {/* Configuration Panel */}
                {showConfig && (
                  <div className="mb-8 p-6 rounded-xl bg-card border">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Configure Video Agent</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter your Replica ID and Persona ID from your video platform dashboard. 
                      Make sure your persona is configured to use our Agentforce endpoint as a custom LLM.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="replicaId">Replica ID</Label>
                        <Input
                          id="replicaId"
                          value={replicaId}
                          onChange={(e) => setReplicaId(e.target.value)}
                          placeholder="r79e1c033f"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="personaId">Persona ID</Label>
                        <Input
                          id="personaId"
                          value={personaId}
                          onChange={(e) => setPersonaId(e.target.value)}
                          placeholder="p1234567890"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 mb-4">
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong>Custom LLM Configuration for your Persona:</strong>
                      </p>
                      <code className="text-xs break-all block">
                        Base URL: https://dfvrviuppfkqjpdyevfv.supabase.co/functions/v1<br />
                        Model: video-agent-proxy
                      </code>
                    </div>
                    <Button onClick={handleConfigure} disabled={!replicaId || !personaId}>
                      Save Configuration
                    </Button>
                  </div>
                )}

                {/* Video Container */}
                <div className="aspect-video rounded-2xl overflow-hidden bg-card border-2 border-primary/20 shadow-xl">
                  {isConfigured ? (
                    <VideoConversation 
                      replicaId={replicaId} 
                      personaId={personaId} 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                      <div className="p-6 rounded-full bg-primary/10 mb-6">
                        <Video className="h-16 w-16 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-3">
                        AI Video Agent
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Configure your Replica ID and Persona ID above to start the video concierge.
                      </p>
                    </div>
                  )}
                </div>

                {isConfigured && (
                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowConfig(!showConfig)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {showConfig ? 'Hide' : 'Show'} Configuration
                    </Button>
                  </div>
                )}
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
