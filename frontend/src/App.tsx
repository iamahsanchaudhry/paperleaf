import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import CategoryProductsPage from "./pages/Products/CategoryProductsPage";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {
        <Router>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products/:id" element={<ProductDetailPage/>}/>
              <Route path=":category/:subcategory" element={<CategoryProductsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      }
    </ThemeProvider>
  );
}
