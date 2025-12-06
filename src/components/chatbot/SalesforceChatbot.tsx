import { useEffect } from 'react';

export const SalesforceChatbot = () => {
  useEffect(() => {
    // Check if already loaded
    if ((window as any).embeddedservice_bootstrap) {
      return;
    }

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
      } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};
