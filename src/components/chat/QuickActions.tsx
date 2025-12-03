import { Button } from '@/components/ui/button';
import { Calendar, XCircle, Info, UserPlus, Phone } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
  disabled?: boolean;
}

const actions = [
  { id: 'modify', label: 'Modify Booking', icon: Calendar, action: 'I need to modify my booking' },
  { id: 'cancel', label: 'Cancel Booking', icon: XCircle, action: 'I want to cancel my reservation' },
  { id: 'info', label: 'Restaurant Info', icon: Info, action: 'Tell me more about the restaurant' },
  { id: 'group', label: 'Group Booking', icon: UserPlus, action: 'I need help with a group booking' },
  { id: 'escalate', label: 'Speak to Agent', icon: Phone, action: 'I would like to speak to a human agent' },
];

export const QuickActions = ({ onAction, disabled }: QuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 bg-secondary/30 border-t border-border">
      {actions.map((action) => {
        const Icon = action.icon;
        const isEscalate = action.id === 'escalate';
        return (
          <Button
            key={action.id}
            variant={isEscalate ? 'escalate' : 'quickAction'}
            size="sm"
            onClick={() => onAction(action.action)}
            disabled={disabled}
            className="gap-1.5"
          >
            <Icon className="w-3.5 h-3.5" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
};
