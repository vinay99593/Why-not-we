export type UserRole = 'customer' | 'provider' | 'admin';

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'Other';
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
}

export type BookingStatus =
  | 'requested'
  | 'accepted'
  | 'on_the_way'
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
  type: 'booking' | 'order' | 'system' | 'message' | 'emergency';
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
  referenceId?: string;
}
