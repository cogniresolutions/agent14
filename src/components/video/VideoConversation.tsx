import { useRef, useState, useEffect, useCallback } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VideoConversationProps {
  replicaId: string;
  personaId: string;
}

export const VideoConversation = ({ replicaId, personaId }: VideoConversationProps) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<DailyCall | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // End conversation on Tavus backend
  const endTavusConversation = useCallback(async () => {
    if (!conversationIdRef.current) return;
    
    const convId = conversationIdRef.current;
    conversationIdRef.current = null; // Clear immediately to prevent duplicate calls
    
    try {
      console.log('Ending Tavus conversation:', convId);
      const { data, error } = await supabase.functions.invoke('end-video-conversation', {
        body: { conversation_id: convId }
      });
      
      if (error) {
        console.error('Error ending conversation:', error);
      } else {
        console.log('Tavus conversation ended:', data);
      }
    } catch (err) {
      console.error('Failed to end Tavus conversation:', err);
    }
  }, []);

  const cleanup = useCallback(() => {
    if (callRef.current) {
      callRef.current.destroy();
      callRef.current = null;
    }
  }, []);

  const startConversation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create conversation via edge function
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

      if (!data?.conversation_url) {
        throw new Error('No conversation URL returned');
      }

      console.log('Conversation created:', data);
      
      // Store conversation ID for cleanup
      conversationIdRef.current = data.conversation_id;

      // Create Daily.co frame
      callRef.current = DailyIframe.createFrame(containerRef.current!, {
        iframeStyle: {
          width: '100%',
          height: '100%',
          border: '0',
          borderRadius: '16px',
        },
        showLeaveButton: true,
        showFullscreenButton: true,
      });

      callRef.current.on('joined-meeting', () => {
        console.log('Joined video conversation');
        setIsConnected(true);
        setIsLoading(false);
      });

      callRef.current.on('left-meeting', () => {
        console.log('Left video conversation');
        setIsConnected(false);
        endTavusConversation(); // End on Tavus backend
        cleanup();
      });

      callRef.current.on('error', (e) => {
        console.error('Daily error:', e);
        setError('Video connection error');
        setIsLoading(false);
        endTavusConversation(); // End on error too
      });

      await callRef.current.join({ url: data.conversation_url });

    } catch (err) {
      console.error('Error starting conversation:', err);
      setError(err instanceof Error ? err.message : 'Failed to start conversation');
      setIsLoading(false);
      toast({
        title: "Connection Error",
        description: err instanceof Error ? err.message : 'Failed to start video conversation',
        variant: "destructive",
      });
    }
  };

  const endConversation = () => {
    if (callRef.current) {
      callRef.current.leave();
    }
  };

  useEffect(() => {
    return () => {
      endTavusConversation(); // End conversation on unmount
      cleanup();
    };
  }, [endTavusConversation, cleanup]);

  return (
    <div className="w-full h-full flex flex-col">
      <div 
        ref={containerRef} 
        className="flex-1 min-h-[400px] bg-muted/50 rounded-2xl overflow-hidden"
      >
        {!isConnected && !isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
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

        {isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Connecting to video agent...</p>
          </div>
        )}
      </div>

      {isConnected && (
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={endConversation} 
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
