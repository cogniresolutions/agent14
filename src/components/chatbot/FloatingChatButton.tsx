import { useState } from 'react';
import { launchChat, isChatReady } from '@/components/chatbot/SalesforceChatbot';
import agentLogo from '@/assets/agent14-mascot-logo.png';
import { Loader2 } from 'lucide-react';

export const FloatingChatButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    console.log('[FloatingChatButton] Button clicked');
    
    // If chat is already ready, launch immediately
    if (isChatReady()) {
      launchChat();
      return;
    }
    
    // Show loading state while waiting for chat to be ready
    setIsLoading(true);
    await launchChat();
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="fixed bottom-6 right-6 z-[9999] group"
      aria-label="Open chat"
    >
      {/* Pulse animation ring - hide when loading */}
      {!isLoading && (
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
      )}
      
      {/* Button */}
      <div className="relative w-20 h-20 rounded-full bg-primary shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
        {isLoading ? (
          <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
        ) : (
          <img 
            src={agentLogo} 
            alt="Chat with Agent14" 
            className="w-14 h-14 object-contain"
          />
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {isLoading ? 'Loading chat...' : 'Chat with Agent14'}
        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
      </div>
    </button>
  );
};
