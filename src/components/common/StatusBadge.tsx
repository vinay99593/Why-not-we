import React from 'react';
import {
  Clock,
  CheckCircle2,
  Navigation,
  Wrench,
  AlertCircle,
  XCircle,
  ShieldCheck,
  Check,
  Fuel,
  Package,
} from 'lucide-react';

export type StatusType =
  | 'requested'
  | 'pending'
  | 'accepted'
  | 'assigned'
  | 'on_the_way'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rejected'
  | 'approved'
  | 'active'
  | 'verified'
  | 'suspended'
  | 'paid'
  | 'unpaid'
  | 'refunded'
  | 'bowser_dispatched'
  | 'dispensing'
  | 'confirmed'
  | 'delivered'
  | string;

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  showDot = false,
  showIcon = true,
  className = '',
}) => {
  const normalized = (status || '').toLowerCase().replace(/[\s-]/g, '_');

  // Brand Color Palette Mapping
  // Blue (#2563EB) -> Accepted, Assigned, On The Way
  // Teal (#14B8A6) -> Arrived, In Progress, Dispensing, Active
  // Amber (#F59E0B) -> Requested, Pending, Reviewing
  // Green (#16A34A) -> Completed, Delivered, Paid, Approved, Verified
  // Red (#DC2626) -> Cancelled, Rejected, Suspended, Failed
  let colorTheme: {
    bg: string;
    text: string;
    border: string;
    dotBg: string;
    pingBg?: string;
    defaultLabel: string;
    IconComponent: React.ComponentType<{ className?: string }>;
  } = {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dotBg: 'bg-slate-400',
    defaultLabel: status.replace(/_/g, ' '),
    IconComponent: Clock,
  };

  switch (normalized) {
    // 1. Amber (Accent / Warning / Pending / Searching)
    case 'requested':
    case 'pending':
    case 'waiting':
    case 'finding_driver':
      colorTheme = {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        dotBg: 'bg-amber-500',
        pingBg: 'bg-amber-400',
        defaultLabel:
          normalized === 'finding_driver'
            ? 'Finding Driver'
            : normalized === 'requested'
            ? 'Request Sent'
            : 'Pending',
        IconComponent: Clock,
      };
      break;

    // 2. Primary Blue (Accepted / Dispatch / Driver Assigned)
    case 'accepted':
    case 'assigned':
    case 'driver_assigned':
      colorTheme = {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dotBg: 'bg-blue-600',
        pingBg: 'bg-blue-400',
        defaultLabel: normalized === 'driver_assigned' ? 'Driver Assigned' : 'Accepted',
        IconComponent: CheckCircle2,
      };
      break;

    // 3. Secondary Teal (On the Way / In Transit / Arriving / Loading / Active)
    case 'on_the_way':
    case 'bowser_dispatched':
    case 'in_transit':
    case 'arriving_pickup':
    case 'trip_started':
      colorTheme = {
        bg: 'bg-teal-50',
        text: 'text-teal-800',
        border: 'border-teal-200',
        dotBg: 'bg-teal-500',
        pingBg: 'bg-teal-400',
        defaultLabel:
          normalized === 'bowser_dispatched'
            ? 'Bowser Dispatched'
            : normalized === 'arriving_pickup'
            ? 'Driver Arriving'
            : normalized === 'trip_started'
            ? 'Trip Started'
            : 'On the Way',
        IconComponent: Navigation,
      };
      break;

    case 'arrived':
    case 'arrived_pickup':
    case 'arrived_destination':
      colorTheme = {
        bg: 'bg-teal-50',
        text: 'text-teal-800',
        border: 'border-teal-200',
        dotBg: 'bg-teal-500',
        pingBg: 'bg-teal-400',
        defaultLabel:
          normalized === 'arrived_pickup'
            ? 'Arrived at Pickup'
            : normalized === 'arrived_destination'
            ? 'Arrived at Drop'
            : 'Arrived at Site',
        IconComponent: Navigation,
      };
      break;

    case 'loading':
    case 'unloading':
      colorTheme = {
        bg: 'bg-teal-50',
        text: 'text-teal-800',
        border: 'border-teal-200',
        dotBg: 'bg-teal-500',
        pingBg: 'bg-teal-400',
        defaultLabel: normalized === 'loading' ? 'Loading Goods' : 'Unloading',
        IconComponent: Package,
      };
      break;

    case 'in_progress':
    case 'dispensing':
    case 'working':
    case 'active':
      colorTheme = {
        bg: 'bg-teal-50',
        text: 'text-teal-800',
        border: 'border-teal-200',
        dotBg: 'bg-teal-500',
        pingBg: 'bg-teal-400',
        defaultLabel:
          normalized === 'in_progress'
            ? 'In Progress'
            : normalized === 'dispensing'
            ? 'Dispensing Fuel'
            : 'Active',
        IconComponent: Wrench,
      };
      break;

    case 'confirmed':
      colorTheme = {
        bg: 'bg-teal-50',
        text: 'text-teal-800',
        border: 'border-teal-200',
        dotBg: 'bg-teal-500',
        defaultLabel: 'Confirmed',
        IconComponent: CheckCircle2,
      };
      break;

    // 4. Success Green (Completed / Delivered / Paid / Verified)
    case 'completed':
    case 'delivered':
    case 'paid':
    case 'approved':
    case 'verified':
      colorTheme = {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dotBg: 'bg-emerald-500',
        defaultLabel:
          normalized === 'completed'
            ? 'Completed'
            : normalized === 'delivered'
            ? 'Delivered'
            : normalized === 'paid'
            ? 'Paid'
            : normalized === 'approved'
            ? 'Approved'
            : 'Verified',
        IconComponent: normalized === 'verified' ? ShieldCheck : CheckCircle2,
      };
      break;

    // 5. Danger Red (Cancelled / Rejected / Suspended / Failed / Unpaid)
    case 'cancelled':
    case 'rejected':
    case 'suspended':
    case 'failed':
      colorTheme = {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dotBg: 'bg-rose-500',
        defaultLabel:
          normalized === 'cancelled'
            ? 'Cancelled'
            : normalized === 'rejected'
            ? 'Rejected'
            : normalized === 'suspended'
            ? 'Suspended'
            : 'Failed',
        IconComponent: XCircle,
      };
      break;

    case 'unpaid':
      colorTheme = {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dotBg: 'bg-amber-500',
        defaultLabel: 'Payment Pending',
        IconComponent: AlertCircle,
      };
      break;
  }

  // Size configurations
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-semibold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  }[size];

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  }[size];

  const dotSizes = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  }[size];

  const Icon = colorTheme.IconComponent;
  const displayText = label || colorTheme.defaultLabel;

  // Show live pulsing dot automatically for active progress statuses if requested
  const isLive = ['requested', 'on_the_way', 'arrived', 'in_progress', 'dispensing', 'active'].includes(
    normalized
  );
  const shouldRenderDot = showDot || isLive;

  // Subtle pulse animation specifically when status is 'Active' or 'On the Way'
  const isPulsingStatus =
    normalized === 'active' ||
    normalized === 'on_the_way' ||
    status === 'Active' ||
    status === 'On the Way';

  const pulseClasses = isPulsingStatus ? 'animate-status-pulse' : '';

  // Use the 'animate-badge-fade-in' class for entry
  const entranceClasses = 'animate-badge-fade-in fade-in transition-opacity duration-300';

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-all will-change-transform ${entranceClasses} ${pulseClasses} ${colorTheme.bg} ${colorTheme.text} ${colorTheme.border} ${sizeClasses} ${className}`}
    >
      {shouldRenderDot && (
        <span className="relative flex shrink-0">
          {colorTheme.pingBg && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorTheme.pingBg}`}
            />
          )}
          <span className={`relative inline-flex rounded-full ${colorTheme.dotBg} ${dotSizes}`} />
        </span>
      )}

      {showIcon && !shouldRenderDot && (
        <Icon className={`${iconSizes} shrink-0`} />
      )}

      <span className="truncate leading-none">{displayText}</span>
    </span>
  );
};

export default StatusBadge;
