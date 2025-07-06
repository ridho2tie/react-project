import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

export default function BestSelling() {
  const categories = ['Man', 'Woman', 'Boy'];
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Man');

  useEffect(() => {
    const fetchBestSelling = async () => {
      const { data, error } = await supabase
        .from('sepatu')
        .select('*')
        .ilike('gender', activeCategory.toLowerCase()) // <= perbaikan di sini
        .order('terjual', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Gagal mengambil data sepatu:', error.message);
      } else {
        setProducts(data);
      }
    };

    fetchBestSelling();
  }, [activeCategory]);

  return (
    <section className="pb-35 pt-10 px-50 bg-gray-100">
      <div className="flex items-center justify-center my-10">
        <span className="w-10 h-px bg-black mr-4"></span>
        <h2 className="text-2xl text-black font-bold mb-4 text-center">Best Selling</h2>
        <span className="w-10 h-px bg-black ml-4"></span>
      </div>

      <div className="flex justify-center mb-8 space-x-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 border rounded font-semibold transition ${
              activeCategory === cat
                ? 'bg-black text-white'
                : 'hover:bg-black hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl bg-transparent transition duration-200 hover:border hover:border-black relative"
          >
            <img src={p.gambar} alt={p.nama} className="w-full h-40 object-contain" />
            <p className="font-semibold mb-1">{p.nama}</p>
            <div className="text-sm text-gray-500 line-through">
              {p.hargalama && `Rp ${parseInt(p.hargalama).toLocaleString('id-ID')}`}
            </div>
            <div className="text-lg text-pink-600 mb-1">
              Rp {parseInt(p.harga).toLocaleString('id-ID')}
            </div>
            <div className="text-sm text-yellow-500 font-medium">
              ⭐ {p.rating || 4.5} | Terjual {p.terjual}
            </div>
            <div className="absolute bottom-4 right-4 w-6 h-6 flex items-center justify-center bg-black text-white rounded-full">
              ↗
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
