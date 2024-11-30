"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Category } from "@/../contexts/UserContext";
import { fetchCategories } from "@/app/categories/categoryFetch";
import { FaBars, FaTimes, FaArrowUp  } from "react-icons/fa";

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScrollButton(true); 
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <nav className="p-4 mt-8 container mx-auto sticky text-white rounded-md border-y-2 shadow-gray-700 shadow-b">
      <div className="  flex flex-col justify-around">
        <div className="w-full flex justify-around text-2xl">
        <Link href="/categories" className=" hover:underline cursor-pointer">
        Categories
      </Link>
        </div>

        <div className="md:hidden self-center mt-4">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className="hidden md:flex self-center justify-center flex-wrap">
          {categories.map((category) => (
            <button
              key={category.idCategory}
              onClick={() => router.push(`/categories/${category.strCategory}`)}
              className="text-white hover:text-blue-400 flex flex-wrap p-4 hover:underline"
            >
              {category.strCategory}
            </button>
          ))}
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "flex-block" : "hidden"
          } fixed inset-0 bg-gray-800 p-4 z-50 flex flex-col overflow-y-auto`}
        >
          <div className="flex flex-wrap">
            {categories.map((category) => (
              <button
                key={category.idCategory}
                onClick={() => {
                  router.push(`/categories/${category.strCategory}`);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-white hover:text-blue-400 mb-4"
              >
                {category.strCategory}
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <button
              onClick={toggleMobileMenu}
              className="flex justify-center w-full text-center text-white hover:text-red-400 mt-4 p-4"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
          {showScrollButton && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
            >
              <FaArrowUp size={20} />
            </button>
          )}
          </>
  );
}
