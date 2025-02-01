/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Must be the first line of the file

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [verifyToken, setVerifyToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    // const { token } = router.query;
    if (token) {
      setVerifyToken(token as string);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verify-email", {
        token: verifyToken,
      });
      if (response.data) {
        setVerified(true);
      }
    } catch (error) {
      console.log(error);
      toast.success("Invalid OTP code");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (verified) {
      toast.success("Email verified successfully");
      router.push("/login");
    }
  }, [verified, router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <Link
        href="/"
        className="absolute top-4 left-4 text-purple-500 hover:underline"
      >
        Back To Home
      </Link>
      {verifyToken ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg"
        >
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
              value={verifyToken}
              onChange={(e) => setVerifyToken(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 text-white font-bold"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
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
        </form>
      ) : (
        <p className="text-center">finding token...</p>
      )}
    </div>
  );
}
