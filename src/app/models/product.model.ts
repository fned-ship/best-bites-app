export interface Product {
  _id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  image: string;
  rating: {
    average: number;
    count: number;
  };
  orderCount: number;
  ingredients: Array<{
    stock: any; 
    quantity: number;
  }>;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}