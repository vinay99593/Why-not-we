import React from 'react';
import { useApp } from '../../context/AppContext';
import { GroceryProduct } from '../../types';
import { X, ShoppingBag, Plus, Minus, Star, Clock, ShieldCheck } from 'lucide-react';

interface ProductDetailsModalProps {
  product: GroceryProduct | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { cartItems, addToCart, updateCartQuantity } = useApp();

  if (!product) return null;

  const inCart = cartItems.find((item) => item.product.id === product.id);
  const qty = inCart ? inCart.quantity : 0;
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Product Image */}
        <div className="relative h-64 bg-slate-50 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discountPercent > 0 && (
            <span className="absolute bottom-3 left-3 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                {product.category.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-1 font-bold text-slate-900">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span>{product.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-display mt-1">{product.name}</h3>
            <p className="text-slate-500 text-xs mt-0.5">Unit: {product.unit}</p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-950 font-display">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-sm text-slate-400 line-through">MRP ₹{product.mrp}</span>
            )}
            <span className="text-emerald-700 font-bold ml-1">Save ₹{product.mrp - product.price}</span>
          </div>

          {/* Delivery speed */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-slate-700">
            <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              Express Delivery to your doorstep in <strong>{product.deliveryMinutes} minutes</strong>
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Product Description</h4>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Quality check */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
            <span>100% Quality & Freshness Guarantee or instant replacement at door.</span>
          </div>
        </div>

        {/* Footer Add to Cart */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
            <div className="text-base font-bold text-slate-900 font-mono">
              ₹{qty > 0 ? product.price * qty : product.price}
            </div>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
            >
              <ShoppingBag className="h-4 w-4 text-amber-400" />
              <span>Add to Basket</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-slate-900 text-white px-3 py-1.5 rounded-xl shadow-md">
              <button
                onClick={() => updateCartQuantity(product.id, -1)}
                className="p-1 hover:text-amber-400 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold text-sm min-w-5 text-center">{qty}</span>
              <button
                onClick={() => updateCartQuantity(product.id, 1)}
                className="p-1 hover:text-amber-400 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
