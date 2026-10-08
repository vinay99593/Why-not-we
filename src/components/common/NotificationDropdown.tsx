import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCheck,
  Clock,
  X,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  Sparkles,
  MessageSquare,
  Building,
  Home,
  Check,
  Truck,
} from 'lucide-react';
import { AppNotification } from '../../types';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    unreadNotifCount,
    markNotificationRead,
    markAllNotificationsRead,
    setActivePage,
    setActiveBookingId,
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationRead(notif.id);

    if (notif.linkTab === 'orders' || notif.linkTab === 'bookings') {
      setActivePage('orders');
      if (notif.referenceId) {
        setActiveBookingId(notif.referenceId);
      }
    } else if (notif.linkTab === 'transport' || notif.type === 'transport') {
      setActivePage('transport');
    } else if (notif.linkTab === 'hotels') {
      setActivePage('hotels');
    } else if (notif.linkTab === 'hostels') {
      setActivePage('hostels');
    } else if (notif.linkTab === 'grocery_tracking' || notif.type === 'order') {
      setActivePage('orders');
    }

    onClose();
  };

  // Helper to get color and icon for each notification type
  const getNotificationVisuals = (notif: AppNotification) => {
    switch (notif.type) {
      case 'emergency':
        return {
          icon: AlertTriangle,
          bg: 'bg-rose-100 text-rose-700',
          dotBg: 'bg-rose-500',
        };
      case 'booking':
        return {
          icon: CheckCircle2,
          bg: 'bg-blue-100 text-blue-700',
          dotBg: 'bg-blue-600',
        };
      case 'transport':
        return {
          icon: Truck,
          bg: 'bg-blue-100 text-blue-700',
          dotBg: 'bg-blue-600',
        };
      case 'order':
        return {
          icon: ShoppingBag,
          bg: 'bg-teal-100 text-teal-700',
          dotBg: 'bg-teal-600',
        };
      case 'hotel':
        return {
          icon: Building,
          bg: 'bg-amber-100 text-amber-700',
          dotBg: 'bg-amber-500',
        };
      case 'hostel':
        return {
          icon: Home,
          bg: 'bg-indigo-100 text-indigo-700',
          dotBg: 'bg-indigo-600',
        };
      case 'message':
        return {
          icon: MessageSquare,
          bg: 'bg-teal-100 text-teal-700',
          dotBg: 'bg-teal-600',
        };
      case 'system':
      default:
        return {
          icon: Sparkles,
          bg: 'bg-slate-100 text-slate-700',
          dotBg: 'bg-blue-600',
        };
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Container: Bottom Sheet on Mobile / Dropdown on Desktop */}
      <div
        className="
          fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white shadow-2xl border-t border-slate-200
          max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-200
          md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 md:w-96 md:rounded-2xl md:border md:border-slate-200 md:shadow-2xl md:animate-in md:fade-in md:zoom-in-95
        "
      >
        {/* Mobile Pull Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-2.5 mb-1 md:hidden" />

        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-slate-900 font-display">Notifications</h3>
                {unreadNotifCount > 0 && (
                  <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                    {unreadNotifCount} new
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">Activity updates & live status</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadNotifCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Read all</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Close notifications"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2 bg-white">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
              filter === 'unread'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Unread ({unreadNotifCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[380px] sm:max-h-[420px] divide-y divide-slate-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-xs">You're all caught up</h4>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                No notifications to show. Bookings and task updates will appear here in real-time.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const { icon: VisualIcon, bg, dotBg } = getNotificationVisuals(notif);
              return (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 sm:p-4 transition-colors cursor-pointer text-left flex items-start gap-3 group relative ${
                    !notif.isRead
                      ? 'bg-blue-50/70 border-l-4 border-blue-600 hover:bg-blue-50'
                      : 'bg-white border-l-4 border-transparent hover:bg-slate-50'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`}
                  >
                    <VisualIcon className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4
                        className={`text-xs font-bold truncate ${
                          !notif.isRead ? 'text-slate-900 font-display' : 'text-slate-700'
                        }`}
                      >
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <span
                          className={`h-2 w-2 rounded-full ${dotBg} shrink-0 mt-0.5`}
                          title="Unread"
                        />
                      )}
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3" />
                        <span>{notif.timestamp}</span>
                      </div>

                      {notif.referenceId && (
                        <span className="flex items-center gap-1 text-blue-600 font-bold group-hover:underline">
                          <span>View #{notif.referenceId}</span>
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              setActivePage('orders');
              onClose();
            }}
            className="w-full text-center py-1.5 font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            View All Orders & Bookings
          </button>
        </div>
      </div>
    </>
  );
};
