"use client";

import { checkUser } from "../services/dataBaseConfig";
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import radarImage from "./radar.png";
import { toggleModoOscuro } from "../services/localStorage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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
    <main className="flex flex-col min-h-screen items-center p-24 justify-center bg-gray-300 dark:bg-gray-900 transition-colors duration-500">
      <Button
        size="icon"
        className="ml-4 border-0 bg-transparent shadow-none hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 hover:scale-110 absolute top-4 right-4"
        onClick={handleToggleMode}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 fill-white dark:stroke-white dark:fill-white transition-transform" />
        ) : (
          <Moon className="h-5 w-5 stroke-[1.5] stroke-black fill-black dark:stroke-white dark:fill-black transition-transform" />
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
        <h1 className="text-6xl font-bold m-8 w-full dark:text-gray-200 font-playRadar">
          PlayRadar
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 w-full max-w-md mx-auto p-8 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-xl transition-all duration-500 ease-in-out hover:transform hover:scale-105"
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
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            className="w-full"
            onClick={() => router.push("/")}
          >
            Continue as guest
          </Button>
        </div>
      </form>

      {/* Footer */}
      <footer className="mt-auto w-full pt-6 px-4 text-center border-gray-400 dark:border-gray-500">
        {/* Línea decorativa con bordes redondeados */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[90vw] h-[2px] bg-gray-400 dark:bg-gray-500 rounded-full before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:w-[10vw] before:h-full before:bg-inherit before:rounded-full" />
        <p className="text-sm text-gray-900 dark:text-gray-400 pt-4">
          © {new Date().getFullYear()} PlayRadar. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Developed by Gerardo Fernández.
        </p>
        <Link
          href="https://gerardofernandez7.github.io/Portfolio/"
          target="_blank"
          className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
        >
          Contact
        </Link>
      </footer>
    </main>
  );
}
