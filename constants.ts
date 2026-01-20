
import { Parcel } from './types';

export const BRAND_COLORS = {
  ORANGE: '#ff751f',
  DARK_BLUE: '#1a3762',
};

export const INITIAL_PARCELS: Parcel[] = [
  { id: 'TRK89234', recipient: 'Rahul Ahmed', address: 'Mirpur-10, Dhaka', phone: '01712-345678', cod: '৳ 2,500', deliveryCharge: '৳ 60', codCharge: '৳ 25', status: 'Delivered', date: '2023-10-25', weight: '2.5 kg', type: 'Standard' },
  { id: 'TRK89235', recipient: 'Sumaiya Akter', address: 'GEC Circle, Chittagong', phone: '01823-456789', cod: '৳ 0', deliveryCharge: '৳ 120', codCharge: '৳ 0', status: 'In Transit', date: '2023-10-26', weight: '1.2 kg', type: 'Express' },
  { id: 'TRK89240', recipient: 'Karim Ullah', address: 'Zindabazar, Sylhet', phone: '01711-223344', cod: '৳ 1,500', deliveryCharge: '৳ 60', codCharge: '৳ 15', status: 'At Sorting', date: '2023-10-28', weight: '0.5 kg', type: 'Standard' },
  { id: 'TRK89236', recipient: 'Jasim Uddin', address: 'Uposhohor, Sylhet', phone: '01934-567890', cod: '৳ 4,200', deliveryCharge: '৳ 60', codCharge: '৳ 42', status: 'Pending', date: '2023-10-27', weight: '5.0 kg', type: 'Standard' },
  { id: 'TRK89241', recipient: 'Nabila Islam', address: 'Banani, Dhaka', phone: '01855-667788', cod: '৳ 5,800', deliveryCharge: '৳ 60', codCharge: '৳ 58', status: 'Assigned for delivery', date: '2023-10-28', weight: '1.1 kg', type: 'Express' },
  { id: 'TRK89237', recipient: 'Farhana Yasmin', address: 'Sonadanga, Khulna', phone: '01645-678901', cod: '৳ 1,200', deliveryCharge: '৳ 60', codCharge: '৳ 12', status: 'Cancelled', date: '2023-10-24', weight: '0.8 kg', type: 'Fragile' },
  { id: 'TRK89242', recipient: 'Zubair Hossain', address: 'Chawkbazar, Chittagong', phone: '01511-998877', cod: '৳ 2,200', deliveryCharge: '৳ 60', codCharge: '৳ 22', status: 'At Delivery Hub', date: '2023-10-27', weight: '2.0 kg', type: 'Standard' },
  { id: 'TRK89243', recipient: 'Meherun Nesa', address: 'Dhanmondi, Dhaka', phone: '01300-112233', cod: '৳ 9,000', deliveryCharge: '৳ 60', codCharge: '৳ 90', status: 'Hold', date: '2023-10-26', weight: '4.5 kg', type: 'Fragile' },
  { id: 'TRK89238', recipient: 'Abdullah Al Mamun', address: 'Rajshahi Sadar', phone: '01556-789012', cod: '৳ 3,000', deliveryCharge: '৳ 60', codCharge: '৳ 30', status: 'In Transit', date: '2023-10-26', weight: '3.4 kg', type: 'Standard' },
];
