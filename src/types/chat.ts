export interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface Booking {
  id: string;
  restaurantName: string;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  specialRequests?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
}
