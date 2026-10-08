import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell } from 'lucide-react';

interface NotificationBellButtonProps {
  variant?: 'light' | 'dark' | 'outline';
  className?: string;
}

export const NotificationBellButton: React.FC<NotificationBellButtonProps> = ({
  variant = 'outline',
  className = '',
}) => {
  const { unreadNotifCount, isNotificationModalOpen, setIsNotificationModalOpen } = useApp();

  const variantClasses = {
    outline:
      'border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300',
    light:
      'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
    dark:
      'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700 hover:text-white',
  }[variant];

  return (
    <button
      onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
      className={`relative p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center group ${variantClasses} ${className}`}
      aria-label="View Notifications"
      title={`${unreadNotifCount} unread notifications`}
    >
      <Bell
        className={`h-4.5 w-4.5 transition-transform group-hover:rotate-12 ${
          unreadNotifCount > 0 ? 'text-blue-600' : ''
        }`}
      />

      {unreadNotifCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4.5 min-w-4.5 px-1 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-pulse">
          {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
        </span>
      )}
    </button>
  );
};
