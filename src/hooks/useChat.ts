import { useState, useCallback } from 'react';
import { Message, Booking } from '@/types/chat';

const MOCK_BOOKING: Booking = {
  id: 'BK-2024-1234',
  restaurantName: 'La Maison Élégante',
  date: 'Friday, December 15, 2024',
  time: '7:30 PM',
  partySize: 4,
  status: 'confirmed',
  specialRequests: 'Window table if available',
};

const AGENT_RESPONSES: Record<string, string> = {
  default: `Hello! I'm your Intelligent Diner Support Agent, here to help make your dining experience seamless. I can assist you with:

• Modifying your reservation details
• Canceling bookings
• Providing restaurant information
• Handling special requests

How may I assist you today?`,
  modify: `I'd be happy to help you modify your booking at La Maison Élégante.

Your current reservation:
📅 Friday, December 15, 2024 at 7:30 PM
👥 Party of 4

What would you like to change?
• Date or time
• Party size
• Special requests

Please let me know the details, and I'll update your reservation right away.`,
  cancel: `I understand you'd like to cancel your reservation at La Maison Élégante for December 15th.

Before I proceed, please note:
• Cancellations within 24 hours may be subject to the restaurant's policy
• Your dining credits will be refunded within 3-5 business days

Would you like me to proceed with the cancellation? Please confirm by typing "Yes, cancel" or let me know if you'd like to reschedule instead.`,
  info: `La Maison Élégante is a renowned French fine dining establishment located in the heart of downtown.

🏆 Awards: Michelin Star 2024
🍽️ Cuisine: Contemporary French
💰 Price Range: $$$$
📍 Location: 123 Gourmet Avenue

Highlights:
• Award-winning Chef Jean-Pierre Martin
• Extensive wine cellar with 500+ selections
• Seasonal tasting menus
• Private dining rooms available

Would you like me to share the current menu, dress code, or parking information?`,
  group: `I'd be delighted to assist with your group booking! For parties of 8 or more, we offer:

✨ Priority seating arrangements
✨ Custom menu options
✨ Private dining room availability
✨ Group celebration packages

Please share:
1. Desired date and time
2. Number of guests
3. Occasion (if any)
4. Any dietary requirements

I'll check availability and provide personalized options for your group.`,
  escalate: `I understand you'd like to speak with a human agent. I'm connecting you now.

🔄 Transferring to the next available agent...

Estimated wait time: ~2 minutes

While you wait, is there anything I can help clarify? Your conversation history will be shared with the agent for a seamless handoff.`,
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: AGENT_RESPONSES.default,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentBooking] = useState<Booking | null>(MOCK_BOOKING);

  const getResponseKey = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('modify') || lowerMessage.includes('change')) return 'modify';
    if (lowerMessage.includes('cancel')) return 'cancel';
    if (lowerMessage.includes('info') || lowerMessage.includes('tell me') || lowerMessage.includes('restaurant')) return 'info';
    if (lowerMessage.includes('group')) return 'group';
    if (lowerMessage.includes('human') || lowerMessage.includes('agent') || lowerMessage.includes('speak')) return 'escalate';
    return 'default';
  };

  const sendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseKey = getResponseKey(content);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: AGENT_RESPONSES[responseKey],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  }, []);

  return {
    messages,
    isTyping,
    currentBooking,
    sendMessage,
  };
};
