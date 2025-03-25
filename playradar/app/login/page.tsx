"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  checkUser,
  handleGoogleLogin,
  handleForgotPassword,
} from "@/services/authentication";
import MainLogin from "@/components/layout/MainLogin";
import HeaderAuth from "@/layout/HeaderAuth";
import Footer from "@/layout/Footer";

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

  // Handle error message display
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle form submission
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

  // Handle Google sign-in
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

  // Handle password recovery
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
    <div className="min-h-screen flex flex-col items-center flex-1 bg-gray-300 dark:bg-gray-900 transition-colors duration-500">
      <HeaderAuth />
      <MainLogin
        email={email}
        password={password}
        showPassword={showPassword}
        error={error}
        isLoading={isLoading}
        showForgotPassword={showForgotPassword}
        newPassEmail={newPassEmail}
        message={message}
        setEmail={setEmail}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        setError={setError}
        setShowForgotPassword={setShowForgotPassword}
        setNewPassEmail={setNewPassEmail}
        handleSubmit={handleSubmit}
        handleGoogleSignIn={handleGoogleSignIn}
        forgetPassword={forgetPassword}
      />
      <Footer />
    </div>
  );
}
