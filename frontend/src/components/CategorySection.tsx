import { motion } from "framer-motion";
import CategoryCard from "./Cards/CategoryCard";

const Categories = [
  {
    id: 0,
    title: "Notebooks & Journals",
    description:
      "Premium notebooks and journals designed to capture your ideas, thoughts, and creativity.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/notebooks-and-journals",
  },
  {
    id: 1,
    title: "Pens & Pencils",
    description:
      "Smooth-writing pens and pencils for daily use, sketching, and professional work.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/pens-and-pencils",
  },
  {
    id: 2,
    title: "Markers & Highlighters",
    description:
      "Add color and emphasis to your notes with vibrant markers and highlighters.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/markers-and-highlighters",
  },
  {
    id: 3,
    title: "Erasers & Sharpeners",
    description:
      "Keep your writing crisp and clean with quality erasers and sharpeners for every need.",
    image: "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/erasers-and-sharpeners",
  },
  {
    id: 4,
    title: "Art Supplies",
    description:
      "Paints, brushes, and sketch materials to help artists of all levels create their best work.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/art-supplies",
  },
  {
    id: 5,
    title: "Office Supplies",
    description:
      "Organize your workspace with stylish and functional office accessories.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/office-supplies",
  },
  {
    id: 6,
    title: "Other Stationary",
    description:
      "Explore a variety of unique stationery items to complement your collection.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/stationary/other-stationary",
  },
  {
    id: 7,
    title: "Gift Collections",
    description:
      "Thoughtful, beautifully packaged gifts for friends, family, and special occasions.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/gift",
  },
  {
    id: 8,
    title: "Home & Decor",
    description:
      "Elegant decor items that bring warmth, creativity, and charm to any space.",
    image:
      "https://www.littlegreengifts.com/cdn/shop/files/Mixed_Christmas_Flatlay_17232140-8d83-4aa5-afde-dc0822d12d6a.jpg?v=1758184508&width=1500",
    link: "/decor",
  },
];

export default function CategorySection() {
  return (
    <section
      id="Categoryfeatures"
      className="relative py-10 w-full bg-gradient-to-br scroll-mt-24 from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
        >
          Categories
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Explore our most loved Categories — curated to bring joy, creativity,
          and inspiration to your desk or home.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {Categories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
