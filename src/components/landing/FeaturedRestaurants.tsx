import { Star, MapPin } from 'lucide-react';

const restaurants = [
  {
    name: 'The Golden Fork',
    cuisine: 'Fine Dining • French',
    location: 'Manhattan, NY',
    rating: 4.9,
    reviews: 2840,
    priceRange: '$$$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    badge: 'Top Rated',
  },
  {
    name: 'Sakura Garden',
    cuisine: 'Japanese • Sushi',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviews: 1920,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
    badge: 'Popular',
  },
  {
    name: 'Trattoria Bella',
    cuisine: 'Italian • Pasta',
    location: 'Chicago, IL',
    rating: 4.7,
    reviews: 3150,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    badge: null,
  },
  {
    name: 'Mesa Verde',
    cuisine: 'Mexican • Contemporary',
    location: 'Austin, TX',
    rating: 4.8,
    reviews: 1580,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    badge: 'New',
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

export const FeaturedRestaurants = () => {
  const handleOpenChat = () => {
    if (window.embeddedservice_bootstrap?.utilAPI?.launchChat) {
      window.embeddedservice_bootstrap.utilAPI.launchChat();
    }
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Restaurants
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover top-rated dining experiences available through Agent14
            </p>
          </div>
          <button
            onClick={handleOpenChat}
            className="text-primary text-sm font-medium hover:underline underline-offset-4"
          >
            View all restaurants →
          </button>
        </div>

        {/* Restaurant grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.name}
              onClick={handleOpenChat}
              className="group cursor-pointer rounded-2xl bg-background border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {restaurant.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full shadow-sm">
                    {restaurant.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {restaurant.name}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {restaurant.priceRange}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {restaurant.cuisine}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{restaurant.rating}</span>
                    <span className="text-muted-foreground">({restaurant.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-xs truncate max-w-[100px]">{restaurant.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner stats */}
        <div className="mt-16 p-8 rounded-2xl bg-background border border-border shadow-sm">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-display text-3xl font-bold text-foreground mb-1">500+</p>
              <p className="text-sm text-muted-foreground">Restaurant Partners</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-foreground mb-1">25+</p>
              <p className="text-sm text-muted-foreground">Cities Covered</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-foreground mb-1">100K+</p>
              <p className="text-sm text-muted-foreground">Tables Booked</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
