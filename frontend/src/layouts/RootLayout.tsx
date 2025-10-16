import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="text-center p-4 bg-gray-200 text-gray-700">
        © {new Date().getFullYear()} PaperLeaf. All rights reserved.
      </footer>
    </div>
  );
}
