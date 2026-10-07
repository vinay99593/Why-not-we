import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GroceryCategoryType, GroceryProduct } from '../../types';
import {
  Search,
  ShoppingBag,
  Plus,
  Minus,
  Clock,
  Sparkles,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';
import { ProductDetailsModal } from './ProductDetailsModal';

export const GrocerySection: React.FC = () => {
  const {
    groceryProducts,
    cartItems,
    addToCart,
    updateCartQuantity,
    setIsCartDrawerOpen,
    cartItemCount,
    cartTotal,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<GroceryCategoryType | 'all'>('all');
  const [productSearch, setProductSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<GroceryProduct | null>(null);

  const categoriesList: { id: GroceryCategoryType | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Items', icon: '🛒' },
    { id: 'vegetables', label: 'Vegetables', icon: '🥦' },
    { id: 'fruits', label: 'Fruits', icon: '🍎' },
    { id: 'dairy', label: 'Milk & Dairy', icon: '🥛' },
    { id: 'water', label: 'Water Cans', icon: '💧' },
    { id: 'household', label: 'Household Items', icon: '🏠' },
    { id: 'cleaning', label: 'Cleaning Products', icon: '🧼' },
    { id: 'personal_care', label: 'Personal Care', icon: '🧴' },
    { id: 'daily_essentials', label: 'Daily Essentials', icon: '🌾' },
    { id: 'emergency_essentials', label: 'Emergency Essentials', icon: '🔦' },
  ];

  const filteredProducts = groceryProducts.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      !productSearch.trim() ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Grocery Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>15-Minute Hyper-Local Delivery</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Grocery & Daily Essentials Store
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Fresh farm vegetables, dairy, 20L mineral water cans, first-aid kits and household staples delivered from local hubs in 15 minutes.
          </p>

          {/* Search bar inside grocery banner */}
          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search milk, onions, water cans, sanitizer..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full text-xs text-slate-900 bg-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-hidden shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart bar if items exist */}
      {cartItemCount > 0 && (
        <div className="sticky top-20 z-30 bg-slate-900 text-white p-3 sm:p-4 rounded-2xl shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm">
                {cartItemCount} items added · ₹{cartTotal}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">Free delivery applicable!</div>
            </div>
          </div>

          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-sm"
          >
            View Cart & Checkout
          </button>
        </div>
      )}

      {/* Category Tabs (Segmented Controls) */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-2 min-w-max">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredProducts.map((prod) => {
          const inCart = cartItems.find((item) => item.product.id === prod.id);
          const qty = inCart ? inCart.quantity : 0;
          const discountPercent = Math.round(((prod.mrp - prod.price) / prod.mrp) * 100);

          return (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-800 hover:shadow-lg transition-all p-3 sm:p-4 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {discountPercent > 0 && (
                    <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {discountPercent}% OFF
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <Clock className="h-3 w-3 text-emerald-400" />
                    <span>{prod.deliveryMinutes}m</span>
                  </span>
                </div>

                {/* Rating & Category unboxed text */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="capitalize">{prod.category.replace('_', ' ')}</span>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="h-3 w-3 fill-amber-500" />
                    <span>{prod.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-display line-clamp-1 group-hover:text-amber-600 transition-colors">
                  {prod.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{prod.unit}</p>
              </div>

              {/* Price & Add to Cart button */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                <div>
                  <div className="font-bold text-sm text-slate-900 font-mono">₹{prod.price}</div>
                  {prod.mrp > prod.price && (
                    <div className="text-[10px] text-slate-400 line-through">MRP ₹{prod.mrp}</div>
                  )}
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(prod)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold transition-all shadow-2xs"
                    >
                      + Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-slate-900 text-white px-2 py-1 rounded-xl shadow-xs text-xs">
                      <button
                        onClick={() => updateCartQuantity(prod.id, -1)}
                        className="hover:text-amber-400"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-bold min-w-3 text-center">{qty}</span>
                      <button
                        onClick={() => updateCartQuantity(prod.id, 1)}
                        className="hover:text-amber-400"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
