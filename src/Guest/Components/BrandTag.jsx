export default function BrandTag({ visible }) {
  if (!visible) return null;

  const brandIcons = [
    { name: 'Adidas', icon: '/img/brands/adidas.svg' },
    { name: 'Converse', icon: '/img/brands/converse.svg' },
    { name: 'Jordan', icon: '/img/brands/jordan.svg' },
    { name: 'NBA', icon: '/img/brands/nba.svg' },
    { name: 'New Balance', icon: '/img/brands/newbalance.svg' },
    { name: 'Nike', icon: '/img/brands/nike.svg' },
    { name: 'Puma', icon: '/img/brands/puma.svg' }
  ];

  return (
    <div className="bg-black py-4 flex justify-center items-center gap-30 shadow-lg z-40">
      {brandIcons.map((brand, i) => (
        <div key={i} className="flex flex-col items-center cursor-pointer group">
          <img
            src={brand.icon}
            alt={brand.name}
            className="h-20 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 filter brightness-0 invert group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="text-white text-xs mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300 hidden">
            {brand.name}
          </span>
          <div className="text-white text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity duration-300 hidden">
            {brand.name}
          </div>
        </div>
      ))}
    </div>
  );
}
