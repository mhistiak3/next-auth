import Link from "next/link";

export default function VerifyEmailPage() {
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
        <p className="mb-6 text-center text-gray-400">
          A verification email has been sent to your email address. Please check
          your inbox and follow the instructions to verify your account.
        </p>
        <div className="mb-4">
          <button
            type="button"
            className="w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 text-white font-bold"
          >
            Resend Verification Email
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
