"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserContext } from "@/../../contexts/UserContext";

export interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strCategory: string;
}

export default function ItemPage() {
  const [itemDetail, setItemDetail] = useState<RecipeDetail | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const itemId = pathname.split("/").pop();
  const { favorites, toggleFavoriteItem } = useUserContext();

  useEffect(() => {
    if (itemId) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
        .then((res) => res.json())
        .then((data) => setItemDetail(data.meals[0]))
        .catch((error) => console.error("Error loading item data:", error));
    }
  }, [itemId]);

  const isFavorited = favorites.some((fav) => fav.idMeal === itemId);

  return (
    <div className="container bg-slate-900 mx-auto p-4 m-1">
      {itemDetail ? (
        <>
          <h3 className="mb-4 text-4xl text-center">{itemDetail.strMeal}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-center">
          <img
            src={itemDetail.strMealThumb}
            alt={itemDetail.strMeal}
            className="w-[30%] h-auto mb-4 rounded flex"
          />
          </div>
            {itemDetail.strInstructions
              .split(".")
              .filter((step) => step.trim().length > 0)
              .map((step, index) => (
                <p key={index} className="leading-6 bg-[#3e5c76] text-shadow-lg p-4 rounded-sm">
                  {step.trim() + (step.trim().endsWith("!") ? "" : ".")}
                </p>
              ))}
          </div>

          <button
            onClick={() => {
              toggleFavoriteItem({
                idMeal: itemDetail.idMeal,
                strMeal: itemDetail.strMeal,
                category: itemDetail.strCategory,
                strMealThumb: undefined,
              });
              console.log("Favorites Updated:", favorites);
            }}
            className={`p-2 rounded ${
              isFavorited ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {isFavorited ? "Unfavorite" : "Add to Favorites"}
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button
        onClick={() => router.back()}
        className="mt-4 bg-gray-500 text-white m-4 p-2 rounded"
      >
        Back
      </button>
    </div>
  );
}
