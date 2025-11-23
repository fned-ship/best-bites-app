export interface OrderItem {
  product: string; 
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: string; 
  items: OrderItem[];
  status: string;
  deliveryAddress: string;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}