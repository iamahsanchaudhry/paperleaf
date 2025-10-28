import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import SubCategoryProductsPage from "./pages/Products/SubCategoryProductsPage";
import CategoryProductsPage from "./pages/Products/CategoryProductsPage";
import SearchPage from "./pages/SearchPage";
import { LoginPage } from "./pages/Admin/LoginPage";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        {
          <Router>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route
                  path=":category/:subcategory"
                  element={<SubCategoryProductsPage />}
                />
                <Route path=":category/" element={<CategoryProductsPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="admin/login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        }
      </AuthProvider>
    </ThemeProvider>
  );
}
