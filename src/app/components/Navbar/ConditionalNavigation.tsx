"use client";

import { useUserContext } from "@/../contexts/UserContext";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ConditionalNavigation() {
  const { isLoggedIn } = useUserContext();
  const pathname = usePathname();

  
  const isExcluded = pathname.startsWith("/categories");

  return isLoggedIn && !isExcluded ? <Navbar /> : null;
}

