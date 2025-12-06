import { useEffect, useRef, useState, useCallback } from 'react';

// Declare Turnstile types
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    turnstileScriptLoaded?: boolean;
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

// Replace with your actual Turnstile Site Key from Cloudflare Dashboard
const TURNSTILE_SITE_KEY = '0x4AAAAAAAgPBcKj_CCDcQcY';

export const TurnstileWidget = ({ onVerify, onError, onExpire }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptError, setScriptError] = useState(false);
  const mountedRef = useRef(true);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;
    
    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
        theme: 'light',
        size: 'normal',
      });
    } catch (err) {
      console.error('Failed to render Turnstile widget:', err);
      setScriptError(true);
    }
  }, [onVerify, onError, onExpire]);

  useEffect(() => {
    mountedRef.current = true;

    // Check if script is already loaded
    if (window.turnstile && window.turnstileScriptLoaded) {
      setIsLoading(false);
      renderWidget();
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
    if (existingScript) {
      // Wait for it to load
      const checkLoaded = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkLoaded);
          window.turnstileScriptLoaded = true;
          if (mountedRef.current) {
            setIsLoading(false);
            renderWidget();
          }
        }
      }, 100);
      
      return () => {
        clearInterval(checkLoaded);
        mountedRef.current = false;
      };
    }

    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      window.turnstileScriptLoaded = true;
      if (mountedRef.current) {
        setIsLoading(false);
        renderWidget();
      }
    };

    script.onerror = () => {
      if (mountedRef.current) {
        setIsLoading(false);
        setScriptError(true);
      }
    };

    document.head.appendChild(script);

    return () => {
      mountedRef.current = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Widget may already be removed
        }
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  if (scriptError) {
    return (
      <div className="text-center text-sm text-red-500">
        Failed to load security check. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading security check...</span>
        </div>
      )}
      <div ref={containerRef} className="turnstile-container" />
    </div>
  );
};
