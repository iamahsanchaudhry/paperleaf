import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
        <Toaster />
      </main>
      <footer className="text-center p-4 bg-gray-200 text-gray-700">
        © {new Date().getFullYear()} PaperLeaf. All rights reserved.
      </footer>
    </div>
  );
}
