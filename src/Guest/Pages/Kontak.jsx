import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { KontakAPI } from "../../services/KontakAPI";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Kontak() {
  const [form, setForm] = useState({
    namaPengirim: "",
    email: "",
    subjekPesan: "",
    isiPesan: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      await KontakAPI.createKontak({
        ...form,
        tanggalKirim: new Date().toISOString().slice(0, 10), // Format: YYYY-MM-DD
        status: "Belum dibaca",
      });

      setSuccess(true);
      setForm({
        namaPengirim: "",
        email: "",
        subjekPesan: "",
        isiPesan: "",
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("Gagal mengirim:", message);
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 min-h-screen font-poppins">
      <Navbar />

      <section className="text-center pt-30 px-4">
        <h1 className="text-5xl font-bold font-poppinsxl text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-poppins">
          Butuh bantuan, informasi produk, atau ingin menyampaikan pesan?
          Kami selalu siap mendengar Anda.
        </p>
      </section>

      <section className="max-w-7xl mx-auto mb-10 grid md:grid-cols-2 rounded-xl overflow-hidden shadow-lg mt-10">
        {/* FORM */}
        <div className="bg-white p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-poppinsxl">
            Tinggalkan Pesan
          </h2>

          {success && (
            <div className="bg-green-100 border-l-4 border-green-600 text-green-800 p-3 rounded text-sm mb-4">
              Pesan berhasil dikirim!
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-100 border-l-4 border-red-600 text-red-800 p-3 rounded text-sm mb-4">
              Gagal: {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
            <div>
              <label className="block mb-1 font-semibold">Nama</label>
              <input
                type="text"
                name="namaPengirim"
                placeholder="Nama Lengkap"
                value={form.namaPengirim}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Alamat Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Subjek</label>
              <input
                type="text"
                name="subjekPesan"
                placeholder="Judul pesan atau subjek"
                value={form.subjekPesan}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Pesan</label>
              <textarea
                name="isiPesan"
                placeholder="Tulis pesan kamu..."
                value={form.isiPesan}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded h-32 resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-3 rounded font-semibold transition ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-700"
              }`}
            >
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </div>

        {/* INFO */}
        <div className="bg-black text-white p-10 font-poppins flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold font-poppinsxl mb-4">
              Info Kontak
            </h3>
            <p className="italic text-gray-300 mb-6">
              “Kami akan merespon pesan Anda secepat mungkin, biasanya dalam
              1×24 jam kerja.”
            </p>
            <div className="space-y-4 text-sm">
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-white" />
                Jl. Sepatu Nasional No. 123, Bandung
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-white" />
                support@tokosepatu.com
              </p>
              <p className="flex items-center gap-3">
                <FaPhone className="text-white" />
                (022) 1234 5678
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-8 text-2xl">
            <FaFacebook className="hover:text-blue-400 cursor-pointer" />
            <FaInstagram className="hover:text-pink-400 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
