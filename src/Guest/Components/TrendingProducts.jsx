// src/Guest/Components/TrendingProducts.jsx
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../services/supabase";

export default function TrendingProducts() {
  const containerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [produk, setProduk] = useState([]);

  const ITEMS_PER_VIEW = 3;
  const MAX_ITEMS = 9;
  const visibleProduk = produk.slice(0, MAX_ITEMS);
  const maxScroll = Math.ceil(visibleProduk.length / ITEMS_PER_VIEW);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data, error } = await supabase
        .from("sepatu")
        .select("id, nama, brand, harga, gambar")
        .order("terjual", { ascending: false }) // optional: bisa pakai 'rating' juga
        .limit(9);

      if (error) {
        console.error("Gagal mengambil data trending:", error.message);
      } else {
        setProduk(data);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left:
            ((scrollIndex + 1) % maxScroll) * containerRef.current.offsetWidth,
          behavior: "smooth",
        });
        setScrollIndex((prev) => (prev + 1) % maxScroll);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [scrollIndex, maxScroll]);

  return (
    <section className="py-25 px-50 bg-gray-100 shadow-lg">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h3 className="text-3xl font-extrabold text-black">Our Trending Shoes</h3>
          <h2 className="text-5xl font-extrabold mb-2 text-black">Most Produk Products</h2>
          <p className="text-gray-500 font-bold max-w-md mb-4">
            Produk terlaris kami yang paling banyak diminati!
          </p>
          <button className="px-6 py-2 bg-white text-black font-semibold shadow hover:bg-gray-300">
            Explore
          </button>
        </div>

        <div className="overflow-hidden relative">
          <div
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
            ref={containerRef}
          >
            {visibleProduk.map((product) => (
              <div
                key={product.id}
                className="card w-80 bg-base-100 shadow-sm flex-shrink-0"
              >
                <figure>
                  <img
                    src={product.gambar}
                    alt={product.nama}
                    className="w-full h-48 object-contain"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.nama}</h2>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <p className="text-lg text-pink-600">
                    Rp {parseInt(product.harga).toLocaleString("id-ID")}
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Lihat</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
