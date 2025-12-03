import { BookingCard } from './BookingCard';
import { Booking } from '@/types/chat';
import { CalendarDays, History, HelpCircle } from 'lucide-react';

interface SidebarProps {
  currentBooking: Booking | null;
}

export const Sidebar = ({ currentBooking }: SidebarProps) => {
  return (
    <aside className="w-80 bg-card border-l border-border p-6 hidden lg:block overflow-y-auto">
      <div className="space-y-6">
        {currentBooking && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-4 h-4 text-primary" />
              <h2 className="font-serif font-semibold text-foreground">Current Booking</h2>
            </div>
            <BookingCard booking={currentBooking} />
          </section>
        )}

        <section>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <h2 className="font-serif font-semibold text-foreground">How can we help?</h2>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Modify reservation details
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Cancel your booking
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Get restaurant information
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Special dining requests
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Connect with a human agent
            </li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-primary" />
            <h2 className="font-serif font-semibold text-foreground">Response Times</h2>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">AI Response</span>
              <span className="text-sm font-medium text-emerald-600">&lt; 3 sec</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Human Agent</span>
              <span className="text-sm font-medium text-gold">~2 min</span>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};
