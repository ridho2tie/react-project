// src/Guest/Pages/Kontak.jsx
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { KontakAPI } from "../../services/KontakAPI";

export default function Kontak() {
  const [data, setData] = useState([]);

  useEffect(() => {
    KontakAPI.fetchKontak().then(setData);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Kontak Masuk
        </h2>
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded shadow p-6 hover:shadow-md"
            >
              <p className="font-semibold text-lg text-emerald-600">
                {item.nama}
              </p>
              <p className="text-sm text-gray-500 mb-2">{item.email}</p>
              <p>{item.pesan}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
