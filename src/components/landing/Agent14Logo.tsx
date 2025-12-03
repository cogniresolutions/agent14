interface Agent14LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
}

export const Agent14Logo = ({ className = '', size = 'md', variant = 'default' }: Agent14LogoProps) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const colors = {
    default: {
      bg: 'from-primary via-primary to-accent',
      accent: 'text-primary-foreground',
      ring: 'ring-primary/20',
    },
    light: {
      bg: 'from-primary-foreground/20 via-primary-foreground/10 to-primary-foreground/5',
      accent: 'text-primary-foreground',
      ring: 'ring-primary-foreground/20',
    },
  };

  return (
    <div
      className={`${sizes[size]} relative rounded-xl bg-gradient-to-br ${colors[variant].bg} flex items-center justify-center shadow-lg ring-1 ${colors[variant].ring} ${className}`}
    >
      {/* AI Agent Icon - Sleek crosshair/target with agent silhouette vibe */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`w-3/5 h-3/5 ${colors[variant].accent}`}
        strokeWidth="1.5"
        stroke="currentColor"
      >
        {/* Outer targeting ring */}
        <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
        
        {/* Inner targeting ring */}
        <circle cx="12" cy="12" r="5" strokeOpacity="0.6" />
        
        {/* Crosshair lines */}
        <path d="M12 2v4" strokeLinecap="round" />
        <path d="M12 18v4" strokeLinecap="round" />
        <path d="M2 12h4" strokeLinecap="round" />
        <path d="M18 12h4" strokeLinecap="round" />
        
        {/* Center dot - agent core */}
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        
        {/* AI spark accent */}
        <path d="M12 8l0.5 1.5L14 10l-1.5 0.5L12 12l-0.5-1.5L10 10l1.5-0.5L12 8z" fill="currentColor" stroke="none" opacity="0.8" />
      </svg>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent to-white/10" />
    </div>
  );
};
