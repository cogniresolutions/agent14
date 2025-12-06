import { useEffect } from 'react';

// Create a global promise that resolves when chat is ready
let chatReadyPromise: Promise<void> | null = null;
let chatReadyResolve: (() => void) | null = null;
let scriptLoaded = false;

// Initialize the promise immediately
chatReadyPromise = new Promise((resolve) => {
  chatReadyResolve = resolve;
});

export const launchChat = () => {
  const esb = (window as any).embeddedservice_bootstrap;
  if (esb?.utilAPI?.launchChat) {
    esb.utilAPI.launchChat();
  } else {
    console.warn('Chat not ready yet, waiting...');
    // Wait for chat to be ready
    chatReadyPromise?.then(() => {
      const esb = (window as any).embeddedservice_bootstrap;
      if (esb?.utilAPI?.launchChat) {
        esb.utilAPI.launchChat();
      }
    });
  }
};

export const SalesforceChatbot = () => {
  useEffect(() => {
    // Check if already loaded
    if (scriptLoaded || (window as any).embeddedservice_bootstrap) {
      return;
    }

    scriptLoaded = true;

    const script = document.createElement('script');
    script.src = 'https://orgfarm-7eec8186c7.my.site.com/ESWAgt14MessagingChanne1764980162743/assets/js/bootstrap.min.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      try {
        const esb = (window as any).embeddedservice_bootstrap;
        if (esb?.settings) {
          esb.settings.language = 'en_US';
        }
        esb?.init(
          '00Daj00000fuXdh',
          'Agt14_Messaging_Channel_with_reCaptcha',
          'https://orgfarm-7eec8186c7.my.site.com/ESWAgt14MessagingChanne1764980162743',
          {
            scrt2URL: 'https://orgfarm-7eec8186c7.my.salesforce-scrt.com'
          }
        );

        // Wait for utilAPI to become available, then resolve
        const checkReady = setInterval(() => {
          if ((window as any).embeddedservice_bootstrap?.utilAPI?.launchChat) {
            clearInterval(checkReady);
            if (chatReadyResolve) {
              chatReadyResolve();
            }
            console.log('Salesforce chat is ready');
          }
        }, 100);

        // Clear interval after 10 seconds as fallback
        setTimeout(() => clearInterval(checkReady), 10000);
      } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Salesforce chat script');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};
