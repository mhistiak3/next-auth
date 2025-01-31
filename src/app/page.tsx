import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center text-center bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1737079026600-18f07b9dd0a8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          fill
          className="object-cover opacity-70"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
          Welcome to Nextjs Auth
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Join us and explore endless possibilities.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 text-white border border-white rounded-xl hover:bg-white hover:text-black"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
