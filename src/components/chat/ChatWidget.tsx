import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Bot, User, Calendar, XCircle, Info, Phone, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const AGENT_RESPONSES: Record<string, string> = {
  default: `Hello! 👋 I'm your TableFlow AI assistant. I can help you with:

• **New Reservations** - Book a table at any restaurant
• **Modify Booking** - Change date, time, or party size
• **Cancel Reservation** - Quick cancellation with confirmation
• **Restaurant Info** - Menu, hours, and more

How may I assist you today?`,
  reserve: `I'd be happy to help you make a reservation! Please provide:

📍 **Restaurant name** (or cuisine preference)
📅 **Preferred date**
🕐 **Preferred time**
👥 **Party size**
📧 **Email** for confirmation

You can share all details at once or I'll guide you step by step.`,
  modify: `I can help modify your existing reservation. Please provide:

🔖 **Confirmation number** or **email used for booking**

What would you like to change?
• Date or time
• Party size  
• Special requests

Let me know and I'll update it right away.`,
  cancel: `I understand you need to cancel a reservation. Please provide:

🔖 **Confirmation number** or **email used for booking**

I'll process the cancellation and send you a confirmation email immediately.

Note: Most restaurants allow free cancellation up to 24 hours before your reservation.`,
  info: `I can provide information about any restaurant in our network:

• Operating hours
• Menu highlights  
• Dress code
• Parking availability
• Special accommodations

Which restaurant would you like to know more about?`,
  escalate: `I understand you'd like to speak with a human agent. I'm connecting you now.

🔄 **Transferring to support...**

Estimated wait: ~2 minutes

Your conversation history will be shared for a seamless handoff. Is there anything specific you'd like me to note for the agent?`,
  booking_complete: `Excellent! I've processed your reservation:

✅ **Reservation Confirmed**

📍 La Maison Élégante
📅 Friday, December 20, 2024
🕐 7:30 PM
👥 4 guests

📧 A confirmation email has been sent to your email address.

Confirmation #: TF-2024-7829

Is there anything else I can help you with?`,
};

const quickActions = [
  { id: 'reserve', label: 'New Reservation', icon: Calendar },
  { id: 'modify', label: 'Modify Booking', icon: Calendar },
  { id: 'cancel', label: 'Cancel', icon: XCircle },
  { id: 'info', label: 'Restaurant Info', icon: Info },
  { id: 'escalate', label: 'Human Agent', icon: Phone },
];

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatWidget = ({ isOpen, onToggle }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: AGENT_RESPONSES.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getResponseKey = (message: string): string => {
    const lower = message.toLowerCase();
    if (lower.includes('book') || lower.includes('reserve') || lower.includes('table') || lower.includes('new')) return 'reserve';
    if (lower.includes('modify') || lower.includes('change') || lower.includes('update')) return 'modify';
    if (lower.includes('cancel')) return 'cancel';
    if (lower.includes('info') || lower.includes('menu') || lower.includes('hours') || lower.includes('about')) return 'info';
    if (lower.includes('human') || lower.includes('agent') || lower.includes('person') || lower.includes('speak')) return 'escalate';
    if (lower.includes('confirm') || lower.includes('yes') || lower.includes('book it')) return 'booking_complete';
    return 'default';
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

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
    }, 1200);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      reserve: "I'd like to make a new reservation",
      modify: "I need to modify my booking",
      cancel: "I want to cancel my reservation",
      info: "I need restaurant information",
      escalate: "I'd like to speak with a human agent",
    };
    sendMessage(actionMessages[action] || action);
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={onToggle}
        variant="chat"
        size="chatIcon"
        className={cn(
          'fixed bottom-6 right-6 z-50 transition-all duration-300',
          isOpen && 'scale-0 opacity-0'
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Panel */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-h-[80vh] bg-card rounded-2xl shadow-chat border border-border flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">TableFlow AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse-soft" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggle} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-2.5 animate-slide-up',
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                  message.role === 'user' ? 'bg-primary' : 'bg-secondary'
                )}
              >
                {message.role === 'user' ? (
                  <User className="w-3.5 h-3.5 text-primary-foreground" />
                ) : (
                  <Bot className="w-3.5 h-3.5 text-foreground" />
                )}
              </div>
              <div
                className={cn(
                  'max-w-[80%] px-4 py-3 text-sm leading-relaxed',
                  message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-agent'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2.5 animate-slide-up">
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-foreground" />
              </div>
              <div className="chat-bubble-agent px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-border bg-secondary/30">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                disabled={isTyping}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:bg-secondary hover:border-primary/20 transition-all whitespace-nowrap disabled:opacity-50"
              >
                <action.icon className="w-3 h-3" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isTyping}
              className="flex-1 px-4 py-3 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" disabled={!input.trim() || isTyping} className="rounded-xl">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
