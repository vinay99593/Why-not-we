import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';
import { ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';

interface ServiceCategoriesGridProps {
  onSelectCategory?: (category: ServiceCategory) => void;
  limit?: number;
  title?: string;
  subtitle?: string;
}

export const ServiceCategoriesGrid: React.FC<ServiceCategoriesGridProps> = ({
  onSelectCategory,
  limit,
  title = 'Visual Service Catalog',
  subtitle = 'Tap any service to connect with verified nearby professionals',
}) => {
  const { categories, setSelectedCategoryId, setActivePage } = useApp();

  const displayedCategories = limit ? categories.slice(0, limit) : categories;

  const handleClick = (cat: ServiceCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
      return;
    }

    if (cat.id === 'grocery_delivery') {
      setActivePage('grocery');
    } else if (cat.id === 'fuel_delivery') {
      setActivePage('fuel');
    } else if (cat.id === 'hotels') {
      setActivePage('hotels');
    } else if (cat.id === 'hostels') {
      setActivePage('hostels');
    } else {
      setSelectedCategoryId(cat.id);
      setActivePage('services');
    }
  };

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Image-First Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {limit && (
          <button
            onClick={() => setActivePage('services')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group shrink-0 cursor-pointer"
          >
            <span>View all 16 services</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Visual Service Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5">
        {displayedCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleClick(cat)}
            className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-blue-600 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.025] active:scale-[0.98] cursor-pointer flex flex-col justify-between will-change-transform"
          >
            {/* Large Visual Photo */}
            <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-slate-100">
              <img
                src={
                  cat.image ||
                  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
                }
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-112 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />

              {/* Emoji Badge with subtle hover bounce */}
              <div className="absolute top-2.5 left-2.5 h-9 w-9 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-lg shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out">
                <span>{cat.emoji}</span>
              </div>

              {/* Emergency / 24x7 Badge */}
              {cat.emergencyAvailable && (
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs group-hover:shadow-md transition-shadow">
                  <AlertTriangle className="h-3 w-3" />
                  <span>24x7</span>
                </div>
              )}

              {/* Bottom Card Title over image for instant visual punch */}
              <div className="absolute bottom-2.5 left-3 right-3 transition-transform duration-300 group-hover:-translate-y-0.5">
                <h3 className="font-black text-sm sm:text-base text-white font-display drop-shadow-sm truncate group-hover:text-blue-300 transition-colors duration-200">
                  {cat.name}
                </h3>
              </div>
            </div>

            {/* Minimal Card Footer: Price tag & Action */}
            <div className="p-3 sm:p-4 bg-white flex items-center justify-between border-t border-slate-100 transition-colors duration-200 group-hover:bg-slate-50/50">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Starting</span>
                <span className="font-black text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">From ₹{cat.minPrice}</span>
              </div>

              <div className="h-7 w-7 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-110">
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
