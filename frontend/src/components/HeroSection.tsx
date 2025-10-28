
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";// path to your dialog
import { AddProductDialog } from "./Product/AddProductDialog";
import { useAuth } from "@/context/AuthContext";

export default function Hero() {
  const { token } = useAuth();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-300 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-10 md:py-20 gap-8 md:gap-12">
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Discover Quality{" "}
            <span className="text-emerald-700 dark:text-emerald-400">
              Stationery, Gifts
            </span>{" "}
            &{" "}
            <span className="text-emerald-700 dark:text-emerald-400">
              Decor
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto md:mx-0">
            Bring creativity and inspiration to your workspace with premium
            stationery, personalized gifts, and art supplies made to spark
            ideas.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-start gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() =>
                document
                  .getElementById("Categoryfeatures")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Link to="/about" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-400"
              >
                Learn More
              </Button>
            </Link>

            {/* Add Product Button */}
            {token? <AddProductDialog
              trigger={
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add Product
                </Button>
              }
            />: null}
            
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 flex justify-center w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="shadow-xl rounded-3xl overflow-hidden border-5 bg-gradient-to-tr from-emerald-800 to-emerald-100 dark:from-gray-800 dark:to-gray-900 w-full h-full p-0">
            <CardContent className="p-0 rounded-3xl">
              <div className="relative w-full h-[350px] md:h-[450px] ">
                <img
                  src="https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500"
                  alt="Stationery collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 dark:bg-emerald-800 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-200 dark:bg-emerald-900 rounded-full blur-3xl opacity-30 -z-10"></div>
    </section>
  );
}
