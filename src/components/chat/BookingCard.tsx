import { Booking } from '@/types/chat';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const statusColors = {
    confirmed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    pending: 'bg-gold/10 text-gold border-gold/20',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-soft">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-serif font-semibold text-foreground">
          {booking.restaurantName}
        </h3>
        <span
          className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium border capitalize',
            statusColors[booking.status]
          )}
        >
          {booking.status}
        </span>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{booking.partySize} guests</span>
        </div>
      </div>
      {booking.specialRequests && (
        <p className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
          <span className="font-medium">Note:</span> {booking.specialRequests}
        </p>
      )}
    </div>
  );
};
