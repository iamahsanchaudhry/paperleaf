import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

function ProductCard({item}: any) {
  const dummyPic = "https://cdn.prod.website-files.com/605826c62e8de87de744596e/67f03108356b66fc2101fd00_product-page-template.webp";
  
  return (
    <Card className="group flex flex-col h-full p-0 w-full overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800 transition-transform hover:-translate-y-2 hover:shadow-xl">
      <CardContent className="flex flex-col h-full w-full p-0">
        {/* Image Section */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={item.image || dummyPic}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-2xl transform transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-between flex-1 p-5 text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              {item.name}
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              Price: {item.price}Rs
            </p>
          </div>

          <div className="mt-3">
            <Link to={`/products/${item.id}`}>
              <Button
                variant="link"
                className="px-0 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                View More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
