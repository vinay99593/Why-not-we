import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Clock,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  QrCode,
  CreditCard,
  CheckCircle,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount,
    currentAddress,
    setIsLocationModalOpen,
    placeGroceryOrder,
    setActivePage,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [deliverySlot, setDeliverySlot] = useState('Instant Express (15-20 Mins)');
  const [deliveryInstruction, setDeliveryInstruction] = useState('Ring doorbell upon arrival');
  const [isPlacing, setIsPlacing] = useState(false);

  if (!isCartDrawerOpen) return null;

  const discount = cartTotal > 300 ? 30 : 0;
  const deliveryFee = cartTotal > 199 ? 0 : 29;
  const finalPayable = cartTotal - discount + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsPlacing(true);
    setTimeout(() => {
      const order = placeGroceryOrder(currentAddress, paymentMethod);
      setIsPlacing(false);
      setActivePage('orders');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-display">My Grocery Basket</h3>
              <p className="text-[11px] text-slate-300">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} · Express 15m Delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-slate-400 hover:text-rose-400 p-1 text-xs transition-colors"
                title="Clear Cart"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
            <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <ShoppingBag className="h-10 w-10 text-slate-300" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Your basket is currently empty</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Explore farm-fresh vegetables, dairy, 20L water cans, and daily staples.
            </p>
            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                setActivePage('grocery');
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-800">
            {/* Delivery address banner */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                <div className="truncate">
                  <div className="font-bold text-slate-900 truncate">{currentAddress.label}: {currentAddress.street}</div>
                  <div className="text-slate-400 text-[10px] truncate">{currentAddress.area}, {currentAddress.city}</div>
                </div>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="text-amber-600 font-bold hover:underline shrink-0 ml-2"
              >
                Change
              </button>
            </div>

            {/* Delivery Slot */}
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Delivery Time Slot</div>
              <div className="grid grid-cols-2 gap-2">
                {['Instant Express (15-20 Mins)', 'Evening (7:00 PM - 9:00 PM)'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setDeliverySlot(slot)}
                    className={`p-2 rounded-xl border text-left text-[11px] font-medium transition-all ${
                      deliverySlot === slot
                        ? 'border-slate-900 bg-slate-900 text-white font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-3 flex items-center justify-between gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-12 w-12 rounded-xl object-cover shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-900 truncate">{item.product.name}</h5>
                    <div className="text-[10px] text-slate-400">{item.product.unit}</div>
                    <div className="font-bold text-slate-900 mt-0.5">
                      ₹{item.product.price}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">
                        × {item.quantity} = ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, -1)}
                      className="p-1 hover:text-amber-600 transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-bold text-xs min-w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, 1)}
                      className="p-1 hover:text-amber-600 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery instructions */}
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Rider Instructions</div>
              <input
                type="text"
                value={deliveryInstruction}
                onChange={(e) => setDeliveryInstruction(e.target.value)}
                placeholder="e.g. Leave with security guard, don't ring bell"
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 focus:border-slate-900 focus:outline-hidden"
              />
            </div>

            {/* Payment Method */}
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Payment Method</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI QR', icon: QrCode },
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'cash', label: 'Cash', icon: CheckCircle },
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        paymentMethod === pm.id
                          ? 'border-slate-900 bg-white font-bold text-slate-900 shadow-xs'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 mx-auto mb-0.5 text-slate-700" />
                      <span className="text-[10px]">{pm.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-medium text-slate-900">₹{cartTotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Cart Savings Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Express Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  <span>₹{deliveryFee}</span>
                )}
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Grand Total</span>
                <span className="font-mono text-base">₹{finalPayable}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">To Pay</span>
              <div className="text-base font-black text-slate-900 font-mono">₹{finalPayable}</div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isPlacing}
              className="flex-1 max-w-[240px] py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              {isPlacing ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Placing Order...</span>
                </>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight className="h-4 w-4 text-amber-400" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
