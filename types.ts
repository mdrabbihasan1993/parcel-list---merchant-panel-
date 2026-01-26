
export type ParcelStatus = 
  | 'Delivered' 
  | 'In Transit' 
  | 'Pending' 
  | 'Cancelled' 
  | 'At Sorting' 
  | 'Assigned for delivery' 
  | 'At Delivery Hub' 
  | 'Hold' 
  | 'All';

export type PaymentStatus = 'Paid' | 'Unpaid' | 'All';

export interface Parcel {
  id: string;
  recipient: string;
  address: string;
  phone: string;
  cod: string;
  deliveryCharge: string;
  codCharge: string;
  status: Exclude<ParcelStatus, 'All'>;
  paymentStatus: Exclude<PaymentStatus, 'All'>;
  date: string;
  weight: string;
  type: 'Standard' | 'Express' | 'Fragile';
}
