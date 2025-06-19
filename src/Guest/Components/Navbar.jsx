import { NavLink } from 'react-router-dom';
import {
  FaSearch,
  FaUserAlt,
  FaShoppingCart,
  FaComments
} from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const brandIcons = [
    { icon: '/img/brands/nike.svg', name: 'Nike' },
    { icon: '/img/brands/adidas.svg', name: 'Adidas' },
    { icon: '/img/brands/converse.svg', name: 'Converse' },
    { icon: '/img/brands/newbalance.svg', name: 'New Balance' },
    { icon: '/img/brands/nba.svg', name: 'NBA' },
    { icon: '/img/brands/jordan.svg', name: 'Jordan' }
  ];

  return (
    <nav className="flex justify-between items-center py-6 px-10 bg-black shadow relative">
      <h1 className="text-3xl bg-white text-black font-extrabold px-2">SneakerX</h1>

      <ul className="flex space-x-6 text-white font-barlow text-xl">
        <li className="relative group">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-200 ${isActive ? 'text-gray-300' : ''}`
            }
          >
            Home
          </NavLink>
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </li>

        <li
          className="relative group cursor-pointer"
          onMouseEnter={() => setShowBrands(true)}
          onMouseLeave={() => setShowBrands(false)}
        >
          <span className="hover:text-gray-300 transition duration-200">Brand</span>
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>

          {showBrands && (
            <div className="absolute mt-6 left-1/2 ml-24 -translate-x-1/2 w-screen bg-white px-10 py-10 rounded shadow-lg grid grid-cols-6">
              {brandIcons.map((brand, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center hover:scale-110 transition-transform"
                  title={brand.name}
                >
                  <img src={brand.icon} alt={brand.name} className="w-30 h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </li>

        <li className="relative group">
          <NavLink
            to="/Produk"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-200 ${isActive ? 'text-gray-300' : ''}`
            }
          >
            Produk
          </NavLink>
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </li>

        <li className="relative group">
          <NavLink
            to="/faqs"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-200 ${isActive ? 'text-gray-300' : ''}`
            }
          >
            FAQs
          </NavLink>
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </li>
                <li className="relative group">
          <NavLink
            to="/kontak"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-200 ${isActive ? 'text-gray-300' : ''}`
            }
          >
            Kontak
          </NavLink>
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </li>
                <li className="relative group">
          <NavLink
            to="/galeri"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-200 ${isActive ? 'text-gray-300' : ''}`
            }
          >
            Galeri
          </NavLink>
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </li>
      </ul>

      <div className="flex items-center space-x-4 text-white relative">
        <div className="relative">
          <FaSearch className="cursor-pointer" onClick={() => setShowSearch(!showSearch)} />
          {showSearch && (
            <input
              type="text"
              placeholder="Cari produk..."
              className="absolute top-0 right-6 bg-white text-black px-5 py-1 rounded shadow"
              autoFocus
            />
          )}
        </div>
        <FaShoppingCart className="cursor-pointer" />
        <FaUserAlt className="cursor-pointer" />
        <FaComments className="cursor-pointer" />

        <button
          onClick={() => setShowRoleMenu(!showRoleMenu)}
          className="ml-2 px-4 py-1 bg-white text-black font-semibold rounded hover:bg-gray-200"
        >
          Masuk | Daftar
        </button>

        {showRoleMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white text-black shadow rounded w-48 z-50">
            <a
              href="https://react-project-gooy.vercel.app/login"
              className="block px-4 py-2 hover:bg-gray-100 border-b"
            >
              Guest
            </a>
            <a
              href="https://sneaker-x-mocha.vercel.app/"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Admin
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
