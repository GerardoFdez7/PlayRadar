"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import GoogleLogo from "@/app/components/ui/GoogleLogo";
import LoadingAnimation from "@/app/components/ui/Loader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import radarImage from "./radar.png";
import ModeToggle from "@/app/components/features/ThemeSelector";
import {
  checkUser,
  handleGoogleLogin,
  handleForgotPassword,
} from "../services/authentication";
import Footer from "@/app/components/layout/Footer";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassEmail, setNewPassEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await checkUser(email, password);
      if (response.success) {
        router.push("/");
      } else {
        setError("Invalid email or password.");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("handleSubmit: ", error);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await handleGoogleLogin();
      if (response.success) {
        router.push("/");
      } else {
        setError("An unexpected error occurred.");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("handleGoogleSignIn: ", error);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const forgetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await handleForgotPassword(newPassEmail);
      if (response.success) {
        setMessage("Mail sent! Check your inbox to reset your password.");
        setTimeout(() => setShowForgotPassword(false), 5000);
        setIsLoading(false);
      } else {
        setError("An unexpected error occurred sending your recovery email.");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("forgetPassword: ", error);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center p-24 justify-center bg-gray-300 dark:bg-gray-900 transition-colors duration-500">
      {/* Theme button */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {/* Header */}
      <div className="flex items-center">
        <Image
          src={radarImage}
          alt="PlayRadar Logo"
          width={80}
          height={80}
          className="w-30 h-30"
        />
        <h1 className="sm:text-6xl text-2xl font-bold m-8 w-full dark:text-gray-200 font-playRadar">
          PlayRadar
        </h1>
      </div>

      {/* Send form */}
      <form
        className="mb-6 w-full max-w-md mx-auto p-8 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-xl transition-all duration-500 ease-in-out hover:transform hover:scale-105"
        onSubmit={handleSubmit}
      >
        {/* Handle errors */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start gap-3 dark:bg-red-800 dark:border-red-600 dark:text-red-100">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="flex-1">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 dark:text-red-200 hover:text-red-900 dark:hover:text-red-400 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Form body */}
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
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors mt-4"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="text-center">
          <p className="mb-4 text-gray-600 dark:text-gray-500">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100 underline"
            >
              Register
            </a>
          </p>
          <Button
            type="submit"
            className="w-full rounded-full py-6 relative"
            onClick={() => setError(null)}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="inset-0 flex items-center justify-center">
                <LoadingAnimation size={16} />
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>

      {/* Google */}
      <div className="w-full max-w-md mx-auto text-center mb-4">
        <Button
          type="button"
          className="w-full rounded-full py-6"
          onClick={handleGoogleSignIn}
        >
          <div className="flex items-center">
            Continue with Google
            <GoogleLogo className="w-8 ml-2 justify-center" />
          </div>
        </Button>
      </div>

      {/* Forgot */}
      <button>
        <a
          onClick={() => setShowForgotPassword(true)}
          className="text-gray-600 hover:text-gray-400 dark:text-gray-500 dark:hover:text-gray-100 underline"
        >
          Forgot your password?
        </a>
      </button>

      {/* Pop up */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={forgetPassword}>
              <input
                type="email"
                value={newPassEmail}
                onChange={(e) => setNewPassEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />

              {message && <p className="text-green-500 mb-4">{message}</p>}
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-5 rounded-lg text-md"
                >
                  {isLoading ? "Sending..." : "Send Reset Email"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer divClassName="w-[90vw]" />
    </main>
  );
}
