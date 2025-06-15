import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  return (
    <div className="w-full flex bg-gradient-to-l from-cyan-200 to-gray-300flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center px-10 py-12">
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">Create an account</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Start your journey with us
          </p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border bg-white rounded px-5 py-3 text-lg"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full border bg-white rounded px-5 py-3 text-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded px-5 py-3 bg-white text-lg"
            />

            <button
              type="submit"
              className="w-full bg-cyan-900 text-white py-3 rounded text-lg"
            >
              Sign up
            </button>
            <button className="w-full border py-3 rounded flex items-center bg-white justify-center gap-3 text-lg">
              <FcGoogle
                src="/img/google-icon.png"
                alt="Google"
                className="w-6 h-6"
              />
              Sign Up with Google
            </button>
          </form>

          <div className="mt-8 text-center text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center p-8">
        <img
          src="/img/Authimg/Register.png"
          alt="Register Visual"
          className="w-[30rem] ml-12 object-contain"
        />
      </div>
    </div>
  );
}
