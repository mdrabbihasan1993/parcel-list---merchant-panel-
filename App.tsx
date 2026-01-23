
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Plus,
  ArrowUpDown,
  Phone,
  Banknote,
  Layers,
  UserCheck,
  MapPin,
  PauseCircle,
  Edit,
  Trash2,
  MessageSquare,
  Printer,
  FileText,
  X,
  Check,
  Copy
} from 'lucide-react';
import { INITIAL_PARCELS, BRAND_COLORS } from './constants';
import { Parcel, ParcelStatus } from './types';
import { StatCard } from './components/StatCard';

const CustomCheckbox: React.FC<{ 
  checked: boolean; 
  onChange: () => void;
  className?: string;
}> = ({ checked, onChange, className = "" }) => (
  <button 
    onClick={(e) => {
      e.stopPropagation();
      onChange();
    }}
    className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center bg-white ${
      checked ? 'border-[#1a3762]' : 'border-gray-300'
    } ${className}`}
  >
    {checked && <Check size={14} strokeWidth={4} className="text-[#1a3762]" />}
  </button>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-[#1a3762] flex items-center justify-center"
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
    </button>
  );
};

const App: React.FC = () => {
  const [parcels] = useState<Parcel[]>(INITIAL_PARCELS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<ParcelStatus>('All');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredParcels = useMemo(() => {
    return parcels.filter(parcel => {
      const matchesSearch = 
        parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.phone.includes(searchTerm);
      const matchesFilter = filterStatus === 'All' || parcel.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus, parcels]);

  const getStatusStyle = (status: Exclude<ParcelStatus, 'All'>) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Transit': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'At Sorting': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Assigned for delivery': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'At Delivery Hub': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'Hold': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Exclude<ParcelStatus, 'All'>) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={14} />;
      case 'In Transit': return <Truck size={14} />;
      case 'Pending': return <Clock size={14} />;
      case 'Cancelled': return <AlertCircle size={14} />;
      case 'At Sorting': return <Layers size={14} />;
      case 'Assigned for delivery': return <UserCheck size={14} />;
      case 'At Delivery Hub': return <MapPin size={14} />;
      case 'Hold': return <PauseCircle size={14} />;
      default: return null;
    }
  };

  const toggleMenu = (id: string) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const toggleSelectAll = () => {
    if (filteredParcels.length > 0 && selectedIds.size === filteredParcels.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredParcels.map(p => p.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handlePrintLabels = () => {
    alert(`Printing Labels for: ${Array.from(selectedIds).join(', ')}`);
  };

  const handlePrintInvoices = () => {
    alert(`Generating Invoices for: ${Array.from(selectedIds).join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-900 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="text-[#1a3762]" />
              Logistics Parcel Dashboard
            </h1>
            <p className="text-gray-500 text-sm">Track and manage your shipment lifecycle</p>
          </div>
          <button 
            style={{ backgroundColor: BRAND_COLORS.ORANGE }}
            className="hover:opacity-90 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm font-semibold text-sm active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            Add New Parcel
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Parcels" value={parcels.length} icon={<Package size={16} />} />
          <StatCard 
            label="Pending" 
            value={parcels.filter(p => p.status === 'Pending' || p.status === 'Hold').length} 
            icon={<Clock size={16} />} 
            iconColorClass="text-yellow-400"
          />
          <StatCard 
            label="In Transit" 
            value={parcels.filter(p => p.status === 'In Transit' || p.status === 'Assigned for delivery' || p.status === 'At Sorting').length} 
            icon={<Truck size={16} />} 
            iconColorClass="text-blue-400"
          />
          <StatCard 
            label="Delivered" 
            value={parcels.filter(p => p.status === 'Delivered').length} 
            icon={<CheckCircle size={16} />} 
            iconColorClass="text-green-400"
          />
        </div>

        <div className="bg-white p-4 rounded-t-xl border border-gray-200 flex flex-col md:flex-row gap-4 items-center shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, Name or Mobile..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a376210] focus:border-[#1a3762] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-56 text-sm">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select 
                className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:border-[#1a3762] cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ParcelStatus)}
                style={{ backgroundColor: 'white' }}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="At Sorting">At Sorting</option>
                <option value="At Delivery Hub">At Delivery Hub</option>
                <option value="Assigned for delivery">Assigned for delivery</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Hold">Hold</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={14} />
            </div>
            <button className="p-2.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowUpDown size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl overflow-visible shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 w-4">
                    <CustomCheckbox 
                      checked={filteredParcels.length > 0 && selectedIds.size === filteredParcels.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tracking ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile Number</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">COD Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Deliv. Charge</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">COD Charge</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParcels.length > 0 ? (
                  filteredParcels.map((parcel) => (
                    <tr 
                      key={parcel.id} 
                      className={`transition-colors group ${selectedIds.has(parcel.id) ? 'bg-[#1a376208]' : 'hover:bg-blue-50/20'}`}
                    >
                      <td className="px-6 py-4">
                        <CustomCheckbox 
                          checked={selectedIds.has(parcel.id)}
                          onChange={() => toggleSelectOne(parcel.id)}
                        />
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600 whitespace-nowrap">{parcel.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#1a3762]">{parcel.id}</span>
                          <CopyButton text={parcel.id} />
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase font-medium mt-1 tracking-tight">{parcel.weight}</div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800 leading-tight text-sm">{parcel.recipient}</p>
                        <p className="text-[11px] text-gray-500 truncate max-w-[120px] font-normal">{parcel.address}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap font-medium">
                        <div className="flex items-center gap-1.5">
                          <Phone size={13} className="text-gray-400" />
                          <span>{parcel.phone}</span>
                          <CopyButton text={parcel.phone} />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-700 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-1.5">
                          <Banknote size={14} className="text-green-600" />
                          {parcel.cod}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap text-right font-medium">{parcel.deliveryCharge}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap text-right font-medium">{parcel.codCharge}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-0.5 text-[10px] font-bold border rounded bg-gray-50 text-gray-600 uppercase tracking-tighter">
                          {parcel.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold transition-all whitespace-nowrap ${getStatusStyle(parcel.status)}`}>
                          {getStatusIcon(parcel.status)}
                          {parcel.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 relative">
                          <button className="p-1.5 text-gray-400 hover:text-[#1a3762] hover:bg-[#1a376210] rounded-lg transition-all group-hover:scale-105">
                            <ChevronRight size={18} />
                          </button>
                          <div className="relative inline-block text-left">
                            <button 
                              onClick={() => toggleMenu(parcel.id)}
                              className={`p-1.5 rounded transition-all ${activeMenuId === parcel.id ? 'bg-gray-100 text-[#1a3762]' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                              <MoreVertical size={18} />
                            </button>
                            {activeMenuId === parcel.id && (
                              <div ref={menuRef} className="absolute right-0 mt-2 w-36 rounded-lg bg-white shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in zoom-in duration-75" style={{ transformOrigin: 'top right' }}>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                                  <Edit size={14} className="text-blue-500" /> Edit
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                                  <Trash2 size={14} className="text-red-500" /> Delete
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                                  <MessageSquare size={14} className="text-orange-500" /> Complain
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="px-6 py-12 text-center text-gray-400 text-sm">
                      <div className="flex flex-col items-center gap-2">
                        <Package size={32} className="opacity-20" />
                        <p>No parcels found matching your search.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">
              Showing <span className="font-bold text-[#1a3762]">{filteredParcels.length}</span> results
            </p>
            <div className="flex gap-2">
              <button disabled className="px-4 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-400 cursor-not-allowed font-semibold uppercase transition-colors">Previous</button>
              <button className="px-4 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-[#1a3762] font-semibold hover:bg-gray-50 transition-colors uppercase">Next</button>
            </div>
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1a3762] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 duration-300 z-[100] border border-white/10">
            <div className="flex items-center gap-3 pr-6 border-r border-white/20">
              <span className="bg-white text-[#1a3762] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{selectedIds.size}</span>
              <span className="text-sm font-medium whitespace-nowrap">Parcels Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handlePrintLabels} className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-colors text-sm font-semibold whitespace-nowrap">
                <Printer size={18} className="text-[#ff751f]" /> Label Print
              </button>
              <button onClick={handlePrintInvoices} className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-colors text-sm font-semibold whitespace-nowrap">
                <FileText size={18} className="text-[#ff751f]" /> Invoice Print
              </button>
            </div>
            <button onClick={() => setSelectedIds(new Set())} className="ml-2 p-1.5 hover:bg-red-500 rounded-full transition-all">
              <X size={18} />
            </button>
          </div>
        )}

        <div className="mt-8 text-center pb-8">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">Logistics Intelligence System • Stable Build v2.5.0</p>
        </div>
      </div>
    </div>
  );
};

export default App;
