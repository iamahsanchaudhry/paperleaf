import type {
  ProductDeleteResponse,
  ProductListResponse,
  ProductSingleResponse,
} from "@/types/product.types";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getAllProducts = async (): Promise<ProductListResponse> => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const getFeaturedProducts = async (): Promise<ProductListResponse> => {
  const response = await axios.get(`${API_BASE_URL}/products`, {
    params: { featured: true },
  });
  return response.data;
};

export const getSubCategoryProducts = async (
  category?: string,
  subcategory?: string
): Promise<ProductListResponse> => {
  const response = await axios.get(`${API_BASE_URL}/products`, {
    params: { category, subcategory }, // axios automatically converts to ?category=x&subcategory=y
  });

  return response.data;
};

export const getCategoryProducts = async (
  category?: string
): Promise<ProductListResponse> => {
  const response = await axios.get(`${API_BASE_URL}/products`, {
    params: { category },
  });

  return response.data;
};

export const getProductById = async (
  id: string
): Promise<ProductSingleResponse> => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const getSearchProducts = async (
  query: string
): Promise<ProductListResponse> => {
  const response = await axios.get(`${API_BASE_URL}/products`, {
    params: { search: query },
  });
  return response.data;
};

export const createProduct = async (
  formData: FormData,
  token: string
): Promise<ProductSingleResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/products`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );
  console.log(formData.get("image"));
  return response.data;
};

export const updateProduct = async (
  id: string,
  updatedData: FormData,
  token: string
): Promise<ProductSingleResponse> => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteProduct = async (
  id: string,
  token: string
): Promise<ProductDeleteResponse> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
