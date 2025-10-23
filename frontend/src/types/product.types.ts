export interface Product {
  _id: string;
  name: string;
  description: string;
  availibity: boolean;
  featuredItem: boolean;
  price: number;
  category: "stationery" | "gift" | "other";
  subcategory: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ✅ For fetching all products
export interface ProductListResponse {
  message: string;
  data: Product[];
}

// ✅ For fetching a single product
export interface ProductSingleResponse {
  message: string;
  data: Product;
}

// ✅ Optional: For create/update payloads (no _id, timestamps, etc.)
export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  category: "stationery" | "gift" | "other";
  subcategory?: string;
  image?: string;
}
