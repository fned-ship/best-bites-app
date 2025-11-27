export interface Stock {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  minThreshold: number;
  supplier?: {
    name: string;
    contact: string;
  };
  lastRestocked: string;
  category: string;
  status?: string; // Virtual field: 'in_stock', 'low_stock', 'out_of_stock'
  createdAt: string;
  updatedAt: string;
}