
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
  Copy,
  CreditCard,
  Calendar,
  ChevronDown,
  Download
} from 'lucide-react';
import { INITIAL_PARCELS, BRAND_COLORS } from './constants';
import { Parcel, ParcelStatus, PaymentStatus } from './types';
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

const DateRangePicker: React.FC<{
  fromDate: string;
  toDate: string;
  onApply: (from: string, to: string) => void;
  onClear: () => void;
}> = ({ fromDate, toDate, onApply, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFrom, setLocalFrom] = useState(fromDate);
  const [localTo, setLocalTo] = useState(toDate);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setLocalFrom(fromDate);
      setLocalTo(toDate);
    }
  }, [isOpen, fromDate, toDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateLabel = (date: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  const handlePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];
    
    setLocalFrom(startStr);
    setLocalTo(endStr);
  };

  const triggerPicker = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      (e.currentTarget as any).showPicker();
    } catch (err) {}
  };

  const handleApplyClick = () => {
    onApply(localFrom, localTo);
    setIsOpen(false);
  };

  const displayText = fromDate && toDate 
    ? `${formatDateLabel(fromDate)} - ${formatDateLabel(toDate)}`
    : (fromDate || toDate ? (fromDate ? `From ${formatDateLabel(fromDate)}` : `Until ${formatDateLabel(toDate)}`) : 'Select Date Range');

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2.5 border rounded-lg bg-white text-sm font-medium transition-all shadow-sm min-w-[220px] justify-between ${
          isOpen ? 'border-[#1a3762] ring-2 ring-[#1a376210]' : 'border-gray-200 hover:border-gray-300 text-gray-700'
        }`}
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} className={fromDate || toDate ? 'text-[#1a3762]' : 'text-gray-400'} />
          <span className={fromDate || toDate ? 'text-gray-900 font-bold' : 'text-gray-500'}>{displayText}</span>
        </div>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl p-5 z-[110] min-w-[340px] animate-in fade-in zoom-in duration-100 origin-top-left">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">From Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={localFrom}
                  onChange={(e) => setLocalFrom(e.target.value)}
                  onClick={triggerPicker}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-[#1a3762] focus:ring-2 focus:ring-[#1a376210] cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">To Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={localTo}
                  onChange={(e) => setLocalTo(e.target.value)}
                  onClick={triggerPicker}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-[#1a3762] focus:ring-2 focus:ring-[#1a376210] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-2">
            <button onClick={() => handlePreset(0)} className="px-3 py-1.5 text-[11px] font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">Today</button>
            <button onClick={() => handlePreset(7)} className="px-3 py-1.5 text-[11px] font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">Last 7 Days</button>
            <button onClick={() => handlePreset(30)} className="px-3 py-1.5 text-[11px] font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">Last 30 Days</button>
            <button 
              onClick={() => { 
                setLocalFrom(''); setLocalTo(''); onClear(); setIsOpen(false); 
              }}
              className="px-3 py-1.5 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors ml-auto"
            >
              Clear
            </button>
          </div>
          
          <button 
            onClick={handleApplyClick}
            style={{ backgroundColor: BRAND_COLORS.DARK_BLUE }}
            className="w-full mt-5 text-white py-3 rounded-lg text-sm font-bold hover:opacity-95 active:scale-[0.98] transition-all shadow-md shadow-blue-900/10 flex items-center justify-center gap-2"
          >
            <Check size={16} /> Apply Date Filter
          </button>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [parcels] = useState<Parcel[]>(INITIAL_PARCELS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<ParcelStatus>('All');
  const [filterPayment, setFilterPayment] = useState<PaymentStatus>('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
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

  const getRelativeTime = (date: string, time?: string) => {
    if (!time) return "Just now";
    
    const now = new Date();
    const [timeStr, modifier] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const parcelDate = new Date(date);
    parcelDate.setHours(hours, minutes, 0, 0);

    const diffInMs = now.getTime() - parcelDate.getTime();
    const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHrs <= 0) return "0 Hours Ago";
    if (diffInHrs < 24) return `${diffInHrs} Hours Ago`;
    
    const diffInDays = Math.floor(diffInHrs / 24);
    return `${diffInDays} Day${diffInDays > 1 ? 's' : ''} Ago`;
  };

  const handleDownloadCSV = () => {
    const selectedParcels = parcels.filter(p => selectedIds.has(p.id));
    if (selectedParcels.length === 0) return;

    const headers = ['ID', 'Recipient', 'Address', 'Phone', 'COD', 'Delivery Charge', 'COD Charge', 'Status', 'Payment', 'Date', 'Weight', 'Type'];
    const rows = selectedParcels.map(p => [
      p.id, 
      `"${p.recipient}"`, 
      `"${p.address.replace(/"/g, '""')}"`, 
      p.phone, 
      `"${p.cod}"`, 
      `"${p.deliveryCharge}"`, 
      `"${p.codCharge}"`, 
      p.status, 
      p.paymentStatus, 
      p.date, 
      p.weight, 
      p.type
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `parcel_batch_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredParcels = useMemo(() => {
    return parcels.filter(parcel => {
      const matchesSearch = 
        parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.phone.includes(searchTerm);
      const matchesStatus = filterStatus === 'All' || parcel.status === filterStatus;
      const matchesPayment = filterPayment === 'All' || parcel.paymentStatus === filterPayment;
      
      let matchesDate = true;
      if (fromDate || toDate) {
        const parcelDate = new Date(parcel.date);
        if (fromDate) {
          const start = new Date(fromDate);
          start.setHours(0, 0, 0, 0);
          if (parcelDate < start) matchesDate = false;
        }
        if (toDate) {
          const end = new Date(toDate);
          end.setHours(23, 59, 59, 999);
          if (parcelDate > end) matchesDate = false;
        }
      }
      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });
  }, [searchTerm, filterStatus, filterPayment, fromDate, toDate, parcels]);

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

  const getPaymentStyle = (status: Exclude<PaymentStatus, 'All'>) => {
    return status === 'Paid' 
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
      : 'bg-rose-50 text-rose-700 border-rose-100';
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8 md:px-16 lg:px-24 xl:px-48 font-sans text-gray-900 pb-24 transition-all duration-300">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Package className="text-[#1a3762] w-8 h-8" />
              Logistics Parcel Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">Real-time parcel tracking and shipping management console</p>
          </div>
          <button 
            style={{ backgroundColor: BRAND_COLORS.ORANGE }}
            className="hover:opacity-90 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/10 font-bold text-sm active:scale-95"
          >
            <Plus size={20} strokeWidth={3} />
            Add New Parcel
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Total Shipments" value={parcels.length} icon={<Package size={18} />} />
          <StatCard label="Hold Shipments" value={parcels.filter(p => p.status === 'Hold').length} icon={<PauseCircle size={18} />} iconColorClass="text-rose-500" />
          <StatCard label="Active Transit" value={parcels.filter(p => p.status === 'In Transit' || p.status === 'Assigned for delivery' || p.status === 'At Sorting').length} icon={<Truck size={18} />} iconColorClass="text-blue-400" />
          <StatCard label="Completed" value={parcels.filter(p => p.status === 'Delivered').length} icon={<CheckCircle size={18} />} iconColorClass="text-green-400" />
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-t-2xl border border-gray-200 shadow-sm flex flex-col xl:flex-row gap-5 xl:items-center">
          <div className="relative flex-shrink-0 w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, Customer..."
              className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#1a376208] focus:border-[#1a3762] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DateRangePicker 
            fromDate={fromDate} 
            toDate={toDate} 
            onApply={(f, t) => { setFromDate(f); setToDate(t); }} 
            onClear={() => { setFromDate(''); setToDate(''); }}
          />

          <div className="flex flex-wrap gap-3 xl:ml-auto">
            <div className="relative w-44 text-sm">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select 
                className="w-full pl-11 pr-8 py-3 border border-gray-200 rounded-xl appearance-none bg-white text-gray-900 font-medium focus:outline-none focus:border-[#1a3762] cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ParcelStatus)}
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
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>

            <div className="relative w-44 text-sm">
              <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select 
                className="w-full pl-11 pr-8 py-3 border border-gray-200 rounded-xl appearance-none bg-white text-gray-900 font-medium focus:outline-none focus:border-[#1a3762] cursor-pointer"
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value as PaymentStatus)}
              >
                <option value="All">All Payments</option>
                <option value="Paid">Paid Only</option>
                <option value="Unpaid">Unpaid Only</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>

            <button className="p-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowUpDown size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Table Module with Horizontal Scroll */}
        <div className="bg-white border border-t-0 border-gray-200 rounded-b-2xl overflow-hidden shadow-xl shadow-gray-200/50">
          <div className="overflow-x-auto scroll-smooth">
            <table className="w-full text-left min-w-[1280px]">
              <thead className="bg-gray-50/80 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-5 w-4">
                    <CustomCheckbox 
                      checked={filteredParcels.length > 0 && selectedIds.size === filteredParcels.length}
                      onChange={() => {
                        if (selectedIds.size === filteredParcels.length) setSelectedIds(new Set());
                        else setSelectedIds(new Set(filteredParcels.map(p => p.id)));
                      }}
                    />
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date Created</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Shipment ID</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">COD Val</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Deliv Fee</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">COD Fee</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Class</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Lifecycle Status</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Payment</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParcels.length > 0 ? (
                  filteredParcels.map((parcel) => (
                    <tr 
                      key={parcel.id} 
                      className={`transition-all duration-200 group ${selectedIds.has(parcel.id) ? 'bg-[#1a376205]' : 'hover:bg-blue-50/30'}`}
                    >
                      <td className="px-6 py-5">
                        <CustomCheckbox 
                          checked={selectedIds.has(parcel.id)}
                          onChange={() => {
                            const next = new Set(selectedIds);
                            if (next.has(parcel.id)) next.delete(parcel.id);
                            else next.add(parcel.id);
                            setSelectedIds(next);
                          }}
                        />
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <div className="text-xs text-gray-600 font-bold tracking-tight">{parcel.date}</div>
                          <div className="text-[10px] text-gray-500 font-medium">{parcel.time || '10:00 AM'}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                            {getRelativeTime(parcel.date, parcel.time)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#1a3762] tracking-tight">{parcel.id}</span>
                          <CopyButton text={parcel.id} />
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold mt-1.5 uppercase tracking-wider">{parcel.weight}</div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-800 leading-tight text-sm">{parcel.recipient}</p>
                        <p className="text-[11px] text-gray-400 truncate max-w-[150px] font-medium mt-0.5">{parcel.address}</p>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap font-semibold">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          <span>{parcel.phone}</span>
                          <CopyButton text={parcel.phone} />
                        </div>
                      </td>
                      <td className="px-6 py-5 font-black text-gray-800 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <Banknote size={16} className="text-green-500" />
                          {parcel.cod}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap text-right font-bold">{parcel.deliveryCharge}</td>
                      <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap text-right font-bold">{parcel.codCharge}</td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-2.5 py-1 text-[10px] font-black border rounded-md bg-gray-50 text-gray-500 uppercase tracking-tighter shadow-sm">
                          {parcel.type}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold transition-all whitespace-nowrap shadow-sm ${getStatusStyle(parcel.status)}`}>
                          {getStatusIcon(parcel.status)}
                          {parcel.status}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${getPaymentStyle(parcel.paymentStatus)}`}>
                          {parcel.paymentStatus}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-1.5 relative">
                          <button className="p-2 text-gray-400 hover:text-[#1a3762] hover:bg-[#1a376208] rounded-xl transition-all">
                            <ChevronRight size={18} />
                          </button>
                          <button 
                            onClick={() => setActiveMenuId(activeMenuId === parcel.id ? null : parcel.id)}
                            className={`p-2 rounded-xl transition-all ${activeMenuId === parcel.id ? 'bg-gray-100 text-[#1a3762]' : 'text-gray-400 hover:text-gray-600'}`}
                          >
                            <MoreVertical size={18} />
                          </button>
                          {activeMenuId === parcel.id && (
                            <div ref={menuRef} className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-2xl border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in slide-in-from-top-2 duration-150 origin-top-right">
                              <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50/50 flex items-center gap-3 transition-colors">
                                <Edit size={14} className="text-blue-500" /> Edit Order
                              </button>
                              <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                <Trash2 size={14} className="text-red-500" /> Void Ship.
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="px-6 py-20 text-center text-gray-400 text-sm">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-5 bg-gray-50 rounded-full">
                          <Package size={48} className="opacity-10 text-[#1a3762]" />
                        </div>
                        <p className="font-semibold tracking-wide uppercase text-xs">No matching parcels found in directory</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-400 uppercase font-black tracking-widest">
              Filtered Matrix: <span className="text-[#1a3762]">{filteredParcels.length}</span> entries
            </p>
            <div className="flex gap-3">
              <button disabled className="px-5 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-300 cursor-not-allowed font-bold uppercase tracking-widest">Prev</button>
              <button className="px-5 py-2 text-xs border border-gray-200 rounded-xl bg-white text-[#1a3762] font-bold hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm">Next</button>
            </div>
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#1a3762] text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-8 animate-in slide-in-from-bottom-12 duration-500 z-[100] border-2 border-white/20 backdrop-blur-md">
            <div className="flex items-center gap-4 pr-8 border-r border-white/20">
              <span className="bg-white text-[#1a3762] w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-inner">{selectedIds.size}</span>
              <span className="text-sm font-bold tracking-wide uppercase">Batch Selection</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleDownloadCSV} className="flex items-center gap-2.5 px-5 py-2.5 hover:bg-white/10 rounded-full transition-all text-xs font-black uppercase tracking-widest group">
                <Download size={18} className="text-blue-400 group-hover:scale-110 transition-transform" /> Download CSV
              </button>
              <button onClick={() => alert('Printing labels...')} className="flex items-center gap-2.5 px-5 py-2.5 hover:bg-white/10 rounded-full transition-all text-xs font-black uppercase tracking-widest group">
                <Printer size={18} className="text-[#ff751f] group-hover:scale-110 transition-transform" /> Print Labels
              </button>
              <button onClick={() => alert('Generating invoices...')} className="flex items-center gap-2.5 px-5 py-2.5 hover:bg-white/10 rounded-full transition-all text-xs font-black uppercase tracking-widest group">
                <FileText size={18} className="text-[#ff751f] group-hover:scale-110 transition-transform" /> Invoices
              </button>
            </div>
            <button onClick={() => setSelectedIds(new Set())} className="ml-2 p-1.5 hover:bg-red-500 rounded-full transition-all active:rotate-90">
              <X size={20} />
            </button>
          </div>
        )}

        <div className="mt-12 text-center pb-10">
          <p className="text-[10px] text-gray-300 uppercase tracking-[0.4em] font-black">Secure Merchant Gateway • Logistics Core v3.0.1</p>
        </div>
      </div>
    </div>
  );
};

export default App;
