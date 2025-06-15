import { useEffect, useRef, useState } from 'react';

export default function TrendingProducts() {
  const containerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [produk, setProduk] = useState([]);

  const ITEMS_PER_VIEW = 3;
  const MAX_ITEMS = 9;
  const visibleProduk = produk.slice(0, MAX_ITEMS);
  const maxScroll = Math.ceil(visibleProduk.length / ITEMS_PER_VIEW);

  useEffect(() => {
    fetch('/data/produk.json')
      .then(res => res.json())
      .then(data => setProduk(data))
      .catch(err => console.error('Gagal mengambil data produk.json', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: ((scrollIndex + 1) % maxScroll) * containerRef.current.offsetWidth,
          behavior: 'smooth',
        });
        setScrollIndex((prev) => (prev + 1) % maxScroll);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [scrollIndex, maxScroll]);

  return (
    <section className="py-16 px-10 bg-gray-100 shadow-lg">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h3 className="text-3xl font-extrabold text-black">Our Trending Shoes</h3>
          <h2 className="text-5xl font-extrabold mb-2 text-black">Most Produk Products</h2>
          <p className="text-gray-500 font-bold max-w-md mb-4">Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit,</p>
          <button className="px-6 py-2 bg-white text-black font-semibold shadow hover:bg-gray-300">Explore</button>
        </div>

        <div className="overflow-hidden relative">
          <div
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
            ref={containerRef}
          >
            {visibleProduk.map((product, idx) => (
              <div
                key={idx}
                className="w-[calc(100%/3-1rem)] border border-gray-200 p-4 rounded-lg text-center bg-white shadow relative flex-shrink-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4"
                />
                <p className="font-semibold mb-1">{product.name}</p>
                <p className="text-gray-800 text-sm line-through">{product.oldPrice}</p>
                <p className="text-lg text-pink-600">{product.price}</p>
                <div className="absolute bottom-4 right-4 w-6 h-6 flex items-center justify-center bg-white text-black rounded-full">
                  ↗
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 gap-2 absolute -bottom-6 left-1/2 -translate-x-1/2">
            {Array.from({ length: maxScroll }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${scrollIndex === i ? 'bg-white' : 'bg-gray-400'}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}