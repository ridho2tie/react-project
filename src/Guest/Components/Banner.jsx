export default function Banner() {
  return (
    <div className="px-50 bg-gray-100 relative">
      <div className="relative bg-pink-700 rounded-3xl overflow-visible flex items-center justify-end">

        {/* Gambar besar kiri (keluar dari card) */}
        <div className="absolute -left-10 mb-38 z-10">
          <img
            src="/img/SHOES.png"
            alt="Shoes"
            className="max-h-[40rem] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Konten teks kanan (card yang menyesuaikan isi teks) */}
        <div className="relative z-20 bg-pink-700 rounded-3xl px-10 p-10 w-fit">
          <div className="text-white px-5 mr-10 font-poppins space-y-4">
            <p className="text-4xl font-poppins tracking-wider uppercase opacity-90">
              Are you ready to
            </p>
            <h2 className="text-4xl font-bold t font-poppinsxl">
              lead the way
            </h2>
            <p className="text-sm opacity-80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur<br />
              adipiscing elit, sed do.
            </p>

            <button className="mt-2 px-6 py-2 bg-white text-pink-600 font-semibold rounded-md text-sm hover:bg-pink-50 transition">
              Explore
            </button>

            {/* Thumbnail Carousel */}
            <div className="flex gap-2 pt-4">
              <img src="/img/produk/adidas1.png" alt="thumb" className="w-12 h-12 rounded-lg" />
              <img src="/img/produk/adidas2.png" alt="thumb" className="w-12 h-12 rounded-lg" />
              <img src="/img/produk/adidas3.png" alt="thumb" className="w-12 h-12 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Arrow Nav */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-30">
          <div className="w-8 h-8 border-2 border-white/50 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 right-10 flex gap-1 z-20">
          <div className="w-6 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
  