import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import { Button } from "../Components/Button";
import { Info, Star, X } from "lucide-react";
import { supabase } from "../../services/supabase";

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(value);
}

export default function DetailProduk() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("sepatu")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal memuat produk:", error);
      } else {
        setProduct(data);
        setActiveImage(data.gambar);
        setSelectedColor(data.warna?.[0] || null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-40">Memuat produk...</div>;

  // Dummy reviews (karena tidak ada review di Supabase)
  const reviews = [
    { user: "Ridho", rating: 5, comment: "Kualitas mantap dan jahitan rapi!", date: "2025-06-20" },
    { user: "Dina", rating: 4, comment: "Model bagus, tapi ukuran agak besar.", date: "2025-06-22" },
    { user: "Andi", rating: 5, comment: "Nyaman dipakai dan warna keren!", date: "2025-06-25" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-40 pb-25 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="flex gap-4">
          <div className="space-y-2">
            {[product.gambar].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={`w-16 h-20 object-cover rounded cursor-pointer border ${activeImage === img ? "border-black" : "border-transparent"}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center bg-white rounded-xl shadow">
            <img
              src={activeImage}
              alt={product.nama}
              className="max-h-[500px] w-auto object-contain"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold uppercase tracking-wide">{product.nama}</h2>
          <p className="text-lg font-semibold">{formatRupiah(product.harga)}</p>
          {product.hargalama && (
            <p className="line-through text-gray-500">
              {formatRupiah(product.hargalama)}
            </p>
          )}

          {/* Warna (dummy/default) */}
          <div>
            <p className="text-sm font-semibold mb-1">Color</p>
            <div className="flex gap-2">
              {["#E5E5E5", "#000000", "#94D5C5"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-gray-300"}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Ukuran */}
          <div>
            <p className="text-sm font-semibold mb-1">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.ukuran?.split(",").map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 text-sm font-medium border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <button className="text-sm underline">FIND YOUR SIZE</button>
            <button className="text-sm underline">MEASUREMENT GUIDE</button>
          </div>

          <button
            disabled={!selectedSize}
            className={`w-full py-3 mt-6 font-semibold uppercase ${selectedSize ? "bg-black text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
          >
            Add
          </button>
        </div>
      </div>

      {/* Tab Deskripsi & Ulasan */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === "description" ? "border-b-4 border-black text-black" : "text-gray-600"}`}
          >
            <Info size={16} /> Deskripsi
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === "reviews" ? "border-b-4 border-black text-black" : "text-gray-600"}`}
          >
            <Star size={16} /> Ulasan ({reviews.length})
          </button>
        </div>

        {activeTab === "description" && (
          <div className="text-gray-700 leading-relaxed text-lg">{product.deskripsi}</div>
        )}

        {activeTab === "reviews" && (
          <div>
            {reviews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.slice(0, 3).map((rev, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6 flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-black font-bold text-xl">
                        {rev.user.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-800">{rev.user}</p>
                          <span className="text-sm text-gray-400">• {rev.date}</span>
                        </div>
                        <div className="flex gap-1 text-yellow-500 mb-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                          ))}
                        </div>
                        <p className="text-gray-600">{rev.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button onClick={() => setShowModal(true)} className="bg-black text-white">
                    Lihat Semua Ulasan
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center">Belum ada ulasan untuk produk ini.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal Semua Ulasan */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <X size={20} />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Semua Ulasan</h3>
            <div className="grid grid-cols-1 gap-4">
              {reviews.map((rev, index) => (
                <div key={index} className="flex gap-4 items-start border-b pb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-black font-bold text-xl">
                    {rev.user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800">{rev.user}</p>
                      <span className="text-sm text-gray-400">• {rev.date}</span>
                    </div>
                    <div className="flex gap-1 text-yellow-500 mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <p className="text-gray-600">{rev.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
