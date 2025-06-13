"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setServerError(result.error || "Registration failed");
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf5f5]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Register with a new account
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="w-full p-3 border border-[#e5e7eb] rounded text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#ff5c5c]/30"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Id"
            {...register("email")}
            className="w-full p-3 border border-[#e5e7eb] rounded text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#ff5c5c]/30"
          />
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border border-[#e5e7eb] rounded text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#ff5c5c]/30 pr-10"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((v) => !v)}
          >
            {/* Eye Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {showPassword ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24M21.06 12.01c-.28-.87-.68-1.69-1.17-2.45a10.51 10.51 0 00-15.78 0 10.57 10.57 0 00-1.17 2.45 10.52 10.52 0 0017.12 0z" />
              ) : (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </>
              )}
            </svg>
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#ff5c5c] text-white py-3 rounded font-semibold hover:bg-[#ff3b3b] transition"
          disabled={isSubmitting}
        >
          REGISTER
        </button>

        <div className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-[#ff5c5c] font-semibold hover:underline">
            Login
          </a>
        </div>

        <div className="text-center mt-4 text-gray-600 text-sm">
          Or continue with social account
        </div>

        <button
          type="button"
          onClick={() => window.location.href = "/api/auth/signin?provider=google"}
          className="w-full flex items-center justify-center gap-2 bg-[#f5f5f5] text-black py-3 rounded mt-2 font-semibold text-sm border hover:bg-[#eaeaea] transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          SIGN UP WITH GOOGLE
        </button>
      </form>
    </div>
  );
}
