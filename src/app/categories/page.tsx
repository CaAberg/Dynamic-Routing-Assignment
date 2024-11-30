"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((error) => console.error('Error loading categories:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl p-4">Meal Categories</h1>
      <ul className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <li key={category.idCategory} className="border p-4 flex flex-col items-center">
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="w-full h-auto mb-4 rounded"
            />
            <h3 className="text-lg font-bold mb-2">{category.strCategory}</h3>
            <button
              onClick={() => router.push(`/categories/${category.strCategory}`)}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              View Items
            </button>
          </li>
        ))}
      </ul>
      <button  onClick={() => router.push("/")}
        className="m-4 bg-gray-500 text-white p-2 rounded">
          Back to Start
          </button>
    </div>
  );
}