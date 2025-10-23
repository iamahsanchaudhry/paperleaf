import { motion } from "framer-motion";
import ProductCard from "./Cards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

const items = [
  {
    id: 0,
    title: "Notebooks & Journals",
    description:
      "Premium notebooks and journals designed to capture your ideas, thoughts, and creativity.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/products/",
  },
  {
    id: 1,
    title: "Pens & Pencils",
    description:
      "Smooth-writing pens and pencils for daily use, sketching, and professional work.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/products/",
  },
  {
    id: 2,
    title: "Markers & Highlighters",
    description:
      "Add color and emphasis to your notes with vibrant markers and highlighters.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/products/",
  },
  {
    id: 3,
    title: "Art Supplies",
    description:
      "Paints, brushes, and sketch materials to help artists of all levels create their best work.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/products/",
  },
  {
    id: 4,
    title: "Office Supplies",
    description:
      "Organize your workspace with stylish and functional office accessories.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/products/",
  },
  {
    id: 5,
    title: "Planners & Diaries",
    description:
      "Plan your days effectively with elegant planners and diaries that keep you on track.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/products/",
  },
  {
    id: 6,
    title: "Other Stationery",
    description:
      "Explore a variety of unique stationery items to complement your collection.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/products/",
  },
  {
    id: 7,
    title: "Gift Collections",
    description:
      "Thoughtful, beautifully packaged gifts for friends, family, and special occasions.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/gifts/",
  },
  {
    id: 8,
    title: "Home & Decor",
    description:
      "Elegant decor items that bring warmth, creativity, and charm to any space.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/decor/",
  },
];

export default function FeaturedItemsSection() {
  return (
    <section
      id="FeaturedItems"
      className="relative py-10 w-full bg-gradient-to-br scroll-mt-24 from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
        >
          Featured Products
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Explore our most loved Products.
        </p>

        <div className="relative w-full rounded-2xl bg-emerald-100 dark:bg-gray-900 px-1">
          <Carousel className="w-full">
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full sm:basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full w-full"
                  >
                    <div className="flex h-full w-full px-2 py-4">
                      <ProductCard item={item} index={index} />
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows positioned nicely for mobile */}
            <CarouselPrevious className="hidden sm:flex  top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 shadow-md rounded-full" />
            <CarouselNext className="hidden sm:flex top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 shadow-md rounded-full" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
