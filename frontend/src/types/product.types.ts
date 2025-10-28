export interface ProductRes {
  _id: string;
  name: string;
  description: string;
  availibity: boolean;
  featuredItem: boolean;
  price: number;
  category: ProductCategory;
  subcategory: StationerySubcategory | "";
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductReq {
  name: string;
  description: string;
  availibity: boolean;
  featuredItem: boolean;
  price: number;
  category: ProductCategory;
  subcategory?: StationerySubcategory | "";
  image: string;
}

export interface ProductListResponse {
  message: string;
  data: ProductRes[];
}

export interface ProductSingleResponse {
  message: string;
  data: ProductRes;
}


export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
  subcategory?: StationerySubcategory | "";
  image?: string;
}

export interface ProductDeleteResponse {
  message: string
}
export type ProductCategory = "stationary" | "gift" | "decor";

export const stationerySubcategories = [
  "Notebooks-And-Journals",
  "Pens-And-Pencils",
  "erasers-and-sharpeners",
  "Markers-And-Highlighters",
  "Art-Supplies",
  "Office-Supplies",
  "Other-stationary",
] as const;

export type StationerySubcategory = typeof stationerySubcategories[number];