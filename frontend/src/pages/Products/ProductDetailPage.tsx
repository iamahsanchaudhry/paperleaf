import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, MessageCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProduct, getProductById, updateProduct } from "@/api/productApi";
//import { toast } from "sonner";
import Loader from "@/components/Loader";
import type {ProductRes } from "@/types/product.types";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { DeleteProductDialog } from "@/components/Product/DeleteProductDialog";
import { toast } from "sonner";
import { EditProductDialog } from "@/components/Product/EditProductDialog";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductRes | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isProductDeleting, setisProdcutDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const dummyPic =
    "https://cdn.prod.website-files.com/605826c62e8de87de744596e/67f03108356b66fc2101fd00_product-page-template.webp";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id || "");
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {}, []);

  const handleUpdate = async (id: string, formData: FormData) => {
    try {
      setIsUpdating(true);
      if (!token) return;
      const res = await updateProduct(id, formData, token); // API call
      toast.success("Product Updated!", {
        description: res.message,
      });
      setProduct(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error Updating product", {
        description: "Failed to update product. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setisProdcutDeleting(true);
      if (!product || !token) return;
      const res = await deleteProduct(product._id, token);
      setisProdcutDeleting(false);
      toast.success("Product Deleted!", {
        description: res.message,
      });
      navigate(-1); // redirect after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product", {
        description: "Failed to delete product. Please try again.",
      });
    }
  };

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
              src={product.image || dummyPic}
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

          <div className="flex flex-col sm:flex-row justify-between items-center w-full py-4 px-4 rounded-2xl gap-4 bg-emerald-100 dark:bg-gray-800">
            {/* WhatsApp Button */}
            <Link
              to="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full transition-all shadow-md hover:scale-105 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 animate-bounce" />
              Order on WhatsApp
            </Link>

            {/* Admin Controls */}
            {token && (
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center sm:justify-end">
                <EditProductDialog
                  trigger={
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-2xl text-white w-full sm:w-auto">
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  }
                  product={product}
                  productUpdating={isUpdating}
                  onConfirm={(updatedData) =>
                    handleUpdate(product._id, updatedData)
                  }
                />

                <DeleteProductDialog
                  trigger={
                    <Button
                      variant="destructive"
                      className="w-full sm:w-auto rounded-2xl"
                    >
                      <Trash className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  }
                  onConfirm={handleDelete}
                  productDeleting={isProductDeleting}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
