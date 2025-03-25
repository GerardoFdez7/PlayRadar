import { Button } from "@/ui/Button";
import GoogleComp from "@/ui/GoogleLogo";
import LoadingAnimation from "@/ui/Loader";
import Link from "next/link";

interface MainRegisterProps {
  error: string | null;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleGoogleSignIn: () => void;
  setError: (error: string | null) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
}

export default function MainRegister({
  error,
  username,
  email,
  password,
  confirmPassword,
  isLoading,
  handleSubmit,
  handleGoogleSignIn,
  setError,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
}: MainRegisterProps) {
  return (
    <main className="w-full px-6 flex-1">
      {/* form */}
      <form
        className="mb-6 w-full lg:max-w-md mx-auto p-8 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-xl transition-all duration-500 ease-in-out hover:transform hover:scale-105"
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
          <p className="mb-4 text-gray-600 dark:text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100 underline"
            >
              Login
            </Link>
          </p>
          <Button
            type="submit"
            className="w-full rounded-full py-6 "
            onClick={() => setError(null)}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="inset-0 flex items-center justify-center">
                <LoadingAnimation size={16} />
              </div>
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>

      {/* Google */}
      <div className="w-full max-w-md text-center mx-auto">
        <Button
          type="button"
          className="w-full rounded-full py-6"
          onClick={handleGoogleSignIn}
        >
          <div className="flex items-center">
            Continue with Google
            <GoogleComp className="w-8 ml-2 justify-center " />
          </div>
        </Button>
      </div>
    </main>
  );
}
