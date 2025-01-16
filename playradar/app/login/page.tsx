"use client";

import { checkUser } from "../services/dataBaseConfig";
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import radarImage from "./radar.png";
import {
  getModoOscuro,
  setModoOscuro,
  toggleModoOscuro,
} from "../services/localStorage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode from localStorage when component mounts
    const savedDarkMode = getModoOscuro();
    setDarkMode(savedDarkMode);
    setModoOscuro(savedDarkMode);
  }, []);

  const handleToggleMode = () => {
    const newMode = toggleModoOscuro();
    setDarkMode(newMode);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checked = await checkUser(email, password);
    if (checked) {
      setEmail("");
      setPassword("");
      router.push("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-400 to-purple-500 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <Button
        size="icon"
        className="absolute top-4 right-4"
        onClick={handleToggleMode}
      >
        {darkMode ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <div className="flex items-center">
        <Image
          src={radarImage}
          alt="PlayRadar Logo"
          width={80}
          height={80}
          className="w-30 h-30"
        />
        <h1 className="text-6xl font-bold m-8 text-white dark:text-gray-200 font-playRadar">
          PlayRadar
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl transition-all duration-500 ease-in-out hover:transform hover:scale-105 border-2"
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Register
            </a>
          </p>
          <Button type="submit" className="w-full mb-4">
            Login
          </Button>
          <Button
            type="button"
            className="w-full "
            onClick={() => router.push("/home")}
          >
            Continue as guest
          </Button>
        </div>
      </form>
    </main>
  );
}
