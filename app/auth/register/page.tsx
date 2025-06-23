"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const schema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Registration failed");
        return;
      }

      toast.success("Account created successfully!");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf5f5]">
      <Toaster position="top-center" />
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
            className="w-full p-3 border border-[#e5e7eb] rounded text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5c5c]"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border border-[#e5e7eb] rounded text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5c5c]"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border border-[#e5e7eb] rounded text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5c5c] pr-10"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24M21.06 12.01c-.28-.87-.68-1.69-1.17-2.45a10.51 10.51 0 00-15.78 0 10.57 10.57 0 00-1.17 2.45 10.52 10.52 0 0017.12 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </span>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#ff5c5c] text-white py-3 rounded font-semibold hover:bg-[#ff3b3b] transition disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "REGISTER"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#ff5c5c] font-semibold hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
