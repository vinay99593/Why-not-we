import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
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
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PROVIDERS,
  INITIAL_GROCERY_PRODUCTS,
  INITIAL_USER,
  INITIAL_BOOKINGS,
  INITIAL_GROCERY_ORDERS,
  INITIAL_FUEL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHATS,
  FUEL_RATES,
} from '../data/mockData';

export type ActivePage =
  | 'home'
  | 'services'
  | 'grocery'
  | 'fuel'
  | 'emergency'
  | 'orders'
  | 'messages'
  | 'customer_dashboard'
  | 'provider_dashboard'
  | 'admin_dashboard';

interface AppContextType {
  // Navigation
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

  // Role & User
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  user: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  currentAddress: Address;
  setCurrentAddress: (addr: Address) => void;
  savedProviders: string[];
  toggleSaveProvider: (providerId: string) => void;

  // Categories & Providers
  categories: ServiceCategory[];
  providers: Provider[];
  approveProvider: (providerId: string) => void;
  rejectProvider: (providerId: string) => void;
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

  // Modals / Drawers
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View state
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Role & User
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [currentAddress, setCurrentAddress] = useState<Address>(INITIAL_USER.addresses[0]);
  const [savedProviders, setSavedProviders] = useState<string[]>(INITIAL_USER.savedProviderIds);

  // Data states
  const [categories] = useState<ServiceCategory[]>(INITIAL_CATEGORIES);
  const [providers, setProviders] = useState<Provider[]>(() => {
    const saved = localStorage.getItem('wnw_providers');
    return saved ? JSON.parse(saved) : INITIAL_PROVIDERS;
  });

  const [bookings, setBookings] = useState<ServiceBooking[]>(() => {
    const saved = localStorage.getItem('wnw_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
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

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('wnw_messages');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('wnw_notifications');
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

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('wnw_providers', JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('wnw_bookings', JSON.stringify(bookings));
  }, [bookings]);

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
    localStorage.setItem('wnw_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('wnw_notifications', JSON.stringify(notifications));
  }, [notifications]);

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

  // Provider verification & management (Admin & Provider actions)
  const approveProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? { ...p, isVerified: true, verificationStatus: 'verified', badges: [...p.badges.filter((b) => b !== 'Pending KYC Verification'), 'Verified Pro'] }
          : p
      )
    );
    addNotification({
      title: 'Provider Approved ✅',
      message: `Provider ID ${providerId} has been successfully verified and is now live for bookings.`,
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

  const registerNewProvider = (
    providerData: Omit<Provider, 'id' | 'rating' | 'reviewCount' | 'completedJobs' | 'reviews'>
  ) => {
    const newId = `p-${Date.now()}`;
    const newProv: Provider = {
      ...providerData,
      id: newId,
      rating: 5.0,
      reviewCount: 0,
      completedJobs: 0,
      reviews: [],
      isVerified: false,
      verificationStatus: 'pending',
      badges: ['New Provider', 'Pending KYC Verification'],
    };
    setProviders((prev) => [newProv, ...prev]);
    addNotification({
      title: 'New Provider Application 📋',
      message: `${providerData.name} has submitted KYC documents for ${providerData.categoryName}. Pending Admin approval.`,
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
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

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
          note: urgency === 'emergency' ? 'Urgent priority dispatch broadcasted' : 'Service request logged',
        },
      ],
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newId);

    // Trigger instant notification
    addNotification({
      title: urgency === 'emergency' ? '🚨 Emergency Request Broadcasted' : 'Service Request Sent',
      message: `Your request for ${serviceTitle} was sent to ${newBooking.providerName}.`,
      type: urgency === 'emergency' ? 'emergency' : 'booking',
      linkTab: 'orders',
      referenceId: newId,
    });

    // Auto-advance provider acceptance simulation after 3.5s for seamless testability
    setTimeout(() => {
      setBookings((current) =>
        current.map((b) => {
          if (b.id === newId && b.status === 'requested') {
            return {
              ...b,
              status: 'accepted',
              timeline: [
                ...b.timeline,
                {
                  status: 'accepted',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  note: `${b.providerName} accepted your request`,
                },
              ],
            };
          }
          return b;
        })
      );
      addNotification({
        title: 'Booking Accepted! ✅',
        message: `${newBooking.providerName} has accepted your request for ${serviceTitle}.`,
        type: 'booking',
        linkTab: 'orders',
        referenceId: newId,
      });
    }, 3500);

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
      requested: 'Service Requested',
      accepted: 'Booking Accepted',
      on_the_way: 'Provider On The Way 🛵',
      in_progress: 'Service In Progress 🔧',
      completed: 'Service Completed 🎉',
      cancelled: 'Booking Cancelled',
    };

    addNotification({
      title: `${statusLabels[newStatus]}`,
      message: `Booking #${bookingId} status changed to ${newStatus.replace('_', ' ')}.`,
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
      title: 'Payment Successful 💳',
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

    // Also append review to provider
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

  // Cart & Grocery Actions
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
      message: `Order #${newOrderId} is being packed by our local partner store. ETA 15 mins!`,
      type: 'order',
      linkTab: 'orders',
      referenceId: newOrderId,
    });

    // Simulated quick delivery progress
    setTimeout(() => {
      updateGroceryOrderStatus(newOrderId, 'out_for_delivery');
    }, 4000);

    return newOrder;
  };

  const updateGroceryOrderStatus = (orderId: string, status: GroceryOrderStatus) => {
    setGroceryOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    const messages: Record<GroceryOrderStatus, string> = {
      confirmed: 'Order confirmed and sent to store',
      packing: 'Items packed in insulated eco-friendly bag',
      out_for_delivery: 'Rider is en route to your doorstep 🛵',
      delivered: 'Order delivered successfully. Enjoy!',
      cancelled: 'Order was cancelled',
    };
    addNotification({
      title: `Grocery Update: ${status.replace('_', ' ').toUpperCase()}`,
      message: messages[status],
      type: 'order',
      linkTab: 'orders',
      referenceId: orderId,
    });
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
      message: `${quantityLiters}L of ${fuelType.toUpperCase()} scheduled for ${vehicleNumber}. Safe PESO bowser assigned.`,
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
    addNotification({
      title: `Fuel Bowser: ${status.replace('_', ' ').toUpperCase()}`,
      message: `Fuel order #${orderId} is now ${status.replace('_', ' ')}.`,
      type: 'order',
    });
  };

  // Messaging Actions
  const sendMessage = (bookingId: string | undefined, text: string, imageUrl?: string) => {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      bookingId,
      senderId: userRole === 'customer' ? user.id : 'p-1',
      senderName: userRole === 'customer' ? user.name : 'Rajesh Kumar',
      senderRole: userRole,
      text,
      imageUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);

    // If customer sent message, simulate friendly provider auto-reply after 1.8s
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
          senderId: activeChatPartner?.id || 'p-1',
          senderName: activeChatPartner?.name || 'Rajesh Kumar',
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
      }, 1800);
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
        userRole,
        setUserRole,
        user,
        updateUserProfile,
        currentAddress,
        setCurrentAddress,
        savedProviders,
        toggleSaveProvider,
        categories,
        providers,
        approveProvider,
        rejectProvider,
        registerNewProvider,
        bookings,
        createBooking,
        updateBookingStatus,
        payBooking,
        rateBooking,
        cancelBooking,
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
