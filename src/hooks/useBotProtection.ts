import { useState, useEffect, useCallback } from 'react';

interface BotProtectionResult {
  isBot: boolean;
  reason?: string;
}

interface BotProtectionHook {
  honeypotValue: string;
  setHoneypotValue: (value: string) => void;
  validateSubmission: () => BotProtectionResult;
  getHoneypotProps: () => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    tabIndex: number;
    autoComplete: string;
    'aria-hidden': boolean;
  };
}

const MIN_FORM_TIME_MS = 3000; // Minimum 3 seconds to fill a form (humans take longer)
const MAX_FORM_TIME_MS = 3600000; // Maximum 1 hour (form shouldn't be open forever)

export function useBotProtection(): BotProtectionHook {
  const [honeypotValue, setHoneypotValue] = useState('');
  const [formLoadTime] = useState(() => Date.now());

  const validateSubmission = useCallback((): BotProtectionResult => {
    const submissionTime = Date.now();
    const timeSpent = submissionTime - formLoadTime;

    // Check 1: Honeypot field should be empty (bots often fill all fields)
    if (honeypotValue.trim() !== '') {
      console.warn('Bot detected: honeypot field was filled');
      return { isBot: true, reason: 'Invalid form submission detected' };
    }

    // Check 2: Form submitted too quickly (likely a bot)
    if (timeSpent < MIN_FORM_TIME_MS) {
      console.warn('Bot detected: form submitted too quickly', { timeSpent });
      return { isBot: true, reason: 'Please take your time to fill out the form' };
    }

    // Check 3: Form open too long (possibly a replay attack)
    if (timeSpent > MAX_FORM_TIME_MS) {
      console.warn('Bot detected: form open too long', { timeSpent });
      return { isBot: true, reason: 'Session expired. Please refresh the page' };
    }

    return { isBot: false };
  }, [honeypotValue, formLoadTime]);

  const getHoneypotProps = useCallback(() => ({
    value: honeypotValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHoneypotValue(e.target.value),
    tabIndex: -1,
    autoComplete: 'off',
    'aria-hidden': true as const,
  }), [honeypotValue]);

  return {
    honeypotValue,
    setHoneypotValue,
    validateSubmission,
    getHoneypotProps,
  };
}
