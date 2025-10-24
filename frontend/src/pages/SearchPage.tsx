import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchProducts } from "@/api/productApi";
import ProductCard from "@/components/Cards/ProductCard";
import type { Product } from "@/types/product.types";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const res = await getSearchProducts(query);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [query]);

  if (loading)
    return (
      <Loader />
    );

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
      Total {products.length} Search Results for “{query}”
    </h1>

    {products.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">
        No products found matching your search.
      </p>
    ) : (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-3 rounded-2xl bg-emerald-100 dark:bg-gray-900 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, staggerChildren: 0.1 }}
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard item={product} />
          </motion.div>
        ))}
      </motion.div>
    )}
  </div>
);
}
