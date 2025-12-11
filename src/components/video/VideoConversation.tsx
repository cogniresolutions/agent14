import { useRef, useState, useEffect, useCallback } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CONVERSATION_STORAGE_KEY = 'agent14_active_conversation';

interface VideoConversationProps {
  replicaId: string;
  personaId: string;
}

// Helper to end conversation via API - fire and forget
const endConversationApi = async (conversationId: string) => {
  try {
    console.log('Ending Tavus conversation via API:', conversationId);
    await supabase.functions.invoke('end-video-conversation', {
      body: { conversation_id: conversationId }
    });
    console.log('Tavus conversation ended:', conversationId);
  } catch (err) {
    console.error('Failed to end Tavus conversation:', err);
  }
};

export const VideoConversation = ({ replicaId, personaId }: VideoConversationProps) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<DailyCall | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const isCleaningUp = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clean up stale conversation from previous session on mount (only once)
  useEffect(() => {
    const staleConversationId = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (staleConversationId && !conversationIdRef.current) {
      console.log('Found stale conversation from previous session, ending it:', staleConversationId);
      localStorage.removeItem(CONVERSATION_STORAGE_KEY);
      endConversationApi(staleConversationId);
    }
  }, []);

  const cleanup = useCallback(() => {
    if (callRef.current) {
      try {
        callRef.current.destroy();
      } catch (e) {
        console.log('Error destroying call:', e);
      }
      callRef.current = null;
    }
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  }, []);

  const endCurrentConversation = useCallback(async () => {
    if (isCleaningUp.current) return;
    isCleaningUp.current = true;

    const convId = conversationIdRef.current;
    if (convId) {
      conversationIdRef.current = null;
      localStorage.removeItem(CONVERSATION_STORAGE_KEY);
      await endConversationApi(convId);
    }
    
    cleanup();
    setIsConnected(false);
    setIsLoading(false);
    isCleaningUp.current = false;
  }, [cleanup]);

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const convId = conversationIdRef.current;
      if (convId) {
        // Use sendBeacon for reliable delivery during unload
        const url = 'https://dfvrviuppfkqjpdyevfv.supabase.co/functions/v1/end-video-conversation';
        navigator.sendBeacon(url, JSON.stringify({ conversation_id: convId }));
        localStorage.removeItem(CONVERSATION_STORAGE_KEY);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const startConversation = async () => {
    if (isLoading || isConnected) return;
    
    setIsLoading(true);
    setError(null);
    cleanup();

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-video-conversation', {
        body: { 
          replica_id: replicaId, 
          persona_id: personaId,
          conversation_name: 'Agent14 Video Concierge'
        }
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to create conversation');
      }

      if (!data?.conversation_url || !data?.conversation_id) {
        throw new Error(data?.error || 'No conversation URL returned');
      }

      console.log('Conversation created:', data);
      
      // Store conversation ID
      conversationIdRef.current = data.conversation_id;
      localStorage.setItem(CONVERSATION_STORAGE_KEY, data.conversation_id);

      if (!containerRef.current) {
        throw new Error('Video container not ready');
      }

      // Create Daily.co frame
      callRef.current = DailyIframe.createFrame(containerRef.current, {
        iframeStyle: {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '16px',
          background: '#000',
        },
        showLeaveButton: true,
        showFullscreenButton: true,
      });

      callRef.current.on('joined-meeting', () => {
        console.log('Successfully joined video conversation');
        setIsConnected(true);
        setIsLoading(false);
      });

      callRef.current.on('left-meeting', () => {
        console.log('Left video conversation');
        endCurrentConversation();
      });

      callRef.current.on('error', (e) => {
        console.error('Daily.co error:', e);
        setError('Video connection error. Please try again.');
        endCurrentConversation();
      });

      // Join the call
      console.log('Joining Daily.co call:', data.conversation_url);
      await callRef.current.join({ url: data.conversation_url });

    } catch (err) {
      console.error('Error starting conversation:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation';
      setError(errorMessage);
      setIsLoading(false);
      
      // Clean up if conversation was created but joining failed
      if (conversationIdRef.current) {
        const convId = conversationIdRef.current;
        conversationIdRef.current = null;
        localStorage.removeItem(CONVERSATION_STORAGE_KEY);
        await endConversationApi(convId);
      }
      
      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleEndConversation = async () => {
    if (callRef.current) {
      try {
        await callRef.current.leave();
      } catch (e) {
        console.log('Error leaving call:', e);
      }
    }
    await endCurrentConversation();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversationIdRef.current && !isCleaningUp.current) {
        const convId = conversationIdRef.current;
        localStorage.removeItem(CONVERSATION_STORAGE_KEY);
        endConversationApi(convId);
      }
      cleanup();
    };
  }, [cleanup]);

  const showStartScreen = !isConnected && !isLoading;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-[500px] bg-black rounded-2xl overflow-hidden relative">
        {/* Daily.co iframe container */}
        <div 
          ref={containerRef} 
          className="absolute inset-0"
          style={{ display: isLoading || isConnected ? 'block' : 'none' }}
        />
        
        {/* Start screen */}
        {showStartScreen && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-muted/50 z-10">
            <div className="p-6 rounded-full bg-primary/10 mb-6">
              <Video className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              AI Video Concierge
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Start a face-to-face conversation with our AI assistant. 
              Make reservations naturally through video chat.
            </p>
            {error && (
              <p className="text-destructive text-sm mb-4">{error}</p>
            )}
            <Button 
              onClick={startConversation} 
              size="lg"
              className="gap-2"
            >
              <Video className="h-5 w-5" />
              Start Video Chat
            </Button>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-white">Connecting to video agent...</p>
          </div>
        )}
      </div>

      {/* End button */}
      {isConnected && (
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={handleEndConversation} 
            variant="destructive"
            className="gap-2"
          >
            <VideoOff className="h-5 w-5" />
            End Conversation
          </Button>
        </div>
      )}
    </div>
  );
};
