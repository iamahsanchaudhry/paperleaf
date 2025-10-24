import React, { useState, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import clsx from "clsx";
import { ModeToggle } from "./mode-toggle";

interface Category {
  name: string;
  to: string;
}

export default function Navbar(): JSX.Element {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const stationeryCategories: Category[] = [
    { name: "Notebooks", to: "/stationary/notebooks" },
    { name: "Pens & Pencils", to: "/stationary/pens" },
    { name: "Markers & Highlighters", to: "/stationary/markers" },
    { name: "Art Supplies", to: "/stationary/art-supplies" },
    { name: "Office Supplies", to: "/stationary/office-supplies" },
    { name: "Planners & Diaries", to: "/stationary/planners" },
    { name: "Others", to: "/stationary/others" },
  ];

  const isStationaryActive = location.pathname.startsWith("/stationary/");

  return (
    <nav className="shadow-sm sticky top-0 z-50 bg-white dark:bg-gray-900">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-sm py-2 text-white text-center">
        <span>Free Shipping on Orders Over Rs. 2000</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition" />
            <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 p-2 rounded-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
              Paperleaf
            </h1>
            <p className="text-xs -mt-1 text-gray-500 dark:text-gray-400">
              Quality Stationery & Gifts
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLinks
            locationPath={location.pathname}
            isStationaryActive={isStationaryActive}
            stationeryCategories={stationeryCategories}
          />
        </div>

        {/* Search + Mode + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-48 pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <ModeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg 
               focus:ring-2 focus:ring-emerald-500 
               dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <LinkItem to="/" label="Home" currentPath={location.pathname} />

            {/* Stationery Dropdown */}
            <details className="group pl-2">
              <summary className="flex justify-between items-center cursor-pointer text-gray-700 dark:text-white font-medium px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                Stationery
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-4 mt-1 flex flex-col gap-1">
                {stationeryCategories.map((cat) => (
                  <LinkItem
                    key={cat.to}
                    to={cat.to}
                    label={cat.name}
                    currentPath={location.pathname}
                  />
                ))}
              </div>
            </details>

            <LinkItem
              to="/gift"
              label="Gift"
              currentPath={location.pathname}
            />
            <LinkItem
              to="/decor"
              label="Decor"
              currentPath={location.pathname}
            />
            <LinkItem
              to="/about"
              label="About Us"
              currentPath={location.pathname}
            />
            <LinkItem
              to="/contact"
              label="Contact Us"
              currentPath={location.pathname}
            />
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------- Helper Components ---------- */

interface NavLinksProps {
  locationPath: string;
  isStationaryActive: boolean;
  stationeryCategories: Category[];
}

const NavLinks: React.FC<NavLinksProps> = ({
  locationPath,
  isStationaryActive,
  stationeryCategories,
}) => (
  <>
    <LinkItem to="/" label="Home" currentPath={locationPath} />

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={clsx(
            "px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1",
            isStationaryActive
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-700 dark:hover:text-emerald-300"
          )}
        >
          Stationery
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56 p-2">
        {stationeryCategories.map((category) => (
          <DropdownMenuItem key={category.to} asChild>
            <Link
              to={category.to}
              className={clsx(
                "cursor-pointer w-full rounded-md px-3 py-2 transition-colors",
                locationPath === category.to
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-700 dark:text-white hover:bg-gray-100 hover:text-emerald-700 dark:hover:text-emerald-300 dark:hover:bg-gray-800"
              )}
            >
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <LinkItem to="/gift" label="Gift" currentPath={locationPath} />
    <LinkItem to="/decor" label="Decor" currentPath={locationPath} />
    <LinkItem to="/about" label="About Us" currentPath={locationPath} />
  </>
);

interface LinkItemProps {
  to: string;
  label: string;
  currentPath: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition-all",
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-700 dark:hover:text-emerald-300"
      )}
    >
      {label}
    </Link>
  );
};
