import { useEffect } from 'react';

// Create a global promise that resolves when chat is ready
let chatReadyPromise: Promise<void> | null = null;
let chatReadyResolve: (() => void) | null = null;
let scriptLoaded = false;
let chatIsReady = false;

// Initialize the promise immediately
chatReadyPromise = new Promise((resolve) => {
  chatReadyResolve = resolve;
});

// Check if chat is ready to launch immediately
export const isChatReady = (): boolean => {
  return chatIsReady && !!(window as any).embeddedservice_bootstrap?.utilAPI?.launchChat;
};

// Launch chat - returns a promise that resolves when chat is launched
export const launchChat = async (): Promise<void> => {
  console.log('[Agent14] launchChat called');
  const esb = (window as any).embeddedservice_bootstrap;
  
  if (esb?.utilAPI?.launchChat) {
    console.log('[Agent14] Launching chat directly');
    esb.utilAPI.launchChat();
    return;
  }
  
  console.log('[Agent14] Chat not ready, waiting for promise...');
  await chatReadyPromise;
  
  const esbReady = (window as any).embeddedservice_bootstrap;
  console.log('[Agent14] Promise resolved, launching chat');
  if (esbReady?.utilAPI?.launchChat) {
    esbReady.utilAPI.launchChat();
  } else {
    console.error('[Agent14] utilAPI still not available after promise resolved');
  }
};

export const SalesforceChatbot = () => {
  useEffect(() => {
    console.log('[Agent14] SalesforceChatbot mounting');
    
    // Check if already loaded
    if (scriptLoaded) {
      console.log('[Agent14] Script already loaded, skipping');
      return;
    }
    
    if ((window as any).embeddedservice_bootstrap) {
      console.log('[Agent14] embeddedservice_bootstrap already exists');
      return;
    }

    scriptLoaded = true;
    console.log('[Agent14] Loading Salesforce script...');

    const script = document.createElement('script');
    script.src = 'https://orgfarm-7eec8186c7.my.site.com/ESWAgt14MessagingChanne1764980162743/assets/js/bootstrap.min.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      console.log('[Agent14] Script loaded successfully');
      try {
        const esb = (window as any).embeddedservice_bootstrap;
        console.log('[Agent14] embeddedservice_bootstrap object:', esb);
        
        if (esb?.settings) {
          esb.settings.language = 'en_US';
        }
        
        console.log('[Agent14] Calling esb.init...');
        esb?.init(
          '00Daj00000fuXdh',
          'Agt14_Messaging_Channel_with_reCaptcha',
          'https://orgfarm-7eec8186c7.my.site.com/ESWAgt14MessagingChanne1764980162743',
          {
            scrt2URL: 'https://orgfarm-7eec8186c7.my.salesforce-scrt.com'
          }
        );
        console.log('[Agent14] esb.init called');

        // Wait for utilAPI to become available, then resolve
        const checkReady = setInterval(() => {
          const currentEsb = (window as any).embeddedservice_bootstrap;
          if (currentEsb?.utilAPI?.launchChat) {
            console.log('[Agent14] utilAPI.launchChat is now available');
            clearInterval(checkReady);
            chatIsReady = true;
            if (chatReadyResolve) {
              chatReadyResolve();
            }
          }
        }, 100);

        // Clear interval after 10 seconds as fallback
        setTimeout(() => {
          clearInterval(checkReady);
          console.log('[Agent14] Timeout reached, clearing check interval');
        }, 10000);
      } catch (err) {
        console.error('[Agent14] Failed to initialize Embedded Messaging:', err);
      }
    };

    script.onerror = (err) => {
      console.error('[Agent14] Failed to load Salesforce chat script:', err);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};
