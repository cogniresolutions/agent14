import { useState } from 'react';
import { MapPin, Loader2, Navigation, Search, X, Star } from 'lucide-react';

interface Restaurant {
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  reviews: number;
  priceRange: string;
  image: string;
  distance: string;
  zipCode: string;
}

const allRestaurants: Restaurant[] = [
  {
    name: 'The Golden Fork',
    cuisine: 'Fine Dining • French',
    location: 'Manhattan, NY',
    rating: 4.9,
    reviews: 2840,
    priceRange: '$$$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    distance: '0.3 mi',
    zipCode: '10001',
  },
  {
    name: 'Sakura Garden',
    cuisine: 'Japanese • Sushi',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviews: 1920,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
    distance: '0.5 mi',
    zipCode: '94102',
  },
  {
    name: 'Trattoria Bella',
    cuisine: 'Italian • Pasta',
    location: 'Chicago, IL',
    rating: 4.7,
    reviews: 3150,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    distance: '0.8 mi',
    zipCode: '60601',
  },
  {
    name: 'Mesa Verde',
    cuisine: 'Mexican • Contemporary',
    location: 'Austin, TX',
    rating: 4.8,
    reviews: 1580,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    distance: '1.2 mi',
    zipCode: '78701',
  },
  {
    name: 'Ocean Blue',
    cuisine: 'Seafood • American',
    location: 'Miami, FL',
    rating: 4.6,
    reviews: 2100,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop',
    distance: '0.4 mi',
    zipCode: '33101',
  },
  {
    name: 'Spice Route',
    cuisine: 'Indian • Curry',
    location: 'Los Angeles, CA',
    rating: 4.7,
    reviews: 1850,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    distance: '0.6 mi',
    zipCode: '90001',
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

export const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ city: string; zipCode: string } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);

  const handleOpenChat = () => {
    if (window.embeddedservice_bootstrap?.utilAPI?.launchChat) {
      window.embeddedservice_bootstrap.utilAPI.launchChat();
    }
  };

  const detectLocation = async () => {
    setIsLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Agent14 Restaurant App',
              },
            }
          );
          
          if (!response.ok) throw new Error('Failed to get location details');
          
          const data = await response.json();
          const address = data.address;
          
          const city = address.city || address.town || address.village || address.municipality || 'Your Area';
          const zipCode = address.postcode || '';
          
          setUserLocation({ city, zipCode });
          setSearchQuery(zipCode || city);
          setShowResults(true);
          setNearbyRestaurants(allRestaurants.slice(0, 4));
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          setLocationError('Could not determine your location. Please enter manually.');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enter your location manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location unavailable. Please enter your location manually.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('Unable to get location. Please enter manually.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setShowResults(true);
    const filtered = allRestaurants.filter(
      (r) =>
        r.zipCode.includes(searchQuery) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNearbyRestaurants(filtered.length > 0 ? filtered : allRestaurants.slice(0, 4));
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    setUserLocation(null);
    setNearbyRestaurants([]);
  };

  return (
    <section className="py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Restaurants Near You
          </h2>
          <p className="text-muted-foreground text-lg">
            Use your location or enter a zip code to discover nearby dining options
          </p>
        </div>

        {/* Search form */}
        <div className="bg-background border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            {/* Location input */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter zip code or city..."
                className="w-full pl-12 pr-10 py-3.5 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Detect location button */}
            <button
              type="button"
              onClick={detectLocation}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-secondary border border-border rounded-xl text-foreground font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Navigation className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">Use My Location</span>
              <span className="sm:hidden">Locate</span>
            </button>

            {/* Search button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </form>

          {/* Error message */}
          {locationError && (
            <p className="mt-4 text-sm text-destructive flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
              {locationError}
            </p>
          )}

          {/* Location detected message */}
          {userLocation && (
            <p className="mt-4 text-sm text-emerald flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              Location detected: {userLocation.city} {userLocation.zipCode && `(${userLocation.zipCode})`}
            </p>
          )}
        </div>

        {/* Results */}
        {showResults && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Restaurants Near {userLocation?.city || searchQuery}
              </h3>
              <span className="text-sm text-muted-foreground">
                {nearbyRestaurants.length} found
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {nearbyRestaurants.map((restaurant) => (
                <div
                  key={restaurant.name}
                  onClick={handleOpenChat}
                  className="group cursor-pointer flex gap-4 p-4 bg-background border border-border rounded-xl hover:border-primary/30 hover:shadow-md transition-all"
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {restaurant.name}
                      </h4>
                      <span className="text-xs text-primary font-medium flex-shrink-0">
                        {restaurant.distance}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 truncate">
                      {restaurant.cuisine}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span className="font-medium text-foreground">{restaurant.rating}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{restaurant.priceRange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Book CTA */}
            <div className="mt-8 text-center">
              <button
                onClick={handleOpenChat}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Book a Table with Agent14
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
