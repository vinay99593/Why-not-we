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
  title = 'Browse All Local Services',
  subtitle = 'Verified technicians and doorstep professionals available in your neighborhood',
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
    } else {
      setSelectedCategoryId(cat.id);
      setActivePage('services');
    }
  };

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>On-Demand Trades & Deliveries</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        {limit && (
          <button
            onClick={() => setActivePage('services')}
            className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors group shrink-0"
          >
            <span>View all 16 categories</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {displayedCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleClick(cat)}
            className="group relative p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-900 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Category Icon & Emergency Tag */}
              <div className="flex items-start justify-between mb-3">
                <div className="h-12 w-12 rounded-xl bg-slate-100 group-hover:bg-slate-900 flex items-center justify-center text-2xl transition-colors">
                  <span>{cat.emoji}</span>
                </div>

                <div className="text-right">
                  {cat.emergencyAvailable && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-600">
                      <AlertTriangle className="h-3 w-3" />
                      <span>24x7</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors font-display line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            {/* Unboxed Metadata with subtle separators */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-900">From ₹{cat.minPrice}</span>
              <span className="text-slate-400 font-medium">{cat.providerCount} nearby</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
