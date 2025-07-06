import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (monthly, annual) =>
    isAnnual ? `Rp${annual}.000` : `Rp${monthly}.000`;
  const getLabel = () => (isAnnual ? "per tahun" : "per bulan");

  return (
    <div className="bg-white font-poppins min-h-screen">
      <Navbar />

      <div className="pt-36 pb-20 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">PRICING</h1>

        {/* Toggle */}
        <div className="inline-flex items-center mb-12 bg-gray-100 p-1 rounded-full text-sm font-semibold">
          <button
            className={`px-5 py-2 rounded-full transition ${
              !isAnnual ? "bg-black text-white" : "text-gray-600"
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={`px-5 py-2 rounded-full relative transition ${
              isAnnual ? "bg-black text-white" : "text-gray-600"
            }`}
            onClick={() => setIsAnnual(true)}
          >
            Annual
            <span className="absolute -top-4 -right-6 text-[10px] text-black bg-gray-300 px-1 rounded shadow">
              2 bulan gratis
            </span>
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Basic */}
          <div className="shadow-md rounded-lg p-6 transition duration-200 hover:border hover:border-black hover:bg-gray-200">
            <h3 className="text-lg font-semibold mb-2">Basic</h3>
            <div className="text-3xl font-bold mb-1">{getPrice(49, 490)}</div>
            <p className="text-gray-500 text-sm mb-6">{getLabel()}</p>
            <Link to="/SimulasiHarga">
              <button className="w-full bg-gray-200 text-black py-2 rounded mb-6 font-semibold hover:bg-black hover:text-white transition">
                Mulai Sekarang
              </button>
            </Link>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✔ Akses katalog sepatu</li>
              <li>✔ Filter brand & ukuran</li>
              <li>✔ 10 wishlist produk</li>
              <li>✔ Notifikasi promo</li>
              <li>
                ✔ <b>200 produk favorit /bulan</b>
              </li>
            </ul>
          </div>

          {/* Premium */}
          <div className="shadow-md rounded-lg p-6 transition duration-200 hover:border hover:border-black hover:bg-gray-200 relative ">
            <span className="absolute top-4 right-4 text-xs bg-gray-300 text-black px-2 py-0.5 rounded-full font-semibold">
              Paling Populer
            </span>
            <h3 className="text-lg font-semibold mb-2">Premium</h3>
            <div className="text-3xl font-bold mb-1">{getPrice(99, 990)}</div>
            <p className="text-gray-500 text-sm mb-6">{getLabel()}</p>
            <Link to="/SimulasiHarga">
              <button className="w-full bg-gray-200 text-black py-2 rounded mb-6 font-semibold hover:bg-black hover:text-white transition">
                Get Started
              </button>
            </Link>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✔ Semua fitur Basic</li>
              <li>✔ Review & rating pengguna</li>
              <li>✔ Lacak produk restock</li>
              <li>✔ Galeri koleksi pribadi</li>
              <li>
                ✔ <b>1.000 produk favorit /bulan</b>
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="shadow-md rounded-lg p-6 transition duration-200 hover:border hover:border-black hover:bg-gray-200">
            <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
            <div className="text-2xl font-bold mb-4">
              {isAnnual ? "Hubungi untuk paket tahunan" : "Hubungi Kami"}
            </div>
            <Link to="/SimulasiHarga">
              <button className="w-full bg-gray-200 text-black py-2 rounded mb-6 font-semibold hover:bg-black hover:text-white transition">
                Mulai Sekarang
              </button>
            </Link>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✔ Semua fitur Premium</li>
              <li>✔ Data tren penjualan</li>
              <li>✔ Akses API produk</li>
              <li>✔ Dukungan integrasi sistem</li>
              <li>
                ✔ <b>10.000 produk favorit /bulan</b>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
