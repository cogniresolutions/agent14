import { useRef, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';
import { Sidebar } from './Sidebar';
import { useChat } from '@/hooks/useChat';

export const ChatContainer = () => {
  const { messages, isTyping, currentBooking, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <ChatMessage
                message={{
                  id: 'typing',
                  role: 'agent',
                  content: '',
                  timestamp: new Date(),
                  isTyping: true,
                }}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <QuickActions onAction={sendMessage} disabled={isTyping} />
        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </div>

      <Sidebar currentBooking={currentBooking} />
    </div>
  );
};
