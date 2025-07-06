import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import { supabase } from "../../services/supabase"; // pastikan path ini benar

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);
}

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("sepatu")
        .select("*")
        .limit(2);
      if (error) {
        console.error("Gagal memuat data produk:", error);
      } else {
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.nama,
          size: item.ukuran.split(",")[0], // ambil ukuran pertama
          price: parseInt(item.harga),
          quantity: 1,
          image: item.gambar
        }));
        setCart(formatted);
      }
    };

    fetchProducts();
  }, []);

  const updateQuantity = (id, newQty) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="p-8 md:p-16">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center text-sm text-gray-700 hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Kiri: Form Info */}
          <div className="lg:col-span-2 space-y-10">
            <h1 className="text-3xl font-bold">CHECKOUT</h1>

            <div className="flex space-x-6 font-semibold text-sm text-gray-500 border-b pb-2">
              <span className="text-black border-b-2 border-black pb-1">INFORMATION</span>
              <span>SHIPPING</span>
              <span>PAYMENT</span>
            </div>

            <form className="space-y-8">
              <div>
                <label className="block text-xs font-bold mb-2">CONTACT INFO</label>
                <input type="email" placeholder="Email" className="w-full border p-3 text-sm mb-3" />
                <input type="tel" placeholder="Phone" className="w-full border p-3 text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">SHIPPING ADDRESS</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="border p-3 text-sm" />
                  <input type="text" placeholder="Last Name" className="border p-3 text-sm" />
                </div>
                <select className="w-full border p-3 mt-4 text-sm">
                  <option value="">Country</option>
                  <option value="Indonesia">Indonesia</option>
                </select>
                <input type="text" placeholder="State / Region" className="w-full border p-3 mt-4 text-sm" />
                <input type="text" placeholder="Address" className="w-full border p-3 mt-4 text-sm" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input type="text" placeholder="City" className="border p-3 text-sm" />
                  <input type="text" placeholder="Postal Code" className="border p-3 text-sm" />
                </div>
              </div>

              <button type="submit" className="bg-gray-900 text-white w-full py-3 font-semibold">
                Shipping →
              </button>
            </form>
          </div>

          {/* Kanan: YOUR ORDER */}
          <div className="border p-6 space-y-6 bg-gray-50">
            <div className="flex justify-between text-sm font-semibold">
              <span>YOUR ORDER</span>
              <span>({cart.length})</span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-20 object-contain"
                />
                <div className="flex-1 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold leading-tight">{item.title}</p>
                      <p className="text-gray-500 text-xs">
                        Size: {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingItemId(editingItemId === item.id ? null : item.id)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  {editingItemId === item.id ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="border px-2 py-1 w-16"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-blue-500 mt-1">({item.quantity})</p>
                  )}
                </div>
                <div className="text-sm font-semibold text-right w-28">
                  {formatRupiah(item.price * item.quantity)}
                </div>
              </div>
            ))}

            {/* Ringkasan Total */}
            <div className="text-sm space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-500">Dihitung di langkah berikutnya</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
