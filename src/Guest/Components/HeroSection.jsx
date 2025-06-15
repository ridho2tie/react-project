export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-10 py-20 bg-gradient-to-tl from-gray-800 to-gray-100 items-center">
      <div>
        <h2 className="text-5xl font-bold leading-tight mb-4">Find Your Sole Mate With Us</h2>
        <p className="text-gray-600 mb-6">Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiusmod</p>
        <button className="bg-black text-white px-6 py-2 rounded shadow hover:bg-gray-800">Shop Now</button>
      </div>
      <div className="relative ">
        <img src="/img/Hero.png" alt="Hero Shoe" className="w-full" />
        <div className="absolute bottom-0 right-0 text-center">
          <h3 className="text-6xl font-extrabold mb-4 text-gray-200 mr-25">Trendy Slick Pro</h3>
          <p className="text-gray-400 font-barlowxl text-2xl">₹ 3999.00</p>
        </div>
      </div>
    </section>
  );
}