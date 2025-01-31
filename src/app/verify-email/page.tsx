"use client"; // Must be the first line of the file

import Link from "next/link";

import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    const otpToken = new URLSearchParams(window.location.search).get("token");
    if (otpToken) {
      setOtpCode(otpToken!);
    }
  }, []);
  console.log(otpCode);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <Link
        href="/"
        className="absolute top-4 left-4 text-purple-500 hover:underline"
      >
        Back To Home
      </Link>
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Verify Your Email
        </h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="otp">
            6-digit verification code
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your 6-digit code"
            id="otp"
            name="otp"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            className="w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 text-white font-bold"
          >
            Verify Email
          </button>
        </div>
        <p className="mt-4 text-center text-gray-400">
          Didn’t receive the email? Check your spam folder or{" "}
          <Link href="/signup" className="text-purple-500 hover:underline">
            try again
          </Link>
          .
        </p>
        <p className="mt-4 text-center text-gray-400">
          <Link href="/login" className="text-purple-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
