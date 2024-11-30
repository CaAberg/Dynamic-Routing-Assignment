"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/../contexts/UserContext";

export default function HomePage() {
  const { isLoggedIn, logIn, logOut, userName } = useUserContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!logIn(name, password)) {
      setLoginError("Invalid username or password");
    } else {
      setLoginError("");
    }
  };

  return (
    <div className="container mx-auto flex-grow justify-center items-center flex flex-col p-4">
      {!isLoggedIn ? (
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-4 flex rounded text-black"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 flex rounded text-black"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Log In
          </button>
          {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
        </form>
      ) : (
        <div className="flex flex-col text-center text-2xl">
          <h4>Welcome, {userName}!</h4>
          <nav className="p-4 underline">
            <ul>
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/categories">Categories</a>
              </li>
            </ul>
            <button
              onClick={() => {
                logOut();
                router.push("/");
              }}
              className="mt-6 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Log Out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

