import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Lock } from 'lucide-react';
import agentLogo from '@/assets/agent14-logo-new.png';
import { z } from 'zod';

const passwordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidSession, setIsValidSession] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if user has a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsValidSession(true);
      } else {
        toast.error('Invalid or expired reset link. Please request a new one.');
        navigate('/auth');
      }
      setChecking(false);
    };

    // Listen for auth state changes (recovery event)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsValidSession(true);
          setChecking(false);
        }
      }
    );

    checkSession();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = passwordSchema.safeParse({ password, confirmPassword });
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast.success('Password updated successfully! You can now login.');
      
      // Sign out and redirect to login
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ice via-background to-ice/50 flex items-center justify-center">
        <div className="text-muted-foreground">Verifying reset link...</div>
      </div>
    );
  }

  if (!isValidSession) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice via-background to-ice/50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back button */}
        <a href="/auth" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </a>

        {/* Card */}
        <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <img src={agentLogo} alt="Agent14" className="h-14 w-auto" />
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-light text-primary tracking-wide uppercase">Agent</span>
              <span className="text-3xl font-bold text-gold">14</span>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2">
            Set New Password
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter your new password below
          </p>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
