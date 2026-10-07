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
  Store,
  Phone,
  Mail,
} from 'lucide-react';
import { Provider } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    providers,
    approveProvider,
    rejectProvider,
    bookings,
    groceryOrders,
    fuelOrders,
    categories,
    groceryProducts,
    user,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'providers' | 'bookings' | 'grocery' | 'complaints'
  >('overview');

  const [providerSearch, setProviderSearch] = useState('');
  const [selectedVerificationProvider, setSelectedVerificationProvider] = useState<Provider | null>(null);

  // Platform KPIs
  const totalCustomers = 12480;
  const totalProviders = providers.length;
  const activeBookingsCount = bookings.filter((b) => !['completed', 'cancelled'].includes(b.status)).length;
  const completedServicesCount = bookings.filter((b) => b.status === 'completed').length;
  const totalGroceryOrders = groceryOrders.length + 3820;
  const totalPlatformRevenue = 482900 + bookings.reduce((acc, b) => acc + (b.paymentStatus === 'paid' ? b.amount : 0), 0);
  const pendingProviders = providers.filter((p) => p.verificationStatus === 'pending');

  const mockComplaints = [
    {
      id: 'CMP-401',
      customer: 'Sunita Sharma',
      provider: 'Rajesh Kumar (Electrician)',
      issue: 'Delay of 10 minutes due to heavy rain in Indiranagar',
      status: 'Resolved',
      severity: 'Low',
      date: '2 hours ago',
    },
    {
      id: 'CMP-402',
      customer: 'Rahul Verma',
      provider: 'AquaSwift Express',
      issue: 'Requested cold water can, normal can delivered by mistake',
      status: 'Under Review',
      severity: 'Medium',
      date: '5 hours ago',
    },
  ];

  const filteredProviders = providers.filter((p) =>
    p.name.toLowerCase().includes(providerSearch.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(providerSearch.toLowerCase())
  );

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
            <LayoutDashboard className="h-3.5 w-3.5 text-indigo-400" />
            <span>Platform Governance & Command Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display">WHY NOT WE Admin</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time multi-service operational monitoring, provider verification pipeline & compliance audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400 font-bold">System Online · All Services Live</span>
        </div>
      </div>

      {/* 7 Core KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Customers</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-1">{totalCustomers.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-medium">+18% this month</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Providers</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-1">{totalProviders}</div>
          <div className="text-[10px] text-slate-500">16 active trades</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Active Bookings</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-1">{activeBookingsCount}</div>
          <div className="text-[10px] text-amber-600 font-medium">Live on ground</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Completed Jobs</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-1">{completedServicesCount + 1840}</div>
          <div className="text-[10px] text-emerald-600 font-medium">99.2% satisfaction</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Grocery Orders</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-1">{totalGroceryOrders.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-medium">15m avg delivery</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Revenue</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-1">₹{(totalPlatformRevenue / 1000).toFixed(1)}k</div>
          <div className="text-[10px] text-emerald-600 font-medium">Platform GMV</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/90 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-[10px] uppercase font-bold text-amber-800">Pending KYC</div>
          <div className="text-lg font-black text-amber-950 font-mono mt-1">{pendingProviders.length}</div>
          <div className="text-[10px] text-amber-700 font-bold">Needs approval</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview & Pipelines' },
          { id: 'providers', label: `Provider KYC Pipeline (${pendingProviders.length} Pending)` },
          { id: 'bookings', label: `Bookings Oversight (${bookings.length})` },
          { id: 'grocery', label: `Grocery Catalog (${groceryProducts.length})` },
          { id: 'complaints', label: `Complaints Desk (${mockComplaints.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Pending Verifications Quick Card */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 font-display">
                Pending Provider Verifications
              </h3>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                Action Required
              </span>
            </div>

            {pendingProviders.length === 0 ? (
              <p className="text-slate-400">All applicant service providers have been verified.</p>
            ) : (
              <div className="space-y-3">
                {pendingProviders.map((prov) => (
                  <div
                    key={prov.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prov.avatar}
                        alt={prov.name}
                        className="h-10 w-10 rounded-xl object-cover"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{prov.name}</div>
                        <div className="text-slate-500 text-[11px]">{prov.categoryName} · {prov.experienceYears} yrs exp</div>
                        <div className="text-[10px] text-slate-400 font-mono">Doc: {prov.idProofType} ({prov.idProofNumber})</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => rejectProvider(prov.id)}
                        className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50"
                        title="Reject application"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => approveProvider(prov.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Approve & Verify</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Real-time Category Breakdown */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-display">Services Directory Breakdown</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.slice(0, 8).map((cat) => (
                <div key={cat.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="font-medium text-slate-800 truncate">{cat.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">{cat.providerCount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Providers KYC Management */}
      {activeTab === 'providers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search provider by name, trade or area..."
                value={providerSearch}
                onChange={(e) => setProviderSearch(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 bg-white"
              />
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing {filteredProviders.length} Registered Providers
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Provider</th>
                  <th className="p-3.5">Trade Category</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Rating / Jobs</th>
                  <th className="p-3.5">KYC Document</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProviders.map((prov) => (
                  <tr key={prov.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={prov.avatar}
                          alt={prov.name}
                          className="h-10 w-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{prov.name}</div>
                          <div className="text-[11px] text-slate-400">{prov.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-700">{prov.categoryName}</td>
                    <td className="p-3.5">
                      {prov.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Pending Review</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{prov.rating} ★</div>
                      <div className="text-[10px] text-slate-400">{prov.completedJobs} jobs done</div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">
                      {prov.idProofType || 'Govt Verified'} ({prov.idProofNumber || 'KA-8812'})
                    </td>
                    <td className="p-3.5 text-right">
                      {!prov.isVerified ? (
                        <button
                          onClick={() => approveProvider(prov.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-xs"
                        >
                          Approve KYC
                        </button>
                      ) : (
                        <button
                          onClick={() => rejectProvider(prov.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-400 text-slate-600 hover:text-rose-600 font-semibold text-[11px]"
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

      {/* TAB 3: Bookings Oversight */}
      {activeTab === 'bookings' && (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 font-display">{b.serviceTitle}</span>
                  <span className="font-mono text-slate-400">#{b.id}</span>
                  <span className="capitalize font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                    {b.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="text-slate-500 mt-1">
                  Customer: <strong>{b.customerName}</strong> · Provider: <strong>{b.providerName}</strong> ({b.providerCategory})
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">Location: {b.address.street}, {b.address.area}</div>
              </div>

              <div className="text-right">
                <div className="font-bold text-base text-slate-900 font-mono">₹{b.amount}</div>
                <div className="text-[10px] text-slate-500">Payment: {b.paymentStatus.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Grocery Catalog Manager */}
      {activeTab === 'grocery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {groceryProducts.map((p) => (
            <div key={p.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <img src={p.image} alt={p.name} className="h-12 w-12 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 truncate">{p.name}</div>
                <div className="text-[11px] text-slate-400">{p.unit} · {p.category}</div>
                <div className="font-bold text-slate-900 mt-0.5">₹{p.price} (MRP ₹{p.mrp})</div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                In Stock
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: Complaints Desk */}
      {activeTab === 'complaints' && (
        <div className="space-y-3">
          {mockComplaints.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{c.issue}</span>
                  <span className="text-[10px] font-mono text-slate-400">#{c.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <div className="text-slate-500 mt-1">
                  Raised by {c.customer} against {c.provider} · {c.date}
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[11px]">
                Investigate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
