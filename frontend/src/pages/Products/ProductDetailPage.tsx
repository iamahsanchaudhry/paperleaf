import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/api/productApi";
//import { toast } from "sonner";
import Loader from "@/components/Loader";
import type { Product } from "@/types/product.types";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dummyPic =
    "https://cdn.prod.website-files.com/605826c62e8de87de744596e/67f03108356b66fc2101fd00_product-page-template.webp";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id || "");
        setProduct(res.data);
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

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (!product)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/products">
          <Button className="mt-4">Back to Products</Button>
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center mb-6 text-md font-semibold text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 rounded-2xl p-2 h-auto bg-emerald-100 dark:bg-gray-800">
        <div className="flex justify-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={
                dummyPic /*product.image || "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508"*/
              }
              alt={product.name}
              className="w-full max-w-md rounded-2xl shadow-md object-cover"
            />
          </motion.h1>
        </div>

        <div className="flex flex-col justify-between items-start space-y-3 rounded-2xl p-5 bg-emerald-200 dark:bg-gray-900">
          {/* Title + Featured Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {product.featuredItem && (
              <div className="self-start sm:self-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full shadow-md sm:text-base">
                  ⭐ Featured
                </span>
              </div>
            )}
          </div>

          {/* Price */}
          <p className="text-lg sm:text-xl text-emerald-600 font-medium">
            Price: Rs. {product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            {product.description || "No description available."}
          </p>

          {/* Category Info */}
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>
              Category: <span className="font-medium">{product.category}</span>
            </p>
            {product.subcategory && (
              <p>
                Subcategory:{" "}
                <span className="font-medium">{product.subcategory}</span>
              </p>
            )}
          </div>

          {/* Availability */}
          <div className="mt-3">
            {product.availibity ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-green-800 text-white text-sm font-semibold shadow-md animate-pulse hover:scale-105 transition-transform duration-200">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-ping" />
                <span>Available</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-semibold shadow-md hover:scale-105 transition-transform duration-200">
                <span className="inline-block w-2 h-2 bg-white rounded-full" />
                <span>Out of Stock</span>
              </div>
            )}
          </div>

          <div className="flex justify-center hover:scale-105">
            <Link
              to="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full transition-all shadow-md"
            >
              <MessageCircle className="w-5 h-5 animate-bounce animation-duration-initial-[10000]" />
              Order on WhatsApp
            </Link>
          </div>
          {/* <Button size="lg" className="mt-4 w-full sm:w-auto">
            <MessageCircle color="#25D366" />
            Order on Whatsapp
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
