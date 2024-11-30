"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Item } from '../../../../contexts/UserContext';

export default function CategoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const category = pathname.split('/').pop(); 

  useEffect(() => {
    if (category) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data.meals || []);
          
        })
        .catch((error) => console.error('Error loading items in category:', error));
    }
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-center text-2xl p-4'>Items in {category}</h1>
      <ul className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <li key={item.idMeal} className="border p-4 flex flex-col items-center">
            <img src={item.strMealThumb} alt={item.strMeal} className="w-full h-auto mb-4 rounded" />
            <h3>{item.strMeal}</h3>
            <button
              onClick={() => router.push(`/categories/${category}/${item.idMeal}`)}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/categories')} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">
        Back to Categories
      </button>
    </div>
  );
}
