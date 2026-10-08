import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  AuthScreen,
  UserProfile,
  Address,
  ServiceCategory,
  Provider,
  ServiceBooking,
  BookingStatus,
  PaymentMethod,
  GroceryProduct,
  CartItem,
  GroceryOrder,
  GroceryOrderStatus,
  FuelOrder,
  FuelOrderStatus,
  FuelType,
  FuelVehicleType,
  ChatMessage,
  AppNotification,
  Hotel,
  HotelBooking,
  Hostel,
  HostelRequest,
  TransportVehicleConfig,
  TransportVehicleType,
  TransportDriver,
  TransportOrder,
  TransportOrderStatus,
  GoodCategory,
  GoodsWeightRange,
  HelperCount,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PROVIDERS,
  INITIAL_GROCERY_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_BOOKINGS,
  INITIAL_GROCERY_ORDERS,
  INITIAL_FUEL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHATS,
  INITIAL_HOTELS,
  INITIAL_HOSTELS,
  INITIAL_HOTEL_BOOKINGS,
  INITIAL_HOSTEL_REQUESTS,
  FUEL_RATES,
} from '../data/mockData';
import {
  TRANSPORT_VEHICLES,
  INITIAL_TRANSPORT_DRIVERS,
  INITIAL_TRANSPORT_ORDERS,
  INITIAL_SAVED_ADDRESSES,
} from '../data/transportData';

export type ActivePage =
  | 'home'
  | 'services'
  | 'transport'
  | 'grocery'
  | 'fuel'
  | 'emergency'
  | 'hotels'
  | 'hostels'
  | 'orders'
  | 'messages'
  | 'customer_dashboard'
  | 'worker_dashboard'
  | 'provider_dashboard'
  | 'admin_dashboard'
  | 'trusted';

interface AppContextType {
  // Navigation & Auth Flow
  authScreen: AuthScreen | null;
  setAuthScreen: (screen: AuthScreen | null) => void;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  selectedProviderId: string | null;
  setSelectedProviderId: (id: string | null) => void;
  activeBookingId: string | null;
  setActiveBookingId: (id: string | null) => void;

  // Search & Global filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  removeRecentSearch: (query: string) => void;
  isVoiceSearchOpen: boolean;
  setIsVoiceSearchOpen: (open: boolean) => void;

  // Role & User
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  user: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  currentAddress: Address;
  setCurrentAddress: (addr: Address) => void;
  savedProviders: string[];
  toggleSaveProvider: (providerId: string) => void;

  // Auth Operations
  loginAsCustomer: (email?: string, password?: string) => boolean;
  loginAsWorker: (email?: string, password?: string) => boolean;
  loginAsAdmin: (email?: string, password?: string) => boolean;
  logout: () => void;

  // Categories & Workers (Providers)
  categories: ServiceCategory[];
  providers: Provider[];
  approveProvider: (providerId: string) => void;
  rejectProvider: (providerId: string) => void;
  suspendProvider: (providerId: string) => void;
  registerNewProvider: (providerData: Omit<Provider, 'id' | 'rating' | 'reviewCount' | 'completedJobs' | 'reviews'>) => void;

  // Service Bookings
  bookings: ServiceBooking[];
  createBooking: (
    providerId: string,
    serviceTitle: string,
    description: string,
    preferredDate: string,
    preferredTime: string,
    urgency: 'standard' | 'emergency',
    photos?: string[],
    customAmount?: number
  ) => ServiceBooking;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus, note?: string) => void;
  payBooking: (bookingId: string, method: PaymentMethod) => void;
  rateBooking: (bookingId: string, rating: number, comment: string) => void;
  cancelBooking: (bookingId: string) => void;

  // Hotels
  hotels: Hotel[];
  hotelBookings: HotelBooking[];
  bookHotel: (
    hotelId: string,
    roomType: string,
    checkIn: string,
    checkOut: string,
    guests: number,
    paymentMethod: PaymentMethod
  ) => HotelBooking;
  addHotel: (hotel: Hotel) => void;
  updateHotel: (hotel: Hotel) => void;
  deleteHotel: (hotelId: string) => void;

  // Hostels
  hostels: Hostel[];
  hostelRequests: HostelRequest[];
  requestHostel: (
    hostelId: string,
    roomType: string,
    moveInDate: string,
    durationMonths: number
  ) => HostelRequest;
  addHostel: (hostel: Hostel) => void;
  updateHostel: (hostel: Hostel) => void;
  deleteHostel: (hostelId: string) => void;

  // Grocery
  groceryProducts: GroceryProduct[];
  cartItems: CartItem[];
  addToCart: (product: GroceryProduct) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  groceryOrders: GroceryOrder[];
  placeGroceryOrder: (address: Address, paymentMethod: PaymentMethod) => GroceryOrder;
  updateGroceryOrderStatus: (orderId: string, status: GroceryOrderStatus) => void;

  // Fuel Delivery
  fuelOrders: FuelOrder[];
  fuelRates: typeof FUEL_RATES;
  placeFuelOrder: (
    fuelType: FuelType,
    quantityLiters: number,
    vehicleType: FuelVehicleType,
    vehicleNumber: string,
    address: Address,
    timeSlot: string,
    paymentMethod: PaymentMethod
  ) => FuelOrder;
  updateFuelOrderStatus: (orderId: string, status: FuelOrderStatus) => void;

  // Delivery & Transport
  transportVehicles: TransportVehicleConfig[];
  transportOrders: TransportOrder[];
  transportDrivers: TransportDriver[];
  savedTransportAddresses: Address[];
  activeTransportOrderId: string | null;
  setActiveTransportOrderId: (id: string | null) => void;
  createTransportOrder: (orderData: {
    vehicleType: TransportVehicleType;
    pickupAddress: Address;
    dropAddress: Address;
    additionalStops?: Address[];
    distanceKm: number;
    goodsCategory: GoodCategory;
    goodsDescription?: string;
    weightRange: GoodsWeightRange;
    isFragile: boolean;
    helperCount: HelperCount;
    isUrgent: boolean;
    isBusiness: boolean;
    scheduledTime: 'now' | string;
    paymentMethod: PaymentMethod;
  }) => TransportOrder;
  updateTransportOrderStatus: (orderId: string, status: TransportOrderStatus, note?: string) => void;
  completeTransportDelivery: (
    orderId: string,
    proof: { photoUrl?: string; signatureReceived?: boolean; customerOtpVerified?: boolean }
  ) => void;
  rateTransportOrder: (orderId: string, rating: { stars: number; feedback?: string }) => void;
  rebookTransportOrder: (orderId: string) => TransportOrder | null;
  addSavedTransportAddress: (addr: Address) => void;

  // Chat
  messages: ChatMessage[];
  sendMessage: (bookingId: string | undefined, text: string, imageUrl?: string) => void;
  activeChatPartner: Provider | null;
  setActiveChatPartner: (provider: Provider | null) => void;

  // Notifications
  notifications: AppNotification[];
  unreadNotifCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;

  // Modals & Drawers
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isChatDrawerOpen: boolean;
  setIsChatDrawerOpen: (open: boolean) => void;
  isCallModalOpen: boolean;
  setIsCallModalOpen: (open: boolean) => void;
  callPartnerName: string;
  setCallPartnerName: (name: string) => void;
  invoiceBooking: ServiceBooking | null;
  setInvoiceBooking: (booking: ServiceBooking | null) => void;
  isProviderRegisterModalOpen: boolean;
  setIsProviderRegisterModalOpen: (open: boolean) => void;
  legalModalType: 'terms' | 'privacy' | null;
  setLegalModalType: (type: 'terms' | 'privacy' | null) => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Auth Screen state
  const [authScreen, setAuthScreen] = useState<AuthScreen | null>(() => {
    const saved = localStorage.getItem('wnw_auth_screen');
    if (saved === 'none') return null;
    return (saved as AuthScreen) || 'welcome';
  });

  const [activePage, setActivePage] = useState<ActivePage>(() => {
    const saved = localStorage.getItem('wnw_active_page');
    return (saved as ActivePage) || 'home';
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('wnw_recent_searches');
    return saved
      ? JSON.parse(saved)
      : ['Electrician', 'Plumber', 'AC Repair', 'Water Can 20L', 'Hotel Grand'];
  });

  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 8);
      localStorage.setItem('wnw_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const removeRecentSearch = (query: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item !== query);
      localStorage.setItem('wnw_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('wnw_recent_searches');
  };

  // Role & User
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('wnw_user_role');
    return (saved as UserRole) || 'customer';
  });

  const [user, setUser] = useState<UserProfile>(INITIAL_CUSTOMERS[0]);
  const [currentAddress, setCurrentAddress] = useState<Address>(INITIAL_CUSTOMERS[0].addresses[0]);
  const [savedProviders, setSavedProviders] = useState<string[]>(INITIAL_CUSTOMERS[0].savedProviderIds);

  // Data states
  const [categories] = useState<ServiceCategory[]>(INITIAL_CATEGORIES);

  const [providers, setProviders] = useState<Provider[]>(() => {
    const saved = localStorage.getItem('wnw_providers_v2');
    return saved ? JSON.parse(saved) : INITIAL_PROVIDERS;
  });

  const [bookings, setBookings] = useState<ServiceBooking[]>(() => {
    const saved = localStorage.getItem('wnw_bookings_v2');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [hotels, setHotels] = useState<Hotel[]>(() => {
    const saved = localStorage.getItem('wnw_hotels');
    return saved ? JSON.parse(saved) : INITIAL_HOTELS;
  });

  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>(() => {
    const saved = localStorage.getItem('wnw_hotel_bookings');
    return saved ? JSON.parse(saved) : INITIAL_HOTEL_BOOKINGS;
  });

  const [hostels, setHostels] = useState<Hostel[]>(() => {
    const saved = localStorage.getItem('wnw_hostels');
    return saved ? JSON.parse(saved) : INITIAL_HOSTELS;
  });

  const [hostelRequests, setHostelRequests] = useState<HostelRequest[]>(() => {
    const saved = localStorage.getItem('wnw_hostel_requests');
    return saved ? JSON.parse(saved) : INITIAL_HOSTEL_REQUESTS;
  });

  const [groceryProducts, setGroceryProducts] = useState<GroceryProduct[]>(INITIAL_GROCERY_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('wnw_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [groceryOrders, setGroceryOrders] = useState<GroceryOrder[]>(() => {
    const saved = localStorage.getItem('wnw_grocery_orders');
    return saved ? JSON.parse(saved) : INITIAL_GROCERY_ORDERS;
  });

  const [fuelOrders, setFuelOrders] = useState<FuelOrder[]>(() => {
    const saved = localStorage.getItem('wnw_fuel_orders');
    return saved ? JSON.parse(saved) : INITIAL_FUEL_ORDERS;
  });

  // Transport & Delivery states
  const [transportVehicles] = useState<TransportVehicleConfig[]>(TRANSPORT_VEHICLES);
  const [transportDrivers, setTransportDrivers] = useState<TransportDriver[]>(INITIAL_TRANSPORT_DRIVERS);
  const [transportOrders, setTransportOrders] = useState<TransportOrder[]>(() => {
    const saved = localStorage.getItem('wnw_transport_orders');
    return saved ? JSON.parse(saved) : INITIAL_TRANSPORT_ORDERS;
  });
  const [savedTransportAddresses, setSavedTransportAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('wnw_saved_transport_addresses');
    return saved ? JSON.parse(saved) : INITIAL_SAVED_ADDRESSES;
  });
  const [activeTransportOrderId, setActiveTransportOrderId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('wnw_messages');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('wnw_notifications_v2');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // UI Modals & Drawers
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [activeChatPartner, setActiveChatPartner] = useState<Provider | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callPartnerName, setCallPartnerName] = useState('');
  const [invoiceBooking, setInvoiceBooking] = useState<ServiceBooking | null>(null);
  const [isProviderRegisterModalOpen, setIsProviderRegisterModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    if (authScreen) localStorage.setItem('wnw_auth_screen', authScreen);
    else localStorage.removeItem('wnw_auth_screen');
  }, [authScreen]);

  useEffect(() => {
    localStorage.setItem('wnw_active_page', activePage);
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem('wnw_user_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('wnw_providers_v2', JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('wnw_bookings_v2', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('wnw_hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('wnw_hotel_bookings', JSON.stringify(hotelBookings));
  }, [hotelBookings]);

  useEffect(() => {
    localStorage.setItem('wnw_hostels', JSON.stringify(hostels));
  }, [hostels]);

  useEffect(() => {
    localStorage.setItem('wnw_hostel_requests', JSON.stringify(hostelRequests));
  }, [hostelRequests]);

  useEffect(() => {
    localStorage.setItem('wnw_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wnw_grocery_orders', JSON.stringify(groceryOrders));
  }, [groceryOrders]);

  useEffect(() => {
    localStorage.setItem('wnw_fuel_orders', JSON.stringify(fuelOrders));
  }, [fuelOrders]);

  useEffect(() => {
    localStorage.setItem('wnw_transport_orders', JSON.stringify(transportOrders));
  }, [transportOrders]);

  useEffect(() => {
    localStorage.setItem('wnw_saved_transport_addresses', JSON.stringify(savedTransportAddresses));
  }, [savedTransportAddresses]);

  useEffect(() => {
    localStorage.setItem('wnw_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('wnw_notifications_v2', JSON.stringify(notifications));
  }, [notifications]);

  // Auth Operations
  const loginAsCustomer = (email?: string, password?: string): boolean => {
    setUserRole('customer');
    setUser(INITIAL_CUSTOMERS[0]);
    setCurrentAddress(INITIAL_CUSTOMERS[0].addresses[0]);
    setAuthScreen(null);
    setActivePage('customer_dashboard');
    addNotification({
      title: 'Welcome back, Rahul! 👋',
      message: 'Logged into Customer Dashboard. Find verified workers, groceries & hotels.',
      type: 'system',
    });
    return true;
  };

  const loginAsWorker = (email?: string, password?: string): boolean => {
    setUserRole('provider');
    setAuthScreen(null);
    setActivePage('worker_dashboard');
    addNotification({
      title: 'Worker Portal Active 🔧',
      message: 'Logged in as Ravi Kumar (Electrician). New customer requests will ring here.',
      type: 'system',
    });
    return true;
  };

  const loginAsAdmin = (email?: string, password?: string): boolean => {
    setUserRole('admin');
    setAuthScreen(null);
    setActivePage('admin_dashboard');
    addNotification({
      title: 'Admin Console Access 🛡️',
      message: 'Authenticated as Platform Administrator. Full management controls unlocked.',
      type: 'system',
    });
    return true;
  };

  const logout = () => {
    setAuthScreen('welcome');
  };

  // Saved providers toggle
  const toggleSaveProvider = (providerId: string) => {
    setSavedProviders((prev) => {
      const exists = prev.includes(providerId);
      const updated = exists ? prev.filter((id) => id !== providerId) : [...prev, providerId];
      setUser((u) => ({ ...u, savedProviderIds: updated }));
      return updated;
    });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  // Provider verification & management
  const approveProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? {
              ...p,
              isVerified: true,
              verificationStatus: 'verified',
              isIdVerified: true,
              isPhoneVerified: true,
              isProfileVerified: true,
              badges: [...p.badges.filter((b) => b !== 'Pending KYC Verification'), 'Verified Pro'],
            }
          : p
      )
    );
    addNotification({
      title: 'Worker Approved ✅',
      message: `Worker ID ${providerId} has been verified and can now receive customer requests.`,
      type: 'system',
    });
  };

  const rejectProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId ? { ...p, isVerified: false, verificationStatus: 'rejected' } : p
      )
    );
  };

  const suspendProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId ? { ...p, isVerified: false, isAvailable: false, verificationStatus: 'rejected' } : p
      )
    );
    addNotification({
      title: 'Worker Suspended ⚠️',
      message: `Worker account ${providerId} suspended due to policy audit.`,
      type: 'system',
    });
  };

  const registerNewProvider = (
    providerData: Omit<Provider, 'id' | 'rating' | 'reviewCount' | 'completedJobs' | 'reviews'>
  ) => {
    const newId = `w-${Date.now()}`;
    const newProv: Provider = {
      ...providerData,
      id: newId,
      rating: 5.0,
      reviewCount: 0,
      completedJobs: 0,
      reviews: [],
      isVerified: false,
      verificationStatus: 'pending',
      badges: ['New Worker', 'Pending KYC Verification'],
      isIdVerified: true,
      isPhoneVerified: true,
      isProfileVerified: false,
    };
    setProviders((prev) => [newProv, ...prev]);
    addNotification({
      title: 'New Worker Registration 📋',
      message: `${providerData.name} applied for ${providerData.categoryName}. Pending Admin approval.`,
      type: 'system',
    });
  };

  // Service Booking Actions
  const createBooking = (
    providerId: string,
    serviceTitle: string,
    description: string,
    preferredDate: string,
    preferredTime: string,
    urgency: 'standard' | 'emergency',
    photos: string[] = [],
    customAmount?: number
  ): ServiceBooking => {
    const prov = providers.find((p) => p.id === providerId);
    const amount = customAmount || (prov ? prov.visitFee + 150 : 399);
    const newId = `SR-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking: ServiceBooking = {
      id: newId,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      providerId: prov?.id || providerId,
      providerName: prov?.name || 'Assigned Technician',
      providerAvatar: prov?.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
      providerCategory: prov?.categoryName || 'Service Specialist',
      serviceTitle,
      description,
      address: currentAddress,
      preferredDate,
      preferredTime,
      urgency,
      photos,
      status: 'requested',
      paymentStatus: 'pending',
      amount,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'requested',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: urgency === 'emergency' ? 'Urgent SOS priority dispatch sent' : 'Service request logged & sent to worker',
        },
      ],
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newId);

    // Notification for Customer
    addNotification({
      title: urgency === 'emergency' ? '🚨 SOS Request Sent' : 'Service Request Sent',
      message: `Your request for ${serviceTitle} was sent to ${newBooking.providerName}.`,
      type: urgency === 'emergency' ? 'emergency' : 'booking',
      linkTab: 'orders',
      referenceId: newId,
    });

    // Notification for Worker
    addNotification({
      title: 'New Customer Request! 🔔',
      message: `${user.name} sent a request: ${serviceTitle} (${currentAddress.area}).`,
      type: 'booking',
      linkTab: 'orders',
      referenceId: newId,
    });

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, note?: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const updatedTimeline = [
            ...b.timeline,
            { status: newStatus, timestamp: nowTime, note: note || `Status updated to ${newStatus}` },
          ];
          const isCompleted = newStatus === 'completed';
          return {
            ...b,
            status: newStatus,
            completedAt: isCompleted ? new Date().toISOString() : b.completedAt,
            timeline: updatedTimeline,
          };
        }
        return b;
      })
    );

    const statusLabels: Record<BookingStatus, string> = {
      requested: 'Request Sent',
      accepted: 'Worker Accepted Request ✅',
      on_the_way: 'Worker On The Way 🛵',
      arrived: 'Worker Arrived At Doorstep 📍',
      in_progress: 'Work Started 🔧',
      completed: 'Work Completed 🎉',
      cancelled: 'Request Cancelled',
    };

    addNotification({
      title: `${statusLabels[newStatus]}`,
      message: `Service #${bookingId}: ${note || statusLabels[newStatus]}`,
      type: 'booking',
      linkTab: 'orders',
      referenceId: bookingId,
    });
  };

  const payBooking = (bookingId: string, method: PaymentMethod) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, paymentStatus: 'paid', paymentMethod: method } : b))
    );
    addNotification({
      title: 'Payment Confirmed 💳',
      message: `Payment for booking #${bookingId} confirmed via ${method.toUpperCase()}. Digital receipt generated.`,
      type: 'booking',
      linkTab: 'orders',
      referenceId: bookingId,
    });
  };

  const rateBooking = (bookingId: string, rating: number, comment: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, ratingGiven: rating, reviewComment: comment } : b
      )
    );

    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === booking.providerId) {
          const newReview = {
            id: `r-${Date.now()}`,
            authorName: user.name,
            authorAvatar: user.avatar,
            rating,
            comment,
            date: 'Just now',
            serviceName: booking.serviceTitle,
          };
          const newCount = p.reviewCount + 1;
          const newRating = Number(((p.rating * p.reviewCount + rating) / newCount).toFixed(1));
          return {
            ...p,
            rating: newRating,
            reviewCount: newCount,
            reviews: [newReview, ...p.reviews],
          };
        }
        return p;
      })
    );

    addNotification({
      title: 'Review Submitted ⭐',
      message: `Thank you for rating ${booking.providerName} ${rating} stars!`,
      type: 'system',
    });
  };

  const cancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled', 'Cancelled by customer');
  };

  // HOTEL ACTIONS
  const bookHotel = (
    hotelId: string,
    roomType: string,
    checkIn: string,
    checkOut: string,
    guests: number,
    paymentMethod: PaymentMethod
  ): HotelBooking => {
    const hotel = hotels.find((h) => h.id === hotelId);
    const room = hotel?.rooms.find((r) => r.type === roomType) || hotel?.rooms[0];
    const nightlyPrice = room ? room.pricePerNight : 2499;

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)));
    const total = nightlyPrice * nights;
    const newBookingId = `HB-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking: HotelBooking = {
      id: newBookingId,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      hotelId: hotel?.id || hotelId,
      hotelName: hotel?.name || 'Grand Boutique Hotel',
      hotelImage: hotel?.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      roomType,
      checkIn,
      checkOut,
      guests,
      totalNights: nights,
      totalAmount: total,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
    };

    setHotelBookings((prev) => [newBooking, ...prev]);

    addNotification({
      title: 'Hotel Booking Confirmed! 🏨',
      message: `Your reservation at ${newBooking.hotelName} (${roomType}) is confirmed for ${checkIn}.`,
      type: 'hotel',
      linkTab: 'hotels',
      referenceId: newBookingId,
    });

    return newBooking;
  };

  const addHotel = (newHotel: Hotel) => {
    setHotels((prev) => [newHotel, ...prev]);
    addNotification({
      title: 'Hotel Added 🏨',
      message: `${newHotel.name} added to live listings.`,
      type: 'system',
    });
  };

  const updateHotel = (updatedHotel: Hotel) => {
    setHotels((prev) => prev.map((h) => (h.id === updatedHotel.id ? updatedHotel : h)));
  };

  const deleteHotel = (hotelId: string) => {
    setHotels((prev) => prev.filter((h) => h.id !== hotelId));
  };

  // HOSTEL ACTIONS
  const requestHostel = (
    hostelId: string,
    roomType: string,
    moveInDate: string,
    durationMonths: number
  ): HostelRequest => {
    const hostel = hostels.find((h) => h.id === hostelId);
    const roomOpt = hostel?.roomOptions.find((r) => r.name === roomType) || hostel?.roomOptions[0];
    const rent = roomOpt ? roomOpt.monthlyRent : 7500;
    const newRequestId = `HR-${Math.floor(100 + Math.random() * 900)}`;

    const newReq: HostelRequest = {
      id: newRequestId,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      hostelId: hostel?.id || hostelId,
      hostelName: hostel?.name || 'Verified Hostel',
      roomType,
      monthlyRent: rent,
      moveInDate,
      durationMonths,
      status: 'approved',
      createdAt: new Date().toISOString(),
    };

    setHostelRequests((prev) => [newReq, ...prev]);

    addNotification({
      title: 'Hostel Request Approved! 🏠',
      message: `Your bed at ${newReq.hostelName} is confirmed for ${moveInDate}. Contact: ${hostel?.contactPhone}`,
      type: 'hostel',
      linkTab: 'hostels',
      referenceId: newRequestId,
    });

    return newReq;
  };

  const addHostel = (newHostel: Hostel) => {
    setHostels((prev) => [newHostel, ...prev]);
    addNotification({
      title: 'Hostel Added 🏠',
      message: `${newHostel.name} added to live listings.`,
      type: 'system',
    });
  };

  const updateHostel = (updatedHostel: Hostel) => {
    setHostels((prev) => prev.map((h) => (h.id === updatedHostel.id ? updatedHostel : h)));
  };

  const deleteHostel = (hostelId: string) => {
    setHostels((prev) => prev.filter((h) => h.id !== hostelId));
  };

  // Grocery Actions
  const addToCart = (product: GroceryProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const placeGroceryOrder = (address: Address, paymentMethod: PaymentMethod): GroceryOrder => {
    const total = cartTotal;
    const discount = total > 300 ? 30 : 0;
    const deliveryFee = total > 199 ? 0 : 29;
    const finalAmount = total - discount + deliveryFee;
    const newOrderId = `GR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: GroceryOrder = {
      id: newOrderId,
      customerId: user.id,
      items: [...cartItems],
      itemCount: cartItemCount,
      totalAmount: finalAmount,
      discount,
      deliveryFee,
      address,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod,
      createdAt: new Date().toISOString(),
      estimatedDelivery: '15-20 mins',
      otpCode: `${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setGroceryOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCartDrawerOpen(false);

    addNotification({
      title: 'Grocery Order Confirmed 🛒',
      message: `Order #${newOrderId} is being packed by our local partner hub. ETA 15 mins!`,
      type: 'order',
      linkTab: 'orders',
      referenceId: newOrderId,
    });

    return newOrder;
  };

  const updateGroceryOrderStatus = (orderId: string, status: GroceryOrderStatus) => {
    setGroceryOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Fuel Actions
  const placeFuelOrder = (
    fuelType: FuelType,
    quantityLiters: number,
    vehicleType: FuelVehicleType,
    vehicleNumber: string,
    address: Address,
    timeSlot: string,
    paymentMethod: PaymentMethod
  ): FuelOrder => {
    const rate = FUEL_RATES[fuelType];
    const fuelCost = rate * quantityLiters;
    const deliveryFee = FUEL_RATES.deliveryFee;
    const totalAmount = Math.round(fuelCost + deliveryFee);
    const newFuelOrderId = `FL-${Math.floor(1000 + Math.random() * 9000)}`;

    const newFuelOrder: FuelOrder = {
      id: newFuelOrderId,
      customerId: user.id,
      fuelType,
      quantityLiters,
      pricePerLiter: rate,
      totalAmount,
      deliveryFee,
      vehicleType,
      vehicleNumber,
      address,
      timeSlot,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setFuelOrders((prev) => [newFuelOrder, ...prev]);

    addNotification({
      title: 'Fuel Order Scheduled ⛽',
      message: `${quantityLiters}L of ${fuelType.toUpperCase()} scheduled for ${vehicleNumber}. Safe bowser assigned.`,
      type: 'order',
      linkTab: 'orders',
      referenceId: newFuelOrderId,
    });

    return newFuelOrder;
  };

  const updateFuelOrderStatus = (orderId: string, status: FuelOrderStatus) => {
    setFuelOrders((prev) =>
      prev.map((f) => (f.id === orderId ? { ...f, status } : f))
    );
  };

  // Delivery & Transport Actions
  const createTransportOrder = (orderData: {
    vehicleType: TransportVehicleType;
    pickupAddress: Address;
    dropAddress: Address;
    additionalStops?: Address[];
    distanceKm: number;
    goodsCategory: GoodCategory;
    goodsDescription?: string;
    weightRange: GoodsWeightRange;
    isFragile: boolean;
    helperCount: HelperCount;
    isUrgent: boolean;
    isBusiness: boolean;
    scheduledTime: 'now' | string;
    paymentMethod: PaymentMethod;
  }): TransportOrder => {
    const vehicleConfig =
      transportVehicles.find((v) => v.id === orderData.vehicleType) || transportVehicles[0];
    const baseFare = vehicleConfig.baseFare;
    const distanceFare = Math.round(orderData.distanceKm * vehicleConfig.perKmRate);
    const helperFee = orderData.helperCount === 1 ? 150 : orderData.helperCount === 2 ? 300 : 0;
    const urgentFee = orderData.isUrgent ? 60 : 0;
    const totalCalculated = Math.max(
      vehicleConfig.minFare,
      baseFare + distanceFare + helperFee + urgentFee
    );
    const estimatedFareMin = Math.round(totalCalculated * 0.95);
    const estimatedFareMax = Math.round(totalCalculated * 1.15);

    const matchingDriver =
      transportDrivers.find((d) => d.vehicleType === orderData.vehicleType && d.isOnline) ||
      transportDrivers[0];

    const newOrderId = `TRP-${Math.floor(100 + Math.random() * 900)}`;
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: TransportOrder = {
      id: newOrderId,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      vehicleType: orderData.vehicleType,
      vehicleName: vehicleConfig.name,
      vehicleImage: vehicleConfig.image,
      pickupAddress: orderData.pickupAddress,
      dropAddress: orderData.dropAddress,
      additionalStops: orderData.additionalStops,
      distanceKm: orderData.distanceKm,
      goodsCategory: orderData.goodsCategory,
      goodsDescription: orderData.goodsDescription,
      weightRange: orderData.weightRange,
      isFragile: orderData.isFragile,
      helperCount: orderData.helperCount,
      isUrgent: orderData.isUrgent,
      isBusiness: orderData.isBusiness,
      scheduledTime: orderData.scheduledTime,
      baseFare,
      distanceFare,
      helperFee,
      urgentFee,
      estimatedFareMin,
      estimatedFareMax,
      totalFare: totalCalculated,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'paid',
      status: 'finding_driver',
      assignedDriver: matchingDriver,
      otp,
      createdAt: 'Just now',
    };

    setTransportOrders((prev) => [newOrder, ...prev]);
    setActiveTransportOrderId(newOrderId);

    // Auto-progress from finding_driver to driver_assigned
    setTimeout(() => {
      setTransportOrders((prev) =>
        prev.map((o) => (o.id === newOrderId ? { ...o, status: 'driver_assigned' } : o))
      );
      addNotification({
        title: '🚚 Driver Assigned',
        message: `${matchingDriver.name} (${matchingDriver.vehicleModel} · ${matchingDriver.vehicleNumber}) assigned for booking #${newOrderId}. ETA: ${matchingDriver.etaMins} mins.`,
        type: 'transport',
        linkTab: 'transport',
        referenceId: newOrderId,
      });
    }, 2500);

    return newOrder;
  };

  const updateTransportOrderStatus = (
    orderId: string,
    status: TransportOrderStatus,
    note?: string
  ) => {
    setTransportOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    const statusNotifs: Partial<Record<TransportOrderStatus, { title: string; message: string }>> = {
      arriving_pickup: {
        title: '📍 Driver Arriving',
        message: 'Your transport driver is approaching the pickup location.',
      },
      arrived_pickup: {
        title: '📍 Driver Arrived at Pickup',
        message: 'Driver has reached the pickup gate. Please initiate loading.',
      },
      loading: {
        title: '📦 Loading Goods in Progress',
        message: 'Goods are currently being loaded onto the vehicle.',
      },
      trip_started: {
        title: '🚚 Trip Started · On The Way',
        message: 'Goods safely loaded and vehicle is in transit to destination.',
      },
      on_the_way: {
        title: '🚚 On The Way',
        message: 'Vehicle is en route to drop address.',
      },
      arrived_destination: {
        title: '📍 Arrived at Destination',
        message: 'Vehicle has arrived at the drop address. Please inspect goods.',
      },
      unloading: {
        title: '📦 Unloading Goods',
        message: 'Goods are being unloaded at the delivery site.',
      },
      delivered: {
        title: '✓ Delivered Successfully',
        message: 'Goods safely delivered and verified with OTP.',
      },
    };

    if (statusNotifs[status]) {
      addNotification({
        title: statusNotifs[status]!.title,
        message: statusNotifs[status]!.message,
        type: 'transport',
        linkTab: 'transport',
        referenceId: orderId,
      });
    }
  };

  const completeTransportDelivery = (
    orderId: string,
    proof: { photoUrl?: string; signatureReceived?: boolean; customerOtpVerified?: boolean }
  ) => {
    setTransportOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'delivered',
              deliveryProof: {
                ...proof,
                completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            }
          : o
      )
    );

    addNotification({
      title: '✓ Delivery Completed',
      message: `Transport order #${orderId} delivered and verified. Digital proof recorded.`,
      type: 'transport',
      linkTab: 'transport',
      referenceId: orderId,
    });
  };

  const rateTransportOrder = (orderId: string, rating: { stars: number; feedback?: string }) => {
    setTransportOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, rating } : o))
    );
  };

  const rebookTransportOrder = (orderId: string): TransportOrder | null => {
    const existing = transportOrders.find((o) => o.id === orderId);
    if (!existing) return null;
    return createTransportOrder({
      vehicleType: existing.vehicleType,
      pickupAddress: existing.pickupAddress,
      dropAddress: existing.dropAddress,
      additionalStops: existing.additionalStops,
      distanceKm: existing.distanceKm,
      goodsCategory: existing.goodsCategory,
      goodsDescription: existing.goodsDescription,
      weightRange: existing.weightRange,
      isFragile: existing.isFragile,
      helperCount: existing.helperCount,
      isUrgent: existing.isUrgent,
      isBusiness: existing.isBusiness,
      scheduledTime: 'now',
      paymentMethod: existing.paymentMethod,
    });
  };

  const addSavedTransportAddress = (addr: Address) => {
    setSavedTransportAddresses((prev) => [addr, ...prev]);
  };

  // Messaging Actions
  const sendMessage = (bookingId: string | undefined, text: string, imageUrl?: string) => {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      bookingId,
      senderId: userRole === 'customer' ? user.id : 'w-1',
      senderName: userRole === 'customer' ? user.name : 'Ravi Kumar',
      senderRole: userRole,
      text,
      imageUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);

    if (userRole === 'customer') {
      setTimeout(() => {
        const autoReplies = [
          "Noted sir! I am carrying all the required industrial tools and spare parts.",
          "Got it! Just arriving in your society gate, passing security clearance now.",
          "Thank you for sharing the photo, I see the issue clearly. Will fix it immediately.",
          "Understood! Please keep the power main switch accessible.",
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        const replyMsg: ChatMessage = {
          id: `m-reply-${Date.now()}`,
          bookingId,
          senderId: activeChatPartner?.id || 'w-1',
          senderName: activeChatPartner?.name || 'Ravi Kumar',
          senderRole: 'provider',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, replyMsg]);
        addNotification({
          title: `New Message from ${replyMsg.senderName} 💬`,
          message: randomReply,
          type: 'message',
        });
      }, 1600);
    }
  };

  // Notification Actions
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        authScreen,
        setAuthScreen,
        activePage,
        setActivePage,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedProviderId,
        setSelectedProviderId,
        activeBookingId,
        setActiveBookingId,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        removeRecentSearch,
        isVoiceSearchOpen,
        setIsVoiceSearchOpen,
        userRole,
        setUserRole,
        user,
        updateUserProfile,
        currentAddress,
        setCurrentAddress,
        savedProviders,
        toggleSaveProvider,
        loginAsCustomer,
        loginAsWorker,
        loginAsAdmin,
        logout,
        categories,
        providers,
        approveProvider,
        rejectProvider,
        suspendProvider,
        registerNewProvider,
        bookings,
        createBooking,
        updateBookingStatus,
        payBooking,
        rateBooking,
        cancelBooking,
        hotels,
        hotelBookings,
        bookHotel,
        addHotel,
        updateHotel,
        deleteHotel,
        hostels,
        hostelRequests,
        requestHostel,
        addHostel,
        updateHostel,
        deleteHostel,
        groceryProducts,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        groceryOrders,
        placeGroceryOrder,
        updateGroceryOrderStatus,
        fuelOrders,
        fuelRates: FUEL_RATES,
        placeFuelOrder,
        updateFuelOrderStatus,
        transportVehicles,
        transportOrders,
        transportDrivers,
        savedTransportAddresses,
        activeTransportOrderId,
        setActiveTransportOrderId,
        createTransportOrder,
        updateTransportOrderStatus,
        completeTransportDelivery,
        rateTransportOrder,
        rebookTransportOrder,
        addSavedTransportAddress,
        messages,
        sendMessage,
        activeChatPartner,
        setActiveChatPartner,
        notifications,
        unreadNotifCount,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isChatDrawerOpen,
        setIsChatDrawerOpen,
        isCallModalOpen,
        setIsCallModalOpen,
        callPartnerName,
        setCallPartnerName,
        invoiceBooking,
        setInvoiceBooking,
        isProviderRegisterModalOpen,
        setIsProviderRegisterModalOpen,
        legalModalType,
        setLegalModalType,
        isSupportModalOpen,
        setIsSupportModalOpen,
        isNotificationModalOpen,
        setIsNotificationModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
