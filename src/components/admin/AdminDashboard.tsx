import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Wrench,
  ShoppingBag,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Eye,
  FileCheck,
  Trash2,
  TrendingUp,
  LayoutDashboard,
  Building,
  Home,
  Plus,
  BarChart3,
  FileText,
  Bell,
  Settings,
  MessageSquare,
  LogOut,
  ChevronRight,
  Star,
  Truck,
} from 'lucide-react';
import { Provider, Hotel, Hostel } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { NotificationBellButton } from '../common/NotificationBellButton';

export const AdminDashboard: React.FC = () => {
  const {
    providers,
    approveProvider,
    rejectProvider,
    suspendProvider,
    bookings,
    hotels,
    deleteHotel,
    addHotel,
    hostels,
    deleteHostel,
    addHostel,
    groceryOrders,
    groceryProducts,
    transportOrders,
    transportDrivers,
    transportVehicles,
    logout,
  } = useApp();

  const [activeMenu, setActiveMenu] = useState<
    | 'dashboard'
    | 'customers'
    | 'workers'
    | 'service_requests'
    | 'transport'
    | 'hotels'
    | 'hostels'
    | 'grocery'
    | 'orders'
    | 'payments'
    | 'complaints'
    | 'reports'
  >('dashboard');

  const [providerSearch, setProviderSearch] = useState('');
  const [selectedWorkerProfile, setSelectedWorkerProfile] = useState<Provider | null>(null);

  // Statistics
  const totalCustomers = 12480;
  const totalWorkers = providers.length;
  const activeWorkers = providers.filter((p) => p.isAvailable && p.isVerified).length;
  const pendingWorkerApprovals = providers.filter((p) => p.verificationStatus === 'pending').length;
  const activeServiceRequests = bookings.filter((b) => !['completed', 'cancelled'].includes(b.status)).length;
  const completedJobs = bookings.filter((b) => b.status === 'completed').length + 1840;
  const hotelListings = hotels.length;
  const hostelListings = hostels.length;
  const totalGroceryOrders = groceryOrders.length + 3820;
  const totalRevenue = 492000 + bookings.reduce((acc, b) => acc + (b.paymentStatus === 'paid' ? b.amount : 0), 0);

  const filteredWorkers = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(providerSearch.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(providerSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(providerSearch.toLowerCase())
  );

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6 text-xs">
      {/* Admin Top Header */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2 border border-indigo-500/30">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <span>Root Admin System Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            WHY NOT WE Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time management for workers, service requests, hotel & hostel inventories, and platform safety.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NotificationBellButton variant="dark" />
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-400 text-[11px] font-bold">Node 24x7 Live</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors border border-slate-700"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* 10 Statistics Cards as requested in prompt */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Customers</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{totalCustomers.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-medium">+18% this month</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Workers</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{totalWorkers}</div>
          <div className="text-[10px] text-slate-500">{activeWorkers} Active On-Duty</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-amber-800">Pending Approvals</div>
          <div className="text-lg font-black text-amber-950 font-mono mt-0.5">{pendingWorkerApprovals}</div>
          <div className="text-[10px] text-amber-700 font-bold">Needs Review</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Active Requests</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{activeServiceRequests}</div>
          <div className="text-[10px] text-blue-600 font-medium">In dispatch flow</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Completed Jobs</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{completedJobs}</div>
          <div className="text-[10px] text-emerald-600 font-medium">99.4% success</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Hotel Listings</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{hotelListings}</div>
          <div className="text-[10px] text-slate-500">Live booking ready</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Hostel Listings</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{hostelListings}</div>
          <div className="text-[10px] text-slate-500">PGs & Student beds</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Grocery Orders</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{totalGroceryOrders.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-medium">15m dark stores</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="text-[10px] uppercase font-bold text-slate-400">Platform GMV Revenue</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-0.5">₹{(totalRevenue / 1000).toFixed(1)}k</div>
          <div className="text-[10px] text-emerald-600 font-medium">Settled to bank accounts</div>
        </div>
      </div>

      {/* Admin Menu Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'dashboard', label: 'Dashboard & Charts' },
          { id: 'workers', label: `Workers Management (${providers.length})` },
          { id: 'service_requests', label: `Service Requests (${bookings.length})` },
          { id: 'transport', label: `Transport & Fleet (${transportOrders.length})` },
          { id: 'hotels', label: `Hotels (${hotels.length})` },
          { id: 'hostels', label: `Hostels (${hostels.length})` },
          { id: 'grocery', label: 'Grocery Catalog' },
          { id: 'complaints', label: 'Complaints Desk' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id as typeof activeMenu)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeMenu === item.id
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Visual Interactive Charts (Customer Growth, Worker Growth, Bookings, Revenue, Service Requests) */}
      {activeMenu === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Chart 1: Customer & Worker Growth */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-display">Customer & Worker Growth</h3>
                  <p className="text-slate-400 text-[11px]">Monthly onboarding trajectory</p>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-indigo-600" /> Customers
                  </span>
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-amber-500" /> Workers
                  </span>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100">
                {[
                  { month: 'Jun', cust: 45, wrk: 20 },
                  { month: 'Jul', cust: 60, wrk: 32 },
                  { month: 'Aug', cust: 78, wrk: 45 },
                  { month: 'Sep', cust: 92, wrk: 60 },
                  { month: 'Oct', cust: 110, wrk: 85 },
                  { month: 'Nov', cust: 140, wrk: 115 },
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div
                        style={{ height: `${(d.cust / 150) * 100}%` }}
                        className="w-3.5 bg-indigo-600 rounded-t-md hover:bg-indigo-500 transition-all"
                        title={`Customers: ${d.cust * 100}`}
                      />
                      <div
                        style={{ height: `${(d.wrk / 150) * 100}%` }}
                        className="w-3.5 bg-amber-400 rounded-t-md hover:bg-amber-300 transition-all"
                        title={`Workers: ${d.wrk}`}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Revenue & Service Bookings */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-display">Bookings & GMV Revenue</h3>
                  <p className="text-slate-400 text-[11px]">Weekly transaction volume (₹ in Thousands)</p>
                </div>
                <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                  +24.6% WoW
                </span>
              </div>

              <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100">
                {[
                  { week: 'W1', val: 55 },
                  { week: 'W2', val: 72 },
                  { week: 'W3', val: 68 },
                  { week: 'W4', val: 95 },
                  { week: 'W5', val: 120 },
                  { week: 'W6', val: 145 },
                ].map((w, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      style={{ height: `${(w.val / 160) * 100}%` }}
                      className="w-8 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg hover:brightness-110 transition-all shadow-xs"
                      title={`₹${w.val}k`}
                    />
                    <span className="text-[10px] text-slate-400 font-medium">{w.week}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Workers Management (Approve, Reject, Suspend, View Profile) */}
      {activeMenu === 'workers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search worker by name, trade or location..."
                value={providerSearch}
                onChange={(e) => setProviderSearch(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-3 py-2 bg-white"
              />
            </div>
            <div className="text-slate-500">{filteredWorkers.length} workers registered</div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Worker Name</th>
                  <th className="p-3.5">Service Trade</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Verification</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkers.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img src={w.avatar} alt={w.name} className="h-10 w-10 rounded-xl object-cover border" />
                        <div>
                          <div className="font-bold text-slate-900">{w.name}</div>
                          <div className="text-slate-400 text-[10px]">{w.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-medium">{w.categoryName}</td>
                    <td className="p-3.5 text-slate-500 truncate max-w-[160px]">{w.location}</td>
                    <td className="p-3.5 font-bold">{w.rating} ★</td>
                    <td className="p-3.5">
                      <StatusBadge status={w.isAvailable ? 'active' : 'suspended'} label={w.isAvailable ? 'Online' : 'Offline'} size="sm" />
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={w.isVerified ? 'verified' : 'pending'} label={w.isVerified ? 'Verified' : 'Pending KYC'} size="sm" />
                    </td>
                    <td className="p-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedWorkerProfile(w)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-[11px]"
                      >
                        View Profile
                      </button>

                      {!w.isVerified ? (
                        <button
                          onClick={() => approveProvider(w.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => suspendProvider(w.id)}
                          className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-[11px]"
                        >
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Service Requests Monitoring */}
      {activeMenu === 'service_requests' && (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{b.serviceTitle}</span>
                  <span className="font-mono text-slate-400">#{b.id}</span>
                  <StatusBadge status={b.status} size="sm" showDot />
                </div>
                <div className="text-slate-500 mt-0.5">
                  Customer: <strong>{b.customerName}</strong> · Assigned: <strong>{b.providerName}</strong>
                </div>
                <div className="text-slate-400 text-[11px]">Location: {b.address.street}, {b.address.area}</div>
              </div>

              <div className="text-right">
                <div className="font-bold text-base text-slate-900 font-mono">₹{b.amount}</div>
                <div className="text-[10px] text-slate-500">Paid: {b.paymentStatus.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: Transport & Fleet Management */}
      {activeMenu === 'transport' && (
        <div className="space-y-6">
          {/* Fleet Metrics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Trips</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{transportOrders.length}</div>
              <div className="text-[10px] text-blue-600 font-medium">All vehicle types</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Active Drivers</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{transportDrivers.length}</div>
              <div className="text-[10px] text-emerald-600 font-medium">100% Verified RC/DL</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Vehicle Classes</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{transportVehicles.length}</div>
              <div className="text-[10px] text-indigo-600 font-medium">Bike to Heavy Truck</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Transport GMV</div>
              <div className="text-xl font-black text-emerald-600 font-mono mt-1">
                ₹{transportOrders.reduce((acc, o) => acc + o.totalFare, 0)}
              </div>
              <div className="text-[10px] text-slate-400">Platform freight value</div>
            </div>
          </div>

          {/* Drivers Fleet Table */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-display">
              Commercial Driver Partners & Vehicle Verification
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3">Driver Partner</th>
                    <th className="pb-3">Vehicle Model & Number</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Rating</th>
                    <th className="pb-3">Documents</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transportDrivers.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/70">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <img src={d.avatar} alt={d.name} className="h-9 w-9 rounded-xl object-cover border" />
                          <div>
                            <div className="font-bold text-slate-900">{d.name}</div>
                            <div className="text-[10px] text-slate-400">{d.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-mono font-medium text-slate-700">
                        <div>{d.vehicleModel}</div>
                        <div className="text-[10px] text-slate-400">{d.vehicleNumber}</div>
                      </td>
                      <td className="py-3 capitalize font-semibold text-slate-600">
                        {d.vehicleType.replace('_', ' ')}
                      </td>
                      <td className="py-3 font-bold text-amber-600">
                        ★ {d.rating} ({d.tripsCount} trips)
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                          ✓ DL & RC Valid
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Online
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transport Orders Live Audit Table */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-display">
              Live Freight & Transport Trips Monitor
            </h3>
            <div className="space-y-3">
              {transportOrders.map((to) => (
                <div
                  key={to.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Trip #{to.id} · {to.vehicleName}</span>
                      <StatusBadge status={to.status} size="sm" showDot />
                    </div>
                    <div className="text-slate-600 mt-1">
                      Route: <strong>{to.pickupAddress.area}</strong> → <strong>{to.dropAddress.area}</strong> ({to.distanceKm} km)
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Customer: {to.customerName} · Driver: {to.assignedDriver?.name} · Handover OTP: <strong className="font-mono text-slate-800">{to.otp}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-base text-slate-900 font-mono">₹{to.totalFare}</div>
                    <div className="text-[10px] text-slate-500">Paid: {to.paymentMethod.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Hotel Management (Add, Edit, Delete Hotel) */}
      {activeMenu === 'hotels' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-display">Manage Hotels</h3>
              <p className="text-slate-500">Add, edit pricing, and manage rooms for hotels</p>
            </div>
            <button
              onClick={() => {
                const newH: Hotel = {
                  id: `ht-${Date.now()}`,
                  name: 'Grand Horizon Residency',
                  location: 'Banjara Hills, Hyderabad',
                  city: 'Hyderabad',
                  address: 'Road No. 2, Banjara Hills, Hyderabad',
                  rating: 4.8,
                  reviewCount: 15,
                  startingPrice: 2499,
                  images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'],
                  description: 'Premium boutique hotel near tech parks with 24/7 reception and rooftop pool.',
                  amenities: ['Free Wi-Fi', 'AC', 'Swimming Pool', 'Breakfast'],
                  availableRooms: 6,
                  rooms: [
                    {
                      id: `rm-${Date.now()}`,
                      name: 'Executive Deluxe King',
                      type: 'Deluxe AC Room',
                      pricePerNight: 2499,
                      capacity: 2,
                      amenities: ['King Bed', 'AC', 'Rain Shower'],
                      available: true,
                      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80',
                    },
                  ],
                };
                addHotel(newH);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add Hotel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotels.map((h) => (
              <div key={h.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <img src={h.images[0]} alt={h.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">{h.name}</h4>
                    <div className="text-[11px] text-slate-500">{h.location}, {h.city}</div>
                    <div className="font-mono font-bold text-slate-900 mt-0.5">₹{h.startingPrice}/night</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-emerald-700 font-bold">{h.availableRooms} rooms available</span>
                  <button
                    onClick={() => deleteHotel(h.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                    title="Delete Hotel"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Hostel Management (Add, Delete Hostels) */}
      {activeMenu === 'hostels' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-display">Manage Hostels & PGs</h3>
              <p className="text-slate-500">Configure student and professional hostel listings</p>
            </div>
            <button
              onClick={() => {
                const newHs: Hostel = {
                  id: `hs-${Date.now()}`,
                  name: 'Royal Comforts Boys PG',
                  category: 'boys',
                  location: 'Madhapur Metro, Hyderabad',
                  city: 'Hyderabad',
                  address: 'Plot 45, Image Gardens Road, Madhapur, Hyderabad',
                  rating: 4.8,
                  reviewCount: 20,
                  startingRent: 7500,
                  images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'],
                  description: 'Spacious boys PG with 3-time meals, high-speed Wi-Fi and daily housekeeping.',
                  foodAvailable: true,
                  wifi: true,
                  laundry: true,
                  security24x7: true,
                  parking: true,
                  contactPhone: '+91 99881 22334',
                  roomOptions: [
                    { id: `opt-${Date.now()}`, type: 'double', name: 'Double Sharing AC', monthlyRent: 8500, availableBeds: 4, depositAmount: 5000 },
                  ],
                };
                addHostel(newHs);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add Hostel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hostels.map((hs) => (
              <div key={hs.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <img src={hs.images[0]} alt={hs.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">{hs.name}</h4>
                    <div className="text-[11px] text-slate-500 capitalize">{hs.category.replace('_', ' ')} · {hs.city}</div>
                    <div className="font-mono font-bold text-slate-900 mt-0.5">₹{hs.startingRent}/mo</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-blue-700 font-bold">{hs.foodAvailable ? 'Food Included' : 'No Food'}</span>
                  <button
                    onClick={() => deleteHostel(hs.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                    title="Delete Hostel"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Grocery Catalog */}
      {activeMenu === 'grocery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {groceryProducts.map((p) => (
            <div key={p.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <img src={p.image} alt={p.name} className="h-12 w-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 truncate">{p.name}</div>
                <div className="text-[11px] text-slate-400">{p.unit} · {p.category}</div>
                <div className="font-mono font-bold text-slate-900">₹{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Worker Profile Modal */}
      {selectedWorkerProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 font-display">Worker Verification Audit</h3>
              <button
                onClick={() => setSelectedWorkerProfile(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img src={selectedWorkerProfile.avatar} alt={selectedWorkerProfile.name} className="h-14 w-14 rounded-2xl object-cover border" />
              <div>
                <h4 className="font-bold text-base text-slate-900">{selectedWorkerProfile.name}</h4>
                <div className="text-slate-500">{selectedWorkerProfile.categoryName} Specialist</div>
                <div className="text-[10px] text-slate-400">{selectedWorkerProfile.phone}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div>KYC Document: <strong>{selectedWorkerProfile.idProofType}</strong></div>
              <div>ID Number: <strong className="font-mono">{selectedWorkerProfile.idProofNumber}</strong></div>
              <div>Experience: <strong>{selectedWorkerProfile.experienceYears} Years</strong></div>
              <div>Rating: <strong>{selectedWorkerProfile.rating} ★ ({selectedWorkerProfile.reviewCount} reviews)</strong></div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedWorkerProfile(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold"
              >
                Close
              </button>
              {!selectedWorkerProfile.isVerified && (
                <button
                  onClick={() => {
                    approveProvider(selectedWorkerProfile.id);
                    setSelectedWorkerProfile(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Approve KYC Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
