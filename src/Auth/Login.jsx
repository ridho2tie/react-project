import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="w-full flex flex-col bg-gradient-to-l from-green-900 to-gray-300 md:flex-row">
      <div className="flex-1 flex items-center justify-center px-10 py-12">
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">Welcome back</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Please enter your details
          </p>

          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full border bg-white rounded px-5 py-3 text-lg"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded bg-white  px-5 py-3 text-lg"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Remember for 30 days
              </label>
              <Link to="/forgot" className="text-green-900 hover:underline">
                Forgot password
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-green-900 text-white py-3 rounded text-lg"
            >
              Log in
            </button>
            <button className="w-full border py-3 rounded flex bg-white items-center justify-center gap-3 text-lg">
              <FcGoogle
                src="/img/google-icon.png"
                alt="Google"
                className="w-6 h-6"
              />
              Sign in with Google
            </button>
          </form>

          <div className="mt-8 text-center text-base">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-900 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center p-8">
        <img
          src="/img/Authimg/Login.png"
          alt="Login Visual"
          className="w-[30rem] ml-12 object-contain"
        />
      </div>
    </div>
  );
}
