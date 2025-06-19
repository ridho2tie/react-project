// src/Guest/Pages/Galeri.jsx
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { GaleriAPI } from "../../services/GaleriAPI";




export default function Galeri() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GaleriAPI.fetchGaleri().then(setItems);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <section className="max-w-5xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Galeri Produk
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center"
            >
              <img
                src={item.image_url}
                alt={item.nama}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-semibold text-lg">{item.nama}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
