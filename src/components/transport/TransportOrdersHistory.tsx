import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TransportOrder } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  RotateCcw,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Package,
  Calendar,
  Share2,
  Check,
} from 'lucide-react';

interface TransportOrdersHistoryProps {
  onViewTracking: (orderId: string) => void;
  onRebookOrder: (order: TransportOrder) => void;
}

export const TransportOrdersHistory: React.FC<TransportOrdersHistoryProps> = ({
  onViewTracking,
  onRebookOrder,
}) => {
  const { transportOrders, rateTransportOrder } = useApp();

  const [ratingModalOrder, setRatingModalOrder] = useState<TransportOrder | null>(null);
  const [selectedStars, setSelectedStars] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [ratingSuccess, setRatingSuccess] = useState(false);

  const handleSaveRating = () => {
    if (!ratingModalOrder) return;
    rateTransportOrder(ratingModalOrder.id, {
      stars: selectedStars,
      feedback: feedbackText || 'Very punctual and careful handling of items.',
    });
    setRatingSuccess(true);
    setTimeout(() => {
      setRatingModalOrder(null);
      setRatingSuccess(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-black text-base text-slate-900 font-display">
            My Transport & Delivery Orders ({transportOrders.length})
          </h3>
          <p className="text-xs text-slate-500">
            Track live trips or quickly rebook previous vehicle routes
          </p>
        </div>
      </div>

      {transportOrders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
          No transport orders placed yet. Choose a Bike, Auto or Mini Truck to get started!
        </div>
      ) : (
        <div className="space-y-3.5">
          {transportOrders.map((order) => {
            const isCompleted = order.status === 'delivered';
            const isActive = !isCompleted && order.status !== 'cancelled';

            return (
              <div
                key={order.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                {/* Left: Vehicle Image & Route details */}
                <div className="flex items-start gap-4">
                  <img
                    src={order.vehicleImage}
                    alt={order.vehicleName}
                    className="h-16 w-16 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm text-slate-900 font-display">
                        {order.vehicleName}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">#{order.id}</span>
                      <StatusBadge status={order.status} size="sm" showDot />
                    </div>

                    <div className="text-slate-700 text-xs flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold">{order.pickupAddress.area}</span>
                      <span className="text-slate-400">→</span>
                      <span className="font-semibold">{order.dropAddress.area}</span>
                      <span className="text-slate-400">({order.distanceKm} km)</span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <span>Load: <strong className="capitalize">{order.goodsCategory}</strong> ({order.weightRange}) · </span>
                      <span>Total: <strong className="font-mono text-slate-900 font-bold">₹{order.totalFare}</strong></span>
                      <span> · {order.createdAt}</span>
                    </div>

                    {order.rating && (
                      <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span>Rated {order.rating.stars} Stars</span>
                        {order.rating.feedback && (
                          <span className="font-normal text-slate-400 italic truncate max-w-[200px]">
                            — “{order.rating.feedback}”
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
                  {/* Active trip -> Track Live */}
                  {isActive && (
                    <button
                      type="button"
                      onClick={() => onViewTracking(order.id)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-colors shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Track Live Progress</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}

                  {/* Completed -> Book Again */}
                  {isCompleted && (
                    <>
                      {!order.rating && (
                        <button
                          type="button"
                          onClick={() => setRatingModalOrder(order)}
                          className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Star className="h-3.5 w-3.5 text-amber-600" />
                          <span>Rate Trip</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onRebookOrder(order)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Book Again</span>
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => onViewTracking(order.id)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                    title="View Trip Summary"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RATING MODAL */}
      {ratingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-black text-base text-slate-900 font-display">How was your delivery?</h4>
                <p className="text-xs text-slate-500">{ratingModalOrder.vehicleName} · Trip #{ratingModalOrder.id}</p>
              </div>
              <button
                onClick={() => setRatingModalOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {ratingSuccess ? (
              <div className="py-6 text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h5 className="font-bold text-sm text-slate-900">Thank you for rating!</h5>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 5-Star Rating Buttons */}
                <div className="flex items-center justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedStars(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-120"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= selectedStars
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Driver & Vehicle Experience</label>
                  <textarea
                    rows={3}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Careful handling, on-time arrival, helpful driver..."
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:border-blue-600 focus:outline-hidden"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveRating}
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
