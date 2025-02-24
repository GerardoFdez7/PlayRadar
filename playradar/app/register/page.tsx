"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import radarImage from "./radar.png";
import { addUser, isEmailOrUsernameTaken } from "../services/dataBaseConfig";
import ModeToggle from "@/components/themeSelector";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    // Validation of existing user and email
    const isTaken = await isEmailOrUsernameTaken(email, username);
    if (isTaken) {
      alert("Email or username is already registered. Please try another.");
      return;
    }

    // Logic to register the user
    const success = await addUser(username, email, password);
    if (success) {
      router.push("/login");
    } else {
      alert("An error occurred while registering the user. Please try again.");
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-24 bg-gray-300 dark:bg-gray-900 transition-colors duration-500">
      {/* Theme button */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="flex items-center">
        <Image
          src={radarImage || "/placeholder.svg"}
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
            htmlFor="username"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
            required
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
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Login
            </a>
          </p>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>
      </form>

      {/* Footer */}
      <footer className="mt-auto w-full py-6 px-4 text-center border-gray-400 dark:border-gray-500">
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
