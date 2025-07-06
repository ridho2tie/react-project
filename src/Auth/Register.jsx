import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { UserRoleAPI } from "../services/UserRoleAPI";

export default function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data ke Supabase dengan role "Pelanggan"
      await UserRoleAPI.createUserRole({
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        role: "Pelanggan",
        status_user: "aktif",
        created_at: new Date().toISOString(),
      });

      setSuccess(true);
      setFormData({ nama: "", email: "", password: "" });
    } catch (error) {
      console.error("Gagal mendaftar:", error.response?.data || error.message);
      alert("Pendaftaran gagal: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="w-full flex bg-gradient-to-l from-cyan-200 to-gray-300 flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center px-10 py-12">
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">Create an account</h2>
          <p className="text-gray-500 mb-8 text-lg">Start your journey with us</p>

          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
              Pendaftaran berhasil! Silakan login.
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border bg-white rounded px-5 py-3 text-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full border bg-white rounded px-5 py-3 text-lg"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded px-5 py-3 bg-white text-lg"
              required
            />

            <button
              type="submit"
              className="w-full bg-cyan-900 text-white py-3 rounded text-lg"
            >
              Sign up
            </button>
            <button
              type="button"
              className="w-full border py-3 rounded flex items-center bg-white justify-center gap-3 text-lg"
            >
              <FcGoogle className="w-6 h-6" />
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
