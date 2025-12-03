import { ChatContainer } from '@/components/chat/ChatContainer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Intelligent Diner Support | Restaurant Reservations</title>
        <meta name="description" content="Get instant assistance with your restaurant bookings. Modify reservations, cancel, or get restaurant information with our AI-powered support agent." />
      </Helmet>
      <ChatContainer />
    </>
  );
};

export default Index;
