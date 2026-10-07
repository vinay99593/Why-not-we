import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Clock, X, ExternalLink, AlertTriangle } from 'lucide-react';

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

  if (!isOpen) return null;

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.linkTab === 'orders' || notif.linkTab === 'bookings') {
      setActivePage('orders');
      if (notif.referenceId) {
        setActiveBookingId(notif.referenceId);
      }
    } else if (notif.linkTab === 'grocery_tracking') {
      setActivePage('orders');
    }
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-amber-400" />
          <h4 className="font-bold text-sm font-display">Notifications</h4>
          {unreadNotifCount > 0 && (
            <span className="text-[11px] font-semibold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
              {unreadNotifCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadNotifCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              <span>Read all</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No notifications yet. Activity updates will appear here.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                !notif.isRead ? 'bg-amber-50/30' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                  {notif.type === 'emergency' && (
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                  )}
                  <span>{notif.title}</span>
                </div>
                {!notif.isRead && (
                  <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1" />
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {notif.message}
              </p>
              <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{notif.timestamp}</span>
                </div>
                {notif.referenceId && (
                  <span className="flex items-center gap-1 text-slate-500 font-medium hover:text-slate-800">
                    <span>View details</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <button
          onClick={() => {
            setActivePage('orders');
            onClose();
          }}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          View All Bookings & Orders
        </button>
      </div>
    </div>
  );
};
