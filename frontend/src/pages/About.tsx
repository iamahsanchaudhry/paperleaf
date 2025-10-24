import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Welcome to <span className="font-semibold text-emerald-600">PaperLeaf</span> — 
          your one-stop destination for premium stationery, creative gifts, and 
          elegant home & Event decor. We believe small details make a big difference, 
          and our mission is to bring creativity, quality, and inspiration into 
          your everyday life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Founded by passionate creators, PaperLeaf started as a small idea to 
            make everyday writing and gifting special again. From high-quality 
            notebooks and planners to beautiful home accents, we curate products 
            that combine elegance, usefulness, and creativity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            📞 Contact Us
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Have questions or want to place a custom order? We’d love to hear from you!
          </p>

          {/* WhatsApp Button */}
          <div className="flex justify-center">
            <Link
              to="https://wa.me/" // 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full transition-all shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Link>
          </div>

          {/* Phone Option */}
          {/* <div className="flex justify-center">
            <a
              href="tel:+923001234567"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mt-4"
            >
              <Phone className="w-5 h-5" />
              +92 300 1234567
            </a>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
