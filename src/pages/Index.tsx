import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Agent14 | AI-Powered Restaurant Reservations</title>
        <meta name="description" content="Book, modify, or cancel restaurant reservations instantly with Agent14's intelligent AI concierge. No calls, no waiting—just seamless dining experiences." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
