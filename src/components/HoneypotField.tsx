import React from 'react';

interface HoneypotFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Invisible honeypot field that traps bots.
 * Bots often fill all form fields, including hidden ones.
 * If this field has a value, the submission is likely from a bot.
 */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <label htmlFor="website_url_field">
        Leave this field empty
      </label>
      <input
        type="text"
        id="website_url_field"
        name="website_url"
        value={value}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
