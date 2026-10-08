export type UserRole = 'customer' | 'provider' | 'admin';

export type AuthScreen =
  | 'welcome'
  | 'customer_login'
  | 'customer_register'
  | 'worker_login'
  | 'worker_register'
  | 'admin_login';

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'Other' | 'Shop' | 'Warehouse';
  street: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: UserRole;
  addresses: Address[];
  savedProviderIds: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  emoji: string;
  description: string;
  minPrice: number;
  image?: string;
  popular?: boolean;
  emergencyAvailable?: boolean;
  providerCount: number;
}

export interface ProviderReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

export interface Provider {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  categoryId: string;
  categoryName: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  hourlyRate: number;
  visitFee: number;
  distanceKm: number;
  isVerified: boolean;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  skills: string[];
  bio: string;
  location: string;
  isAvailable: boolean;
  badges: string[];
  reviews: ProviderReview[];
  idProofType?: string;
  idProofNumber?: string;
  appliedDate?: string;
  // Demo verification flags
  isIdVerified?: boolean;
  isPhoneVerified?: boolean;
  isProfileVerified?: boolean;
}

export type BookingStatus =
  | 'requested'
  | 'accepted'
  | 'on_the_way'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'refunded';
export type PaymentMethod = 'upi' | 'card' | 'cash' | 'netbanking';

export interface StatusTimelineStep {
  status: BookingStatus;
  timestamp: string;
  note?: string;
}

export interface ServiceBooking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerCategory: string;
  serviceTitle: string;
  description: string;
  address: Address;
  preferredDate: string;
  preferredTime: string;
  urgency: 'standard' | 'emergency';
  photos: string[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  amount: number;
  createdAt: string;
  completedAt?: string;
  ratingGiven?: number;
  reviewComment?: string;
  timeline: StatusTimelineStep[];
}

export type GroceryCategoryType =
  | 'vegetables'
  | 'fruits'
  | 'dairy'
  | 'water'
  | 'household'
  | 'cleaning'
  | 'personal_care'
  | 'daily_essentials'
  | 'emergency_essentials';

export interface GroceryProduct {
  id: string;
  name: string;
  category: GroceryCategoryType;
  price: number;
  mrp: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
  deliveryMinutes: number;
}

export interface CartItem {
  product: GroceryProduct;
  quantity: number;
}

export type GroceryOrderStatus =
  | 'confirmed'
  | 'packing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface GroceryOrder {
  id: string;
  customerId: string;
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  discount: number;
  deliveryFee: number;
  address: Address;
  status: GroceryOrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  estimatedDelivery: string;
  otpCode: string;
}

export type FuelType = 'petrol' | 'diesel';
export type FuelVehicleType = 'car' | 'bike' | 'generator' | 'commercial';

export type FuelOrderStatus =
  | 'confirmed'
  | 'bowser_dispatched'
  | 'dispensing'
  | 'completed'
  | 'cancelled';

export interface FuelOrder {
  id: string;
  customerId: string;
  fuelType: FuelType;
  quantityLiters: number;
  pricePerLiter: number;
  totalAmount: number;
  deliveryFee: number;
  vehicleType: FuelVehicleType;
  vehicleNumber: string;
  address: Address;
  timeSlot: string;
  status: FuelOrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  bookingId?: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  imageUrl?: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'order' | 'system' | 'message' | 'emergency' | 'hotel' | 'hostel' | 'transport';
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
  referenceId?: string;
}

// HOTEL MODELS
export interface HotelRoom {
  id: string;
  name: string;
  type: 'Standard Room' | 'Deluxe AC Room' | 'Executive Suite' | 'Family Suite';
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  available: boolean;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  address: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  images: string[];
  description: string;
  amenities: string[];
  availableRooms: number;
  rooms: HotelRoom[];
}

export interface HotelBooking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  totalAmount: number;
  status: 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
  paymentStatus: PaymentStatus;
  createdAt: string;
}

// HOSTEL MODELS
export type HostelCategory = 'boys' | 'girls' | 'students' | 'working_professionals';

export interface HostelRoomOption {
  id: string;
  type: 'single' | 'double' | 'triple' | 'four_sharing';
  name: string;
  monthlyRent: number;
  availableBeds: number;
  depositAmount: number;
}

export interface Hostel {
  id: string;
  name: string;
  category: HostelCategory;
  location: string;
  city: string;
  address: string;
  rating: number;
  reviewCount: number;
  startingRent: number;
  images: string[];
  description: string;
  foodAvailable: boolean;
  wifi: boolean;
  laundry: boolean;
  security24x7: boolean;
  parking: boolean;
  roomOptions: HostelRoomOption[];
  contactPhone: string;
}

export interface HostelRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  hostelId: string;
  hostelName: string;
  roomType: string;
  monthlyRent: number;
  moveInDate: string;
  durationMonths: number;
  status: 'requested' | 'approved' | 'active' | 'cancelled';
  createdAt: string;
}

// ==========================================
// DELIVERY & TRANSPORT MODELS
// ==========================================
export type TransportVehicleType =
  | 'bike'
  | 'auto'
  | 'mini_truck'
  | 'pickup'
  | 'truck';

export interface TransportVehicleConfig {
  id: TransportVehicleType;
  name: string;
  tagline: string;
  categoryLabel: string;
  emoji: string;
  image: string;
  capacityWeight: string;
  capacityVolume: string;
  idealFor: string[];
  baseFare: number;
  perKmRate: number;
  minFare: number;
  estimatedSpeedKmh: number;
}

export type GoodCategory =
  | 'parcel'
  | 'furniture'
  | 'grocery'
  | 'electronics'
  | 'construction'
  | 'business'
  | 'other';

export type GoodsWeightRange = '<10kg' | '10-50kg' | '50-100kg' | '100+kg';

export type HelperCount = 0 | 1 | 2;

export type TransportOrderStatus =
  | 'finding_driver'
  | 'driver_assigned'
  | 'arriving_pickup'
  | 'arrived_pickup'
  | 'loading'
  | 'trip_started'
  | 'on_the_way'
  | 'arrived_destination'
  | 'unloading'
  | 'delivered'
  | 'cancelled';

export interface TransportDriver {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  tripsCount: number;
  vehicleType: TransportVehicleType;
  vehicleModel: string;
  vehicleNumber: string;
  isVerified: boolean;
  distanceKm: number;
  etaMins: number;
  drivingLicenseVerified: boolean;
  vehicleRcVerified: boolean;
  isOnline: boolean;
}

export interface TransportOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehicleType: TransportVehicleType;
  vehicleName: string;
  vehicleImage: string;
  pickupAddress: Address;
  dropAddress: Address;
  additionalStops?: Address[]; // Multi-stop delivery ready
  distanceKm: number;
  goodsCategory: GoodCategory;
  goodsDescription?: string;
  weightRange: GoodsWeightRange;
  isFragile: boolean;
  helperCount: HelperCount;
  isUrgent: boolean;
  isBusiness: boolean;
  scheduledTime: 'now' | string;
  baseFare: number;
  distanceFare: number;
  helperFee: number;
  urgentFee: number;
  estimatedFareMin: number;
  estimatedFareMax: number;
  totalFare: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: TransportOrderStatus;
  assignedDriver?: TransportDriver;
  otp: string; // 4-digit security OTP for handover
  deliveryProof?: {
    photoUrl?: string;
    signatureReceived?: boolean;
    customerOtpVerified?: boolean;
    completedAt?: string;
  };
  rating?: {
    stars: number;
    feedback?: string;
  };
  createdAt: string;
}

