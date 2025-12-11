import { useRef, useState, useEffect, useCallback } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CONVERSATION_STORAGE_KEY = 'agent14_video_conversation';

interface VideoConversationProps {
  replicaId: string;
  personaId: string;
}

export const VideoConversation = ({ replicaId, personaId }: VideoConversationProps) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<DailyCall | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const hasJoinedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showFrame, setShowFrame] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // End conversation via API
  const endConversationOnServer = useCallback(async (convId: string) => {
    try {
      console.log('Ending Tavus conversation:', convId);
      await supabase.functions.invoke('end-video-conversation', {
        body: { conversation_id: convId }
      });
      console.log('Tavus conversation ended successfully:', convId);
    } catch (err) {
      console.error('Failed to end conversation:', err);
    }
  }, []);

  // Clean up any orphaned conversation from a previous page load
  useEffect(() => {
    const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (stored) {
      try {
        const { id, timestamp } = JSON.parse(stored);
        // Only clean up if older than 30 seconds (definitely stale)
        if (Date.now() - timestamp > 30000) {
          console.log('Cleaning up stale conversation:', id);
          localStorage.removeItem(CONVERSATION_STORAGE_KEY);
          endConversationOnServer(id);
        }
      } catch (e) {
        localStorage.removeItem(CONVERSATION_STORAGE_KEY);
      }
    }
  }, [endConversationOnServer]);

  // Handle page close/refresh
  useEffect(() => {
    const handleUnload = () => {
      if (conversationIdRef.current && hasJoinedRef.current) {
        const url = 'https://dfvrviuppfkqjpdyevfv.supabase.co/functions/v1/end-video-conversation';
        navigator.sendBeacon(url, JSON.stringify({ conversation_id: conversationIdRef.current }));
        localStorage.removeItem(CONVERSATION_STORAGE_KEY);
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  const destroyCall = useCallback(() => {
    if (callRef.current) {
      try {
        callRef.current.destroy();
      } catch (e) {
        // Ignore
      }
      callRef.current = null;
    }
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  }, []);

  const endCall = useCallback(async () => {
    const convId = conversationIdRef.current;
    const joined = hasJoinedRef.current;
    
    conversationIdRef.current = null;
    hasJoinedRef.current = false;
    localStorage.removeItem(CONVERSATION_STORAGE_KEY);
    
    destroyCall();
    setIsConnected(false);
    setIsLoading(false);
    setShowFrame(false);

    // Only end on server if we actually joined
    if (convId && joined) {
      await endConversationOnServer(convId);
    }
  }, [destroyCall, endConversationOnServer]);

  const startConversation = async () => {
    if (isLoading || isConnected) return;
    
    setIsLoading(true);
    setError(null);
    destroyCall();

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-video-conversation', {
        body: { 
          replica_id: replicaId, 
          persona_id: personaId,
          conversation_name: 'Agent14 Video Concierge'
        }
      });

      if (fnError) throw new Error(fnError.message || 'Failed to create conversation');
      if (!data?.conversation_url || !data?.conversation_id) {
        throw new Error(data?.error || 'No conversation URL returned');
      }

      console.log('Conversation created:', data.conversation_id);
      conversationIdRef.current = data.conversation_id;

      if (!containerRef.current) throw new Error('Video container not ready');

      // Create Daily frame
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

      // Show the frame and hide loading overlay so user can interact with Daily.co UI
      setShowFrame(true);
      setIsLoading(false);

      callRef.current.on('joined-meeting', () => {
        console.log('Joined video call successfully');
        hasJoinedRef.current = true;
        localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify({
          id: conversationIdRef.current,
          timestamp: Date.now()
        }));
        setIsConnected(true);
      });

      callRef.current.on('left-meeting', () => {
        console.log('Left video call');
        endCall();
      });

      callRef.current.on('error', (e) => {
        console.error('Daily.co error:', e);
        setError('Video connection failed. Please try again.');
        destroyCall();
        conversationIdRef.current = null;
        setIsLoading(false);
        setShowFrame(false);
      });

      console.log('Joining call:', data.conversation_url);
      await callRef.current.join({ url: data.conversation_url });

    } catch (err) {
      console.error('Error starting video:', err);
      setError(err instanceof Error ? err.message : 'Connection failed');
      setIsLoading(false);
      setShowFrame(false);
      destroyCall();
      conversationIdRef.current = null;
      
      toast({
        title: "Connection Error",
        description: err instanceof Error ? err.message : 'Failed to start video',
        variant: "destructive",
      });
    }
  };

  const handleEndCall = async () => {
    if (callRef.current) {
      try {
        await callRef.current.leave();
      } catch (e) {
        // Force cleanup if leave fails
        await endCall();
      }
    } else {
      await endCall();
    }
  };

  // Only cleanup on unmount if we actually joined a call
  useEffect(() => {
    return () => {
      if (hasJoinedRef.current && conversationIdRef.current) {
        const convId = conversationIdRef.current;
        endConversationOnServer(convId);
        localStorage.removeItem(CONVERSATION_STORAGE_KEY);
      }
      destroyCall();
    };
  }, [destroyCall, endConversationOnServer]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-[500px] bg-black rounded-2xl overflow-hidden relative">
        {/* Video container */}
        <div 
          ref={containerRef} 
          className="absolute inset-0"
          style={{ display: showFrame ? 'block' : 'none' }}
        />
        
        {/* Start screen */}
        {!showFrame && !isLoading && (
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
            {error && <p className="text-destructive text-sm mb-4">{error}</p>}
            <Button onClick={startConversation} size="lg" className="gap-2">
              <Video className="h-5 w-5" />
              Start Video Chat
            </Button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-white">Connecting to video agent...</p>
          </div>
        )}
      </div>

      {isConnected && (
        <div className="mt-4 flex justify-center">
          <Button onClick={handleEndCall} variant="destructive" className="gap-2">
            <VideoOff className="h-5 w-5" />
            End Conversation
          </Button>
        </div>
      )}
    </div>
  );
};
