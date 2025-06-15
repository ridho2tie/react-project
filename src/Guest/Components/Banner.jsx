export default function Banner() {
  return (
    <div className="relative h-130 overflow-visible">
      {/* Gradient Background */}
      <div className="absolute inset-0  bg-gradient-to-r from-black to-gray-200"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex justify-between items-center h-full px-10">
        {/* Text & Button */}
        <div className="text-white max-w-md">
          <h2 className="text-4xl font-extrabold mb-2">SALE 50% OFF</h2>
          <p className="text-lg mb-4">Only this weekend. Don’t miss the deal on our best shoes.</p>
          <button className="px-6 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-300">
            Shop Now
          </button>
        </div>

        {/* Product Image */}
        <img
          src="/img/SHOES.png"
          alt="Product"
          className="w-full object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
}