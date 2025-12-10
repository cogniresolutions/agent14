import { launchChat } from '@/components/chatbot/SalesforceChatbot';
import agentLogo from '@/assets/agent14-mascot-logo.png';

export const FloatingChatButton = () => {
  const handleClick = () => {
    console.log('[FloatingChatButton] Button clicked');
    launchChat();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[9999] group"
      aria-label="Open chat"
    >
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
      
      {/* Button */}
      <div className="relative w-20 h-20 rounded-full bg-primary shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
        <img 
          src={agentLogo} 
          alt="Chat with Agent14" 
          className="w-14 h-14 object-contain"
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Chat with Agent14
        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
      </div>
    </button>
  );
};
