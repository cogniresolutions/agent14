import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { VideoConversation } from "@/components/video/VideoConversation";
import { Video, MessageSquare, Sparkles, Shield } from "lucide-react";

// Hardcoded video agent configuration
const REPLICA_ID = "r6ae5b6efc9d";
const PERSONA_ID = "pf3591e88614";

const PremiumVideo = () => {
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
          <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Premium Experience</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Video Concierge Service
                </h1>
                <p className="text-muted-foreground">
                  Speak naturally with our AI video assistant powered by Salesforce Agentforce.
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Face-to-Face</h3>
                    <p className="text-xs text-muted-foreground">Lifelike AI avatar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Natural Chat</h3>
                    <p className="text-xs text-muted-foreground">Speak naturally</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Secure</h3>
                    <p className="text-xs text-muted-foreground">Enterprise security</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Interface Section */}
          <section className="py-8 pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video rounded-2xl overflow-hidden bg-card border-2 border-primary/20 shadow-xl">
                  <VideoConversation 
                    replicaId={REPLICA_ID} 
                    personaId={PERSONA_ID} 
                  />
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
