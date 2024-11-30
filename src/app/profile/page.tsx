"use client";

import { useUserContext } from "@/../../contexts/UserContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { userName, favorites, favoriteCategories, logOut } = useUserContext();
  const router = useRouter();

  if (!userName) return <p>Please log in.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1>{userName}'s Profile</h1>

      <h2>Favorite Categories:</h2>
      <ul>
        {favoriteCategories.map((category) => (
          <li key={category} className="mb-2">
            {category}
            <button
              onClick={() => router.push(`/categories/${category}`)}
              className="ml-2 text-blue-500 hover:underline"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-4">Favorite Items:</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.idMeal} className="mb-2">
            {item.strMeal}

            <button
              onClick={() =>
                router.push(`/categories/${item.category}/${item.idMeal}`)
              }
              className="ml-2 text-blue-500 hover:underline"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={logOut}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
        >
          Log Out
        </button>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-gray-500 text-white py-2 px-4 mx-4 rounded"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
