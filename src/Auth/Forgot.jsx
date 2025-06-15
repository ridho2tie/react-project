import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div className="w-full flex flex-col bg-gradient-to-l from-red-500 to-gray-300  md:flex-row">
      <div className="flex-1 flex items-center justify-center px-10 py-12">
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">Reset your password</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Enter your email to receive a reset link
          </p>

          <form className="space-y-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border bg-white rounded px-5 py-3 text-lg"
            />
            <button
              type="submit"
              className="w-full bg-red-950 text-white py-3 rounded text-lg"
            >
              Send reset link
            </button>
          </form>

          <div className="mt-8 text-center text-base">
            Back to{" "}
            <Link to="/login" className="text-red-900 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center p-8">
        <img
          src="/img/Authimg/Forgot.png"
          alt="Forgot Password Visual"
          className="w-[30rem] ml-12 object-contain"
        />
      </div>
    </div>
  );
}
