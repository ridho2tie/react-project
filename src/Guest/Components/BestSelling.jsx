// src/Guest/Components/BestSelling.jsx
import { useEffect, useState } from "react";

export default function BestSelling() {
  const categories = ["Man", "Woman", "Boy", "Child"];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/produk.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 6)))
      .catch((err) => console.error("Gagal mengambil produk.json", err));
  }, []);

  return (
    <section className="pb-35 pt-10 px-10 bg-gray-100">
      <div className="flex items-center justify-center my-10">
        <span className="w-10 h-px bg-black mr-4"></span>
        <h2 className="text-2xl text-black font-bold mb-4 text-center">Best Selling</h2>
        <span className="w-10 h-px bg-black ml-4"></span>
      </div>

      <div className="flex justify-center mb-8 space-x-4">
        {categories.map((cat) => (
          <button key={cat} className="px-4 py-2 border rounded hover:bg-black hover:text-white">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p, idx) => (
          <div key={idx} className="card w-full bg-base-100 shadow-sm">
            <figure>
              <img src={p.image} alt={p.name} className="h-40 object-contain" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <p className="text-sm text-gray-500 line-through">{p.oldPrice}</p>
              <p className="text-lg text-pink-600">{p.price}</p>
              <p className="text-sm text-yellow-500 font-medium">
                ⭐ {p.rating} | Terjual {p.terjual}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Lihat</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
