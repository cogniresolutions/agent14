import { Gift, Star, Percent, Crown, Trophy, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Percent,
    title: 'Exclusive Discounts',
    description: 'Get up to 20% off at partner restaurants with every booking.',
  },
  {
    icon: Star,
    title: 'Priority Reservations',
    description: 'Skip the waitlist and get first access to popular tables.',
  },
  {
    icon: Gift,
    title: 'Birthday Rewards',
    description: 'Enjoy a complimentary dining experience on your special day.',
  },
  {
    icon: Crown,
    title: 'VIP Treatment',
    description: 'Receive special perks and personalized recommendations.',
  },
];

const tiers = [
  {
    name: 'Silver',
    points: '0 - 500',
    perks: ['5% discount on bookings', 'Early access to new restaurants', 'Birthday reward'],
    color: 'bg-muted',
    textColor: 'text-foreground',
  },
  {
    name: 'Gold',
    points: '501 - 1500',
    perks: ['10% discount on bookings', 'Priority reservations', 'Free dessert vouchers', 'Exclusive events'],
    color: 'bg-accent',
    textColor: 'text-accent-foreground',
    popular: true,
  },
  {
    name: 'Platinum',
    points: '1500+',
    perks: ['20% discount on bookings', 'Dedicated concierge', 'Complimentary upgrades', 'VIP lounge access'],
    color: 'bg-primary',
    textColor: 'text-primary-foreground',
  },
];

declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      utilAPI?: {
        launchChat: () => void;
      };
    };
  }
}

export const LoyaltyProgram = () => {
  const handleOpenChat = () => {
    if (window.embeddedservice_bootstrap?.utilAPI?.launchChat) {
      window.embeddedservice_bootstrap.utilAPI.launchChat();
    }
  };

  return (
    <section id="loyalty" className="py-20 md:py-28 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Loyalty Program
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join our exclusive rewards program
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sign up for free and start earning rewards with every reservation. 
            Unlock exclusive benefits as you dine more.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="p-6 rounded-xl bg-background border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Membership tiers */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Membership Tiers
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 rounded-2xl border ${
                  tier.popular 
                    ? 'border-accent shadow-lg scale-105' 
                    : 'border-border'
                } bg-background`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl ${tier.color} ${tier.textColor} flex items-center justify-center mb-4`}>
                  <Trophy className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-foreground mb-1">{tier.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{tier.points} points</p>
                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Star className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-background rounded-2xl border border-border p-8 md:p-12">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to start earning rewards?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of members already enjoying exclusive dining benefits. 
            Sign up takes less than a minute.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpenChat}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition-all"
            >
              <Gift className="w-5 h-5" />
              Join Free Now
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all"
            >
              Learn More
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Instant access to member benefits
          </p>
        </div>
      </div>
    </section>
  );
};
