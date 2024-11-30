"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Item {
  strMealThumb: string | undefined;
  idMeal: string;
  strMeal: string;
  category: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  userName: string | null;
  favoriteCategories: string[];
  favorites: Item[];
  logIn: (name: string, password: string) => boolean;
  logOut: () => void;
  toggleFavoriteCategory: (category: string) => void;
  toggleFavoriteItem: (item: Item) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Login Function
  const logIn = (name: string, password: string): boolean => {
    const validUsers = {
      user1: { userName: "user1", password: "password1" },
      user2: { userName: "user2", password: "password2" },
    };

    const user = validUsers[name as keyof typeof validUsers];
    if (user && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", user.userName);
      setIsLoggedIn(true);
      setUserName(user.userName);

      const savedUserData = localStorage.getItem(`userData_${user.userName}`);
      if (savedUserData) {
        const parsedData = JSON.parse(savedUserData);
        setFavoriteCategories(parsedData.favoriteCategories || []);
        setFavorites(parsedData.favorites || []);
      }

      return true;
    }

    return false;
  };


  const logOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName(null);
    setFavoriteCategories([]);
    setFavorites([]);
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");

    if (storedIsLoggedIn === "true" && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);

      const savedUserData = localStorage.getItem(`userData_${storedUserName}`);
      if (savedUserData) {
        const parsedData = JSON.parse(savedUserData);
        setFavoriteCategories(parsedData.favoriteCategories || []);
        setFavorites(parsedData.favorites || []);
      }
    }
    setIsInitialized(true);
  }, []);

  const toggleFavoriteCategory = (category: string) => {
    const updatedCategories = favoriteCategories.includes(category)
      ? favoriteCategories.filter((fav) => fav !== category)
      : [...favoriteCategories, category];
    setFavoriteCategories(updatedCategories);

    if (isLoggedIn && userName) {
      const userData = {
        favoriteCategories: updatedCategories,
        favorites,
      };
      localStorage.setItem(`userData_${userName}`, JSON.stringify(userData));
    }
  };

  const toggleFavoriteItem = (item: Item) => {
    const updatedFavorites = favorites.find((fav) => fav.idMeal === item.idMeal)
      ? favorites.filter((fav) => fav.idMeal !== item.idMeal)
      : [...favorites, item];
    setFavorites(updatedFavorites);

    if (isLoggedIn && userName) {
      const userData = {
        favoriteCategories,
        favorites: updatedFavorites,
      };
      localStorage.setItem(`userData_${userName}`, JSON.stringify(userData));
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userName,
        favoriteCategories,
        favorites,
        logIn,
        logOut,
        toggleFavoriteCategory,
        toggleFavoriteItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};
