import { useState, useEffect, ReactNode } from 'react';
import { TurnstileWidget } from './TurnstileWidget';
import { Shield, CheckCircle } from 'lucide-react';
import logo from '@/assets/agent14-logo-new.png';

interface SecurityGateProps {
  children: ReactNode;
}

const VERIFICATION_KEY = 'agent14_verified';
const VERIFICATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const SecurityGate = ({ children }: SecurityGateProps) => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if user is already verified
    const stored = localStorage.getItem(VERIFICATION_KEY);
    if (stored) {
      const { timestamp } = JSON.parse(stored);
      if (Date.now() - timestamp < VERIFICATION_EXPIRY) {
        setIsVerified(true);
        return;
      }
      localStorage.removeItem(VERIFICATION_KEY);
    }
    setIsVerified(false);
  }, []);

  const handleVerify = (token: string) => {
    setIsVerifying(true);
    
    // Store verification with timestamp
    localStorage.setItem(VERIFICATION_KEY, JSON.stringify({
      verified: true,
      timestamp: Date.now(),
      token: token.substring(0, 20) // Store partial token for reference
    }));

    // Show success animation
    setShowSuccess(true);
    setTimeout(() => {
      setIsVerified(true);
    }, 1500);
  };

  const handleError = () => {
    setIsVerifying(false);
    console.error('Turnstile verification failed');
  };

  const handleExpire = () => {
    setIsVerifying(false);
  };

  // Loading state
  if (isVerified === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Verified - show app
  if (isVerified) {
    return <>{children}</>;
  }

  // Security check gate
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logo} alt="Agent14" className="h-12 w-auto" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Security Verification
          </h1>
          <p className="text-muted-foreground">
            Please complete the security check to continue
          </p>
        </div>

        {/* Security card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          {showSuccess ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Verification Complete
                </h3>
                <p className="text-sm text-muted-foreground">
                  Redirecting you to Agent14...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Human Verification
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Protected by Cloudflare Turnstile
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <TurnstileWidget
                  onVerify={handleVerify}
                  onError={handleError}
                  onExpire={handleExpire}
                />
              </div>

              {isVerifying && (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Verifying...
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          This security check helps protect Agent14 from bots and automated abuse.
        </p>
      </div>
    </div>
  );
};
