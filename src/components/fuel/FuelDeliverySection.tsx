import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FuelType, FuelVehicleType, PaymentMethod, FuelOrder } from '../../types';
import {
  Fuel,
  ShieldCheck,
  MapPin,
  Clock,
  AlertTriangle,
  Car,
  Truck,
  Zap,
  CheckCircle,
  QrCode,
  CreditCard,
  ArrowRight,
  Info,
} from 'lucide-react';

export const FuelDeliverySection: React.FC = () => {
  const {
    currentAddress,
    setIsLocationModalOpen,
    placeFuelOrder,
    fuelOrders,
    updateFuelOrderStatus,
    fuelRates,
    setActivePage,
  } = useApp();

  const [fuelType, setFuelType] = useState<FuelType>('diesel');
  const [quantityLiters, setQuantityLiters] = useState<number>(20);
  const [vehicleType, setVehicleType] = useState<FuelVehicleType>('generator');
  const [vehicleNumber, setVehicleNumber] = useState('KA-03-MG-4912');
  const [timeSlot, setTimeSlot] = useState('Today, Within 1 Hour (Priority)');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [safetyConfirmed, setSafetyConfirmed] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<FuelOrder | null>(
    fuelOrders.length > 0 ? fuelOrders[0] : null
  );

  const pricePerLiter = fuelRates[fuelType];
  const fuelCost = Math.round(pricePerLiter * quantityLiters);
  const deliveryFee = fuelRates.deliveryFee;
  const totalAmount = fuelCost + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyConfirmed) return;
    setIsOrdering(true);

    setTimeout(() => {
      const order = placeFuelOrder(
        fuelType,
        quantityLiters,
        vehicleType,
        vehicleNumber,
        currentAddress,
        timeSlot,
        paymentMethod
      );
      setIsOrdering(false);
      setActiveTrackingOrder(order);
    }, 1000);
  };

  const handleAdvanceFuelStatus = () => {
    if (!activeTrackingOrder) return;
    const stages: typeof activeTrackingOrder.status[] = [
      'confirmed',
      'bowser_dispatched',
      'dispensing',
      'completed',
    ];
    const currentIndex = stages.indexOf(activeTrackingOrder.status);
    if (currentIndex >= 0 && currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      updateFuelOrderStatus(activeTrackingOrder.id, nextStage);
      setActiveTrackingOrder({
        ...activeTrackingOrder,
        status: nextStage,
      });
    }
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-8">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            <span>PESO Certified Doorstep Fuel Delivery</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Doorstep Fuel On Demand
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eliminate jerry-can trips. Order high-grade Petrol & High-Speed Diesel dispensed safely into your vehicle or apartment backup generator via automated mobile bowsers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Order Form */}
        <div className="lg:col-span-7 space-y-6">
          <form
            onSubmit={handlePlaceOrder}
            className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-6 text-xs text-slate-800"
          >
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Configure Fuel Order</h3>
              <p className="text-slate-500 mt-0.5">Select fuel grade, quantity, and fueling location</p>
            </div>

            {/* Fuel Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Fuel Grade *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFuelType('diesel')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    fuelType === 'diesel'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">High Speed Diesel</span>
                    <span className="font-mono text-xs font-bold text-amber-400">₹{fuelRates.diesel}/L</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${fuelType === 'diesel' ? 'text-slate-300' : 'text-slate-500'}`}>
                    Ideal for DG sets, diesel cars, farm machinery & heavy transport.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFuelType('petrol')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    fuelType === 'petrol'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Petrol (Motor Spirit)</span>
                    <span className="font-mono text-xs font-bold text-amber-400">₹{fuelRates.petrol}/L</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${fuelType === 'petrol' ? 'text-slate-300' : 'text-slate-500'}`}>
                    For emergency vehicle refueling & petrol generator units.
                  </p>
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Required Quantity (Liters) *
              </label>
              <div className="flex items-center gap-2 mb-2">
                {[10, 20, 35, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantityLiters(preset)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      quantityLiters === preset
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    {preset}L
                  </button>
                ))}
              </div>

              <input
                type="number"
                min={5}
                max={500}
                value={quantityLiters}
                onChange={(e) => setQuantityLiters(Number(e.target.value))}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden font-bold"
              />
            </div>

            {/* Vehicle / Target Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Vehicle / Equipment *
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { id: 'car', label: 'Car / SUV', icon: Car },
                  { id: 'generator', label: 'DG Generator', icon: Zap },
                  { id: 'commercial', label: 'Truck / Fleet', icon: Truck },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setVehicleType(item.id as FuelVehicleType)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        vehicleType === item.id
                          ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <Icon className="h-4 w-4 mx-auto mb-1 text-slate-700" />
                      <span className="text-[11px] block">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="Vehicle Reg No. / DG Unit Tag (e.g. KA-03-MG-4912)"
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden font-medium"
                required
              />
            </div>

            {/* Delivery Location Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                <div className="truncate">
                  <div className="font-bold text-slate-900 truncate">{currentAddress.label}: {currentAddress.street}</div>
                  <div className="text-slate-400 text-[10px] truncate">{currentAddress.area}, {currentAddress.city}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="text-amber-600 font-bold hover:underline shrink-0 ml-2"
              >
                Change
              </button>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Delivery Time Window</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
              >
                <option value="Today, Within 1 Hour (Priority)">Today, Within 1 Hour (Priority Bowser)</option>
                <option value="Today Evening (4:00 PM - 7:00 PM)">Today Evening (4:00 PM - 7:00 PM)</option>
                <option value="Tomorrow Morning (8:00 AM - 11:00 AM)">Tomorrow Morning (8:00 AM - 11:00 AM)</option>
              </select>
            </div>

            {/* Safety Declaration */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="fuelSafety"
                checked={safetyConfirmed}
                onChange={(e) => setSafetyConfirmed(e.target.checked)}
                className="mt-0.5 rounded text-slate-900 focus:ring-0"
              />
              <label htmlFor="fuelSafety" className="text-[11px] leading-relaxed cursor-pointer">
                I acknowledge that fueling will be performed exclusively by certified technicians using anti-static grounding cables and PESO-approved vapor recovery nozzles in open, safe ventilation.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isOrdering || !safetyConfirmed}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              {isOrdering ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Dispatching Fuel Bowser...</span>
                </>
              ) : (
                <>
                  <Fuel className="h-4 w-4 text-amber-400" />
                  <span>Schedule Delivery · ₹{totalAmount}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Cost Breakdown & Live Tracking */}
        <div className="lg:col-span-5 space-y-6">
          {/* Price Calculation Card */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h4 className="font-bold text-sm text-slate-900 font-display">Estimated Bill Breakdown</h4>

            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Fuel Subtotal ({quantityLiters}L × ₹{pricePerLiter})</span>
                <span className="font-bold text-slate-900">₹{fuelCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Certified Bowser Delivery Fee</span>
                <span className="font-medium text-slate-900">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Anti-Static Safety Protocol</span>
                <span className="text-emerald-700 font-bold">INCLUDED</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Amount</span>
                <span className="font-mono text-base font-black">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Active Fuel Order Tracking Card */}
          {activeTrackingOrder && (
            <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                    ⛽
                  </div>
                  <div>
                    <h4 className="font-bold text-sm font-display">Active Fuel Dispatch</h4>
                    <span className="text-[10px] text-slate-400 font-mono">#{activeTrackingOrder.id}</span>
                  </div>
                </div>

                <button
                  onClick={handleAdvanceFuelStatus}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-[10px] font-bold transition-colors"
                  title="Simulate bowser stages"
                >
                  Step Next
                </button>
              </div>

              {/* Status Indicator */}
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 uppercase font-bold text-[9px]">Bowser Status</span>
                  <span className="capitalize font-bold text-amber-400">
                    {activeTrackingOrder.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1 pt-1">
                  {['confirmed', 'bowser_dispatched', 'dispensing', 'completed'].map((st, i) => {
                    const orderMap: Record<string, number> = {
                      confirmed: 1,
                      bowser_dispatched: 2,
                      dispensing: 3,
                      completed: 4,
                    };
                    const isDone = orderMap[activeTrackingOrder.status] >= i + 1;
                    return (
                      <div
                        key={st}
                        className={`h-1.5 rounded-full ${isDone ? 'bg-amber-400' : 'bg-slate-700'}`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="text-[11px] text-slate-300 space-y-1">
                <div>Fuel: <strong className="text-white capitalize">{activeTrackingOrder.fuelType} ({activeTrackingOrder.quantityLiters}L)</strong></div>
                <div>Vehicle: <strong className="text-white">{activeTrackingOrder.vehicleNumber}</strong></div>
                <div>Destination: <span className="text-slate-300">{activeTrackingOrder.address.street}</span></div>
              </div>

              {activeTrackingOrder.status === 'completed' && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Fuel dispensing completed & verified by digital flow meter.</span>
                </div>
              )}
            </div>
          )}

          {/* Safety & Compliance Badge */}
          <div className="p-5 rounded-3xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Info className="h-4 w-4 text-slate-500" />
              <span>Statutory & PESO Compliance Architecture</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              WHY NOT WE operates in partnership with licensed petroleum marketing oil bowser fleets. Micro-delivery complies with statutory safety notifications and local fire brigade advisory standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
