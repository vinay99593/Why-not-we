import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TransportVehicleType,
  GoodCategory,
  GoodsWeightRange,
  HelperCount,
  Address,
  PaymentMethod,
} from '../../types';
import {
  TRANSPORT_VEHICLES,
  GOODS_CATEGORIES,
  calculateTransportFareEstimate,
} from '../../data/transportData';
import { VehicleSelectionCards } from './VehicleSelectionCards';
import {
  MapPin,
  Navigation,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  Zap,
  Briefcase,
  Plus,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
} from 'lucide-react';

interface TransportBookingFlowProps {
  initialVehicle?: TransportVehicleType;
  onBookingCreated: (orderId: string) => void;
  onCancel?: () => void;
}

export const TransportBookingFlow: React.FC<TransportBookingFlowProps> = ({
  initialVehicle = 'mini_truck',
  onBookingCreated,
  onCancel,
}) => {
  const {
    currentAddress,
    savedTransportAddresses,
    addSavedTransportAddress,
    createTransportOrder,
  } = useApp();

  // Booking step state: 1 to 6
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [selectedVehicle, setSelectedVehicle] = useState<TransportVehicleType>(initialVehicle);

  const [pickupAddress, setPickupAddress] = useState<Address>(() => {
    return (
      savedTransportAddresses.find((a) => a.label === 'Home') ||
      currentAddress || {
        id: 'p-custom',
        label: 'Home',
        street: 'Flat 402, Sai Balaji Enclave, Road No. 12',
        area: 'Banjara Hills',
        city: 'Hyderabad',
        pincode: '500034',
        landmark: 'Near Cancer Hospital',
      }
    );
  });

  const [dropAddress, setDropAddress] = useState<Address>(() => {
    return (
      savedTransportAddresses.find((a) => a.label === 'Work') || {
        id: 'd-custom',
        label: 'Work',
        street: 'Tower 4, Mindspace Tech Park, Gate 2',
        area: 'Madhapur',
        city: 'Hyderabad',
        pincode: '500081',
        landmark: 'Opposite Inorbit Mall',
      }
    );
  });

  const [additionalStops, setAdditionalStops] = useState<Address[]>([]);
  const [isMultiStopNoticeVisible, setIsMultiStopNoticeVisible] = useState(false);

  // Item details
  const [goodsCategory, setGoodsCategory] = useState<GoodCategory>('furniture');
  const [goodsDescription, setGoodsDescription] = useState('Wooden bed frame and 2 small tables');
  const [weightRange, setWeightRange] = useState<GoodsWeightRange>('50-100kg');
  const [isFragile, setIsFragile] = useState(false);
  const [helperCount, setHelperCount] = useState<HelperCount>(1);
  const [isUrgent, setIsUrgent] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);

  // Schedule
  const [timeChoice, setTimeChoice] = useState<'now' | 'schedule'>('now');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState('11:00 AM - 12:00 PM');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');

  // Mock distance in km between Hyderabad points
  const estimatedDistanceKm = 8.4;

  const vehicleConfig =
    TRANSPORT_VEHICLES.find((v) => v.id === selectedVehicle) || TRANSPORT_VEHICLES[2];

  const fareCalc = calculateTransportFareEstimate(
    vehicleConfig,
    estimatedDistanceKm,
    helperCount,
    isUrgent
  );

  const handleUseCurrentLocation = () => {
    setPickupAddress(currentAddress);
  };

  const handleAddStop = () => {
    if (additionalStops.length >= 2) return;
    const newStop: Address = {
      id: `stop-${Date.now()}`,
      label: 'Other',
      street: 'Jubilee Hills Check Post, Road 36',
      area: 'Jubilee Hills',
      city: 'Hyderabad',
      pincode: '500033',
    };
    setAdditionalStops([...additionalStops, newStop]);
    setIsMultiStopNoticeVisible(true);
  };

  const handleConfirmAndFindDriver = () => {
    const newOrder = createTransportOrder({
      vehicleType: selectedVehicle,
      pickupAddress,
      dropAddress,
      additionalStops: additionalStops.length > 0 ? additionalStops : undefined,
      distanceKm: estimatedDistanceKm,
      goodsCategory,
      goodsDescription,
      weightRange,
      isFragile,
      helperCount,
      isUrgent,
      isBusiness,
      scheduledTime: timeChoice === 'now' ? 'now' : `${scheduledDate} (${scheduledTimeSlot})`,
      paymentMethod,
    });

    onBookingCreated(newOrder.id);
  };

  const stepTitles = [
    'Pick a Vehicle',
    'Pickup Location',
    'Drop Location',
    'What Are You Moving?',
    'Date & Time',
    'Review Booking',
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Progress Stepper Bar */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-1 border border-blue-400/30">
              <Zap className="h-3 w-3 text-blue-400" />
              <span>Step {currentStep} of 6 · {stepTitles[currentStep - 1]}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              {currentStep === 1 && 'Pick Your Transport Vehicle'}
              {currentStep === 2 && 'Set Pickup Point'}
              {currentStep === 3 && 'Set Drop Destination'}
              {currentStep === 4 && 'Details of Goods'}
              {currentStep === 5 && 'Choose Dispatch Time'}
              {currentStep === 6 && 'Review Fare & Confirm'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1 transition-colors border border-slate-700 cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            )}
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="grid grid-cols-6 gap-1.5 mt-5">
          {[1, 2, 3, 4, 5, 6].map((st) => (
            <div key={st} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  st <= currentStep ? 'bg-blue-500' : 'bg-slate-800'
                } ${st === currentStep ? 'ring-2 ring-blue-400/50' : ''}`}
              />
              <span
                className={`text-[9px] block truncate font-medium ${
                  st === currentStep
                    ? 'text-blue-400 font-bold'
                    : st < currentStep
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                {stepTitles[st - 1]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* STEP 1: VEHICLE PICKER */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-950 font-display">
                  Select vehicle based on size of load
                </h3>
                <p className="text-xs text-slate-500">
                  Instant availability in Hyderabad · Doorstep loading & unloading options
                </p>
              </div>
            </div>

            <VehicleSelectionCards
              selectedVehicleId={selectedVehicle}
              onSelectVehicle={(id) => setSelectedVehicle(id)}
              showContinueButton={true}
              onContinue={() => setCurrentStep(2)}
            />
          </div>
        )}

        {/* STEP 2: PICKUP LOCATION */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-slate-950 font-display">
                  Where should the driver pick up goods?
                </h3>
                <p className="text-xs text-slate-500">
                  Select your current location or choose from saved premises
                </p>
              </div>

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-200 cursor-pointer self-start sm:self-auto"
              >
                <Navigation className="h-3.5 w-3.5 text-blue-600" />
                <span>Use Current Location</span>
              </button>
            </div>

            {/* Saved Locations Shortcut Pills */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Saved Locations
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {savedTransportAddresses.map((addr) => {
                  const isMatch = pickupAddress.id === addr.id;
                  return (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => setPickupAddress(addr)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isMatch
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{addr.label}</span>
                        {isMatch && <Check className="h-3.5 w-3.5 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{addr.area}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Address Inputs */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Street / House / Building Details</span>
                </label>
                <input
                  type="text"
                  value={pickupAddress.street}
                  onChange={(e) =>
                    setPickupAddress({ ...pickupAddress, street: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 bg-white p-3 focus:border-blue-600 focus:outline-hidden"
                  placeholder="e.g. Flat 402, Sai Balaji Enclave, Road No. 12"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Area / Locality</label>
                  <input
                    type="text"
                    value={pickupAddress.area}
                    onChange={(e) =>
                      setPickupAddress({ ...pickupAddress, area: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5 focus:border-blue-600 focus:outline-hidden"
                    placeholder="Banjara Hills"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">City</label>
                  <input
                    type="text"
                    value={pickupAddress.city}
                    onChange={(e) =>
                      setPickupAddress({ ...pickupAddress, city: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5 focus:border-blue-600 focus:outline-hidden"
                    placeholder="Hyderabad"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Landmark / Gate</label>
                  <input
                    type="text"
                    value={pickupAddress.landmark || ''}
                    onChange={(e) =>
                      setPickupAddress({ ...pickupAddress, landmark: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5 focus:border-blue-600 focus:outline-hidden"
                    placeholder="Near Cancer Hospital"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>Confirm Pickup & Proceed</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DROP LOCATION */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-950 font-display">
                  Where should the goods be delivered?
                </h3>
                <p className="text-xs text-slate-500">
                  Drop location in Hyderabad · Multi-stop route support available
                </p>
              </div>
            </div>

            {/* Saved Locations Shortcut */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Destination or Saved Premises
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {savedTransportAddresses.map((addr) => {
                  const isMatch = dropAddress.id === addr.id;
                  return (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => setDropAddress(addr)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isMatch
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{addr.label}</span>
                        {isMatch && <Check className="h-3.5 w-3.5 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{addr.area}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Address Inputs */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span>Drop Address / Building / Flat</span>
                </label>
                <input
                  type="text"
                  value={dropAddress.street}
                  onChange={(e) =>
                    setDropAddress({ ...dropAddress, street: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 bg-white p-3 focus:border-blue-600 focus:outline-hidden"
                  placeholder="e.g. Tower 4, Mindspace Tech Park, Gate 2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Area / Locality</label>
                  <input
                    type="text"
                    value={dropAddress.area}
                    onChange={(e) =>
                      setDropAddress({ ...dropAddress, area: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5 focus:border-blue-600 focus:outline-hidden"
                    placeholder="Madhapur"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">City</label>
                  <input
                    type="text"
                    value={dropAddress.city}
                    onChange={(e) =>
                      setDropAddress({ ...dropAddress, city: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5 focus:border-blue-600 focus:outline-hidden"
                    placeholder="Hyderabad"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Landmark</label>
                  <input
                    type="text"
                    value={dropAddress.landmark || ''}
                    onChange={(e) =>
                      setDropAddress({ ...dropAddress, landmark: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5 focus:border-blue-600 focus:outline-hidden"
                    placeholder="Opposite Inorbit Mall"
                  />
                </div>
              </div>
            </div>

            {/* Future-Ready Multi-Stop Feature Button */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Multi-Stop Delivery</span>
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                    BETA
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Need to drop packages at more than one location along the route?
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddStop}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-blue-600" />
                <span>+ Add Stop</span>
              </button>
            </div>

            {additionalStops.length > 0 && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center justify-between">
                <span>Intermediate Stop added: Jubilee Hills Check Post</span>
                <button
                  type="button"
                  onClick={() => setAdditionalStops([])}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>Continue to Goods Details</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GOODS DETAILS */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-base font-black text-slate-950 font-display">
                What are you moving?
              </h3>
              <p className="text-xs text-slate-500">
                Helps the driver arrange proper ropes, blankets & equipment for transport
              </p>
            </div>

            {/* Visual Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {GOODS_CATEGORIES.map((cat) => {
                const isSelected = goodsCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setGoodsCategory(cat.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl mb-1">{cat.emoji}</span>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{cat.label}</div>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Description Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Brief description of items (Optional)
              </label>
              <input
                type="text"
                value={goodsDescription}
                onChange={(e) => setGoodsDescription(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 p-3 focus:border-blue-600 focus:outline-hidden"
                placeholder="e.g. 1 Queen size bed, 2 cupboards and 3 cartons"
              />
            </div>

            {/* Weight Range Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Approximate Total Weight
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: '<10kg', label: '< 10 kg', sub: 'Light parcels' },
                  { id: '10-50kg', label: '10–50 kg', sub: 'Boxes / Bags' },
                  { id: '50-100kg', label: '50–100 kg', sub: 'Medium loads' },
                  { id: '100+kg', label: '100+ kg', sub: 'Heavy furniture' },
                ].map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWeightRange(w.id as GoodsWeightRange)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      weightRange === w.id
                        ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">{w.label}</div>
                    <div className="text-[10px] text-slate-400">{w.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fragile Goods Toggle */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Fragile / Glass Items Included</div>
                  <p className="text-[11px] text-slate-500">
                    Driver will apply extra transit cushioning and drive at cautious speed
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFragile(!isFragile)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  isFragile ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white block transition-transform ${
                    isFragile ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Loading / Unloading Assistance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Need Loading / Unloading Assistance?
                </label>
                <span className="text-[11px] text-slate-400">Doorstep helpers</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { count: 0 as HelperCount, label: 'Driver Only (No Help)', fee: '+₹0' },
                  { count: 1 as HelperCount, label: 'Driver + 1 Helper', fee: '+₹150' },
                  { count: 2 as HelperCount, label: 'Driver + 2 Helpers', fee: '+₹300' },
                ].map((opt) => (
                  <button
                    key={opt.count}
                    type="button"
                    onClick={() => setHelperCount(opt.count)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      helperCount === opt.count
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{opt.label}</span>
                      <span className="text-[11px] font-mono font-bold text-blue-600">
                        {opt.fee}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgent & Business Delivery Mode Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div
                onClick={() => setIsUrgent(!isUrgent)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  isUrgent ? 'border-amber-500 bg-amber-50/60' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">⚡</span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Urgent Dispatch (ASAP)</div>
                    <div className="text-[10px] text-slate-500">+₹60 priority matching</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={() => {}}
                  className="rounded text-blue-600 h-4 w-4 pointer-events-none"
                />
              </div>

              <div
                onClick={() => setIsBusiness(!isBusiness)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  isBusiness ? 'border-indigo-500 bg-indigo-50/60' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="h-5 w-5 text-indigo-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Business / GST Bill</div>
                    <div className="text-[10px] text-slate-500">Tax invoice for company</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isBusiness}
                  onChange={() => {}}
                  className="rounded text-blue-600 h-4 w-4 pointer-events-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: DATE & TIME */}
        {currentStep === 5 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div>
              <h3 className="text-base font-black text-slate-950 font-display">
                When do you need the vehicle?
              </h3>
              <p className="text-xs text-slate-500">
                Book immediate dispatch or schedule in advance
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTimeChoice('now')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  timeChoice === 'now'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">⚡</span>
                  {timeChoice === 'now' && <Check className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="font-bold text-sm text-slate-900 mt-2">Book for Now</div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Driver assigned within ~3-5 minutes
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTimeChoice('schedule')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  timeChoice === 'schedule'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  {timeChoice === 'schedule' && <Check className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="font-bold text-sm text-slate-900 mt-2">Schedule Later</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Pick date and preferred hour</p>
              </button>
            </div>

            {timeChoice === 'schedule' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Scheduled Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Time Window</label>
                  <select
                    value={scheduledTimeSlot}
                    onChange={(e) => setScheduledTimeSlot(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5"
                  >
                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM (Morning)</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM (Afternoon)</option>
                    <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM (Evening)</option>
                    <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM (Night)</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>Review Order & Price</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW BOOKING & FARE ESTIMATE */}
        {currentStep === 6 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-base font-black text-slate-950 font-display">
                Review Booking & Estimated Fare
              </h3>
              <p className="text-xs text-slate-500">
                Transparent breakdown based on standard logistics rates
              </p>
            </div>

            {/* Vehicle & Route Summary Card */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3.5">
                <div className="flex items-center gap-3">
                  <img
                    src={vehicleConfig.image}
                    alt={vehicleConfig.name}
                    className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-base text-slate-900 font-display">
                        {vehicleConfig.name}
                      </span>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {vehicleConfig.capacityWeight}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{goodsDescription}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Route Path */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-slate-900">Pickup: </span>
                    <span className="text-slate-600">
                      {pickupAddress.street}, {pickupAddress.area}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-slate-900">Drop: </span>
                    <span className="text-slate-600">
                      {dropAddress.street}, {dropAddress.area}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-5">
                  Estimated distance: <strong>{estimatedDistanceKm} km</strong> (approx. 25–30 mins transit)
                </div>
              </div>
            </div>

            {/* Price Estimation Breakdown (Clearly labeled as ESTIMATE) */}
            <div className="p-4 sm:p-5 rounded-3xl bg-blue-50/50 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Fare Breakdown</span>
                    <span className="text-[9px] font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded">
                      ESTIMATE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Final fare subject to road tolls and waiting time if applicable
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Range</span>
                  <div className="text-xl font-black text-blue-700 font-mono">
                    ₹{fareCalc.estimatedFareMin} – ₹{fareCalc.estimatedFareMax}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-200/70 space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Base fare ({vehicleConfig.name})</span>
                  <span className="font-mono">₹{fareCalc.baseFare}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance charge ({estimatedDistanceKm} km @ ₹{vehicleConfig.perKmRate}/km)</span>
                  <span className="font-mono">₹{fareCalc.distanceFare}</span>
                </div>
                {fareCalc.helperFee > 0 && (
                  <div className="flex justify-between text-blue-700">
                    <span>Loading assistance ({helperCount} helper{helperCount > 1 ? 's' : ''})</span>
                    <span className="font-mono">+₹{fareCalc.helperFee}</span>
                  </div>
                )}
                {fareCalc.urgentFee > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>Urgent Express Dispatch</span>
                    <span className="font-mono">+₹{fareCalc.urgentFee}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Select Payment Method</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'upi' as PaymentMethod, label: 'UPI / QR', icon: Smartphone },
                  { id: 'card' as PaymentMethod, label: 'Card', icon: CreditCard },
                  { id: 'wallet' as PaymentMethod, label: 'Wallet', icon: Wallet },
                  { id: 'cash' as PaymentMethod, label: 'Cash on Drop', icon: Banknote },
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        paymentMethod === pm.id
                          ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs">{pm.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Final Call to Action: "Find a Driver" */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirmAndFindDriver}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>Find a Driver</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Verified logistics drivers with valid commercial licenses & RC documents
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
