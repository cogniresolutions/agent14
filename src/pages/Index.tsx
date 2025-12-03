import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Footer } from '@/components/landing/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Agent14 | AI-Powered Restaurant Reservations</title>
        <meta name="description" content="Book, modify, or cancel restaurant reservations instantly with Agent14's intelligent AI concierge. No calls, no waiting—just seamless dining experiences." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero onOpenChat={() => setIsChatOpen(true)} />
          <Features />
          <HowItWorks />
        </main>
        <Footer />
        
        <ChatWidget 
          isOpen={isChatOpen} 
          onToggle={() => setIsChatOpen(!isChatOpen)} 
        />
      </div>
    </>
  );
};

export default Index;
