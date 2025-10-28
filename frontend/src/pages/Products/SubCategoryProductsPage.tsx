import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/Cards/ProductCard";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import { getSubCategoryProducts } from "@/api/productApi";
import type { ProductRes } from "@/types/product.types";

export default function SubCategoryProductsPage() {
  const { category, subcategory } = useParams<{
    category: string;
    subcategory?: string;
  }>();
  const [products, setProducts] = useState<ProductRes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      try {
        setLoading(true);
        const allProducts = await getSubCategoryProducts(category, subcategory);
        console.log(category, subcategory);
        setProducts(allProducts.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-center text-red-500 font-medium mt-10">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 capitalize">
        {category} {subcategory && `→ ${subcategory}`} Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-3 rounded-2xl bg-emerald-100 dark:bg-gray-900 ">
          {products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full w-full"
              key={index}
            >
              <ProductCard key={product._id} item={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
