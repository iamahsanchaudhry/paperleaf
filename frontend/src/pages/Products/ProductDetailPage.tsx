import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/api/productApi";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import type { Product } from "@/types/product.types";

const ProductDetailPage = () => {
  const { id } = useParams(); // URL param /products/:id
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dummyPic = "https://cdn.prod.website-files.com/605826c62e8de87de744596e/67f03108356b66fc2101fd00_product-page-template.webp";
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById("68f79aaad963e7af5d5ef312");
        
        console.log(res);
        setProduct(res.data);
        toast.success("Product Fetch Succesfully!", {
          description: res.message,
        })
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed!", {
        description: "Failed to Fetch Product. Try again later!",
        })
      } finally {
        
        setLoading(false);  
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <Loader />
    );

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
      <Link to="/products" className="inline-flex items-center mb-6 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 rounded-2xl p-2 h-auto bg-emerald-100 dark:bg-gray-800">
        <div className="flex justify-left">
          <img
            src={dummyPic/*product.image || "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508"*/}
            alt={product.name}
            className="w-full max-w-md rounded-xl shadow-md object-cover"
          />
        </div>

        <div className="flex flex-col justify-around items-start space-y-3 rounded-2xl p-5 bg-emerald-200 dark:bg-gray-900">
          <h1 className="text-4xl font-semibold">{product.name}</h1>
          <p className="text-xl text-emerald-600 font-medium">Price: Rs. {product.price}</p>
          <p className="text-gray-600">{product.description || "No description available."}</p>

          <div className="text-sm text-gray-500">
            <p>Category: <span className="font-medium">{product.category}</span></p>
            {product.subcategory && (
              <p>Subcategory: <span className="font-medium">{product.subcategory}</span></p>
            )}
          </div>

          <Button size="lg" className="mt-4 w-full sm:w-auto">
            <MessageCircle color="#25D366"/>
            Order on Whatsapp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
