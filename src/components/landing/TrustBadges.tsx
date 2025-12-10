import salesforceLogo from '@/assets/salesforce-logo.svg';

const partners = [
  { name: 'Hilton', initial: 'H' },
  { name: 'Marriott', initial: 'M' },
  { name: 'Four Seasons', initial: 'FS' },
  { name: 'Ritz Carlton', initial: 'RC' },
  { name: 'Hyatt', initial: 'HY' },
];

export const TrustBadges = () => {
  return (
    <section className="py-12 px-6 bg-background border-b border-border">
      <div className="container mx-auto max-w-6xl">
        {/* Technical Partner Badge */}
        <div className="flex flex-col items-center mb-10 pb-8 border-b border-border">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider font-medium">
            Technical Partner
          </p>
          <div className="flex items-center gap-3">
            <img 
              src={salesforceLogo} 
              alt="Salesforce" 
              className="h-10 md:h-12 w-auto"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Powered by Salesforce Agentforce AI
          </p>
        </div>

        {/* Trusted By Section */}
        <p className="text-center text-muted-foreground mb-8">
          Trusted by restaurants and hotels in <span className="text-primary font-semibold">over 50+ countries</span>
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-bold text-lg">
                {partner.initial}
              </div>
              <span className="font-semibold hidden sm:block">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};