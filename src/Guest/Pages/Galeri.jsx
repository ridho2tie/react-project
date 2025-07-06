import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { GaleriAPI } from "../../services/GaleriAPI";
import { FaPlay } from "react-icons/fa";

export default function Galeri() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GaleriAPI.fetchGaleri().then(setItems);
  }, []);

  return (
    <div className="bg-white mt-7 w-full">
      <Navbar />

      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Galeri Produk
        </h2>

        {/* Galeri Horizontal */}
        <div className="flex gap-6 overflow-x-auto scrollbar-thin pb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="min-w-[220px] max-w-[220px] flex-shrink-0 relative group rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Gambar / Thumbnail */}
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-full object-cover rounded-xl"
                />
                {/* Overlay Play Icon jika ada video */}
                {item.video && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition">
                    <FaPlay className="text-white text-3xl" />
                  </div>
                )}
              </div>

              <h3 className="text-center text-sm mt-24   font-semibold text-gray-700">
                {item.judul}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
