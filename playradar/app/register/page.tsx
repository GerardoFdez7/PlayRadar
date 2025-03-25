"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isEmailOrUsernameTaken } from "@/services/dataBaseConfig";
import { registerUser, handleGoogleLogin } from "@/services/authentication";
import HeaderAuth from "@/layout/HeaderAuth";
import MainRegister from "@/components/layout/MainRegister";
import Footer from "@/layout/Footer";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      // Password validation
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        setIsLoading(false);
        return;
      }
      // Validation of existing user or email
      const isTaken = await isEmailOrUsernameTaken(email, username);
      if (isTaken) {
        setError(
          "Email or username is already registered. Please try another."
        );
        setIsLoading(false);
        return;
      } else {
        const response = await registerUser(username, email, password);
        if (response.success) {
          router.push("/");
        } else {
          setError("Error during register, try again later.");
          setIsLoading(false);
        }
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-300 dark:bg-gray-900 transition-colors duration-500">
      <HeaderAuth />
      <MainRegister
        error={error}
        username={username}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleGoogleSignIn={handleGoogleSignIn}
        setError={setError}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <Footer />
    </div>
  );
}
