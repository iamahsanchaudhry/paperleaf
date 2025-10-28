import { motion } from "framer-motion";
import ProductCard from "./Cards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { useEffect, useState } from "react";
import type { ProductRes } from "@/types/product.types";
import { getFeaturedProducts } from "@/api/productApi";
//import { toast } from "sonner";
import Loader from "./Loader";

export default function FeaturedItemsSection() {
  const [featuredItems, setFearuredItems] = useState<ProductRes[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFetureItems = async () => {
      try {
        const res = await getFeaturedProducts();
        setFearuredItems(res.data);
        // toast.success("Product Fetch Succesfully!", {
        //   description: res.message,
        // });
      } catch (error) {
        console.error("Error fetching product:", error);
        // toast.error("Failed!", {
        //   description: "Failed to Fetch Product. Try again later!",
        // });
      } finally {
        setLoading(false);
      }
    };
    fetchFetureItems();
  }, []);

  if (!featuredItems)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );

  return (
    <section
      id="FeaturedItems"
      className="relative py-10 w-full bg-gradient-to-br scroll-mt-24 from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6"
          >
            Featured Products
          </motion.h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
            Explore our most loved products, handpicked for you.
          </p>

          <div className="relative w-full rounded-xl sm:rounded-2xl bg-emerald-100 dark:bg-gray-900 px-5 sm:py-6">
            <Carousel className="w-full">
              <CarouselContent className="">
                {featuredItems.map((item, index) => (
                  <CarouselItem
                    key={item._id}
                    className="basis-full xs:basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full w-full py-2"
                    >
                      <ProductCard item={item} index={index} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* ✅ Make arrows visible & mobile-friendly */}
              <CarouselPrevious
                className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 shadow-md rounded-full p-1 sm:p-2"/>
              <CarouselNext
                className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 shadow-md rounded-full p-1 sm:p-2"/>
            </Carousel>
          </div>
        </div>
      )}
    </section>
  );
}
