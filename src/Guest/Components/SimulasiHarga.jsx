import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function SimulasiHarga() {
  const navigate = useNavigate();
  const [paket, setPaket] = useState("Basic");
  const [durasi, setDurasi] = useState(1);

  const hargaBulanan = {
    Basic: 49000,
    Premium: 99000,
    Enterprise: 200000, // asumsi
  };

  const totalHarga = hargaBulanan[paket] * durasi;

  return (
    <div className="bg-gray-100 min-h-screen font-poppins">
      <Navbar />

      <div className="max-w-2xl mx-auto py-32 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Simulasi Harga Layanan</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-black text-2xl font-bold"
            aria-label="Kembali"
          >
            &larr;
          </button>
        </div>

        <form className="bg-white shadow-xl p-6 rounded-lg space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Pilih Paket
            </label>
            <select
              value={paket}
              onChange={(e) => setPaket(e.target.value)}
              className="w-full border px-4 py-2 rounded text-sm"
            >
              <option value="Basic">Basic - Rp49.000/bln</option>
              <option value="Premium">Premium - Rp99.000/bln</option>
              <option value="Enterprise">Enterprise - Rp200.000/bln</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Durasi (bulan)
            </label>
            <input
              type="number"
              min="1"
              value={durasi}
              onChange={(e) => setDurasi(Number(e.target.value))}
              className="w-full border px-4 py-2 rounded text-sm"
            />
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-2">Total Harga:</p>
            <p className="text-xl font-bold text-black">
              Rp {totalHarga.toLocaleString("id-ID")}
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Simulasikan
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
