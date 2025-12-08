import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "agent14_cookie_consent";
const COOKIE_PREFERENCES_KEY = "agent14_cookie_preferences";

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, new Date().toISOString());
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Cannot disable essential cookies
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
          {!showPreferences ? (
            /* Main Banner */
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We use cookies to enhance your browsing experience, provide personalized content, 
                    and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                    You can customize your preferences or reject non-essential cookies.{" "}
                    <Link to="/cookie-policy" className="text-primary hover:underline">
                      Learn more
                    </Link>
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleAcceptAll}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Accept All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRejectNonEssential}
                    >
                      Reject Non-Essential
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setShowPreferences(true)}
                      className="gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Customize
                    </Button>
                  </div>
                </div>
                <button
                  onClick={handleRejectNonEssential}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            /* Preferences Panel */
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Cookie Preferences
                  </h3>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Back"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">Essential Cookies</h4>
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        Required
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Necessary for the website to function. Cannot be disabled.
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-primary-foreground rounded-full" />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div 
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => togglePreference("analytics")}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <div 
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.analytics ? "bg-primary justify-end" : "bg-muted justify-start"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-colors ${
                      preferences.analytics ? "bg-primary-foreground" : "bg-muted-foreground"
                    }`} />
                  </div>
                </div>

                {/* Functional Cookies */}
                <div 
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => togglePreference("functional")}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">Functional Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable personalized features and remember your preferences.
                    </p>
                  </div>
                  <div 
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.functional ? "bg-primary justify-end" : "bg-muted justify-start"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-colors ${
                      preferences.functional ? "bg-primary-foreground" : "bg-muted-foreground"
                    }`} />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div 
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => togglePreference("marketing")}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">Marketing Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Used to deliver relevant advertisements and track campaign effectiveness.
                    </p>
                  </div>
                  <div 
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.marketing ? "bg-primary justify-end" : "bg-muted justify-start"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-colors ${
                      preferences.marketing ? "bg-primary-foreground" : "bg-muted-foreground"
                    }`} />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={handleSavePreferences} className="gap-2">
                  <Check className="w-4 h-4" />
                  Save Preferences
                </Button>
                <Button variant="outline" onClick={handleAcceptAll}>
                  Accept All
                </Button>
                <Button variant="ghost" onClick={() => setShowPreferences(false)}>
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                For more information, please read our{" "}
                <Link to="/cookie-policy" className="text-primary hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
