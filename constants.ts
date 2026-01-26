
import { Parcel } from './types';

export const BRAND_COLORS = {
  ORANGE: '#ff751f',
  DARK_BLUE: '#1a3762',
};

// Getting today's date in YYYY-MM-DD format for realistic relative timing
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

export const INITIAL_PARCELS: Parcel[] = [
  { id: 'TRK89234', recipient: 'Rahul Ahmed', address: 'Mirpur-10, Dhaka', phone: '01712-345678', cod: '৳ 2,500', deliveryCharge: '৳ 60', codCharge: '৳ 25', status: 'Delivered', paymentStatus: 'Paid', date: today, time: '10:24 AM', weight: '2.5 kg', type: 'Standard' },
  { id: 'TRK89235', recipient: 'Sumaiya Akter', address: 'GEC Circle, Chittagong', phone: '01823-456789', cod: '৳ 0', deliveryCharge: '৳ 120', codCharge: '৳ 0', status: 'Hold', paymentStatus: 'Unpaid', date: today, time: '08:45 AM', weight: '1.2 kg', type: 'Express' },
  { id: 'TRK89240', recipient: 'Karim Ullah', address: 'Zindabazar, Sylhet', phone: '01711-223344', cod: '৳ 1,500', deliveryCharge: '৳ 60', codCharge: '৳ 15', status: 'At Sorting', paymentStatus: 'Paid', date: today, time: '02:15 PM', weight: '0.5 kg', type: 'Standard' },
  { id: 'TRK89236', recipient: 'Jasim Uddin', address: 'Uposhohor, Sylhet', phone: '01934-567890', cod: '৳ 4,200', deliveryCharge: '৳ 60', codCharge: '৳ 42', status: 'Pending', paymentStatus: 'Unpaid', date: yesterday, time: '02:30 PM', weight: '5.0 kg', type: 'Standard' },
  { id: 'TRK89241', recipient: 'Nabila Islam', address: 'Banani, Dhaka', phone: '01855-667788', cod: '৳ 5,800', deliveryCharge: '৳ 60', codCharge: '৳ 58', status: 'Hold', paymentStatus: 'Paid', date: today, time: '04:10 PM', weight: '1.1 kg', type: 'Express' },
  { id: 'TRK89237', recipient: 'Farhana Yasmin', address: 'Sonadanga, Khulna', phone: '01645-678901', cod: '৳ 1,200', deliveryCharge: '৳ 60', codCharge: '৳ 12', status: 'Cancelled', paymentStatus: 'Unpaid', date: yesterday, time: '01:20 PM', weight: '0.8 kg', type: 'Fragile' },
  { id: 'TRK89242', recipient: 'Zubair Hossain', address: 'Chawkbazar, Chittagong', phone: '01511-998877', cod: '৳ 2,200', deliveryCharge: '৳ 60', codCharge: '৳ 22', status: 'At Delivery Hub', paymentStatus: 'Paid', date: yesterday, time: '08:50 AM', weight: '2.0 kg', type: 'Standard' },
  { id: 'TRK89243', recipient: 'Meherun Nesa', address: 'Dhanmondi, Dhaka', phone: '01300-112233', cod: '৳ 9,000', deliveryCharge: '৳ 60', codCharge: '৳ 90', status: 'Hold', paymentStatus: 'Unpaid', date: yesterday, time: '03:55 PM', weight: '4.5 kg', type: 'Fragile' },
  { id: 'TRK89238', recipient: 'Abdullah Al Mamun', address: 'Rajshahi Sadar', phone: '01556-789012', cod: '৳ 3,000', deliveryCharge: '৳ 60', codCharge: '৳ 30', status: 'In Transit', paymentStatus: 'Paid', date: yesterday, time: '12:05 PM', weight: '3.4 kg', type: 'Standard' },
];
