import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaUserAlt, FaShoppingCart, FaComments } from 'react-icons/fa';
import BrandTag from './BrandTag'; // pastikan path ini benar

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showBrandTag, setShowBrandTag] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.brand-section')) {
        setShowBrandTag(false);
      }
    };
    if (showBrandTag) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBrandTag]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent backdrop-blur-md'}
        flex justify-between items-center py-6 px-10`}
      >
        <h1 className="text-3xl font-poppinsxl px-2 text-black">SneakerX</h1>

        <ul className="flex space-x-6 font-poppins text-xl text-black">
          <li>
            <NavLink to="/" className={({ isActive }) => `transition duration-200 ${isActive ? 'text-gray-500' : 'text-black'} hover:text-gray-500`}>
              Home
            </NavLink>
          </li>
          <li className="brand-section">
            <button
              onClick={() => setShowBrandTag(!showBrandTag)}
              className={`transition duration-200 cursor-pointer font-medium hover:underline
              ${showBrandTag ? 'text-gray-500' : 'text-black hover:text-gray-500'}`}
            >
              Brand {showBrandTag ? '▲' : '▼'}
            </button>
          </li>
          <li>
            <NavLink to="/Produk" className={({ isActive }) => `transition duration-200 ${isActive ? 'text-gray-500' : 'text-black'} hover:text-gray-500`}>
              Produk
            </NavLink>
          </li>
          <li>
            <NavLink to="/faqs" className={({ isActive }) => `transition duration-200 ${isActive ? 'text-gray-500' : 'text-black'} hover:text-gray-500`}>
              FAQs
            </NavLink>
          </li>
          <li>
            <NavLink to="/kontak" className={({ isActive }) => `transition duration-200 ${isActive ? 'text-gray-500' : 'text-black'} hover:text-gray-500`}>
              Kontak
            </NavLink>
          </li>
          <li>
            <NavLink to="/galeri" className={({ isActive }) => `transition duration-200 ${isActive ? 'text-gray-500' : 'text-black'} hover:text-gray-500`}>
              Galeri
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center space-x-4 text-black relative">
          <div className="relative">
            <FaSearch className="cursor-pointer hover:text-gray-500 transition duration-200" onClick={() => setShowSearch(!showSearch)} />
            {showSearch && (
              <input
                type="text"
                placeholder="Cari produk..."
                className="absolute top-0 right-6 bg-white text-black px-5 py-1 rounded shadow"
                autoFocus
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
              />
            )}
          </div>

          <FaShoppingCart className="cursor-pointer hover:text-gray-500 transition duration-200" />
          <FaUserAlt className="cursor-pointer hover:text-gray-500 transition duration-200" />
          <FaComments className="cursor-pointer hover:text-gray-500 transition duration-200" />

          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="ml-2 px-4 py-1 bg-black text-white font-poppinsxl rounded hover:bg-gray-200"
          >
            Masuk | Daftar
          </button>

          {showRoleMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white text-black shadow rounded w-48 z-50">
              <a href="https://react-project-gooy.vercel.app/login" className="block px-4 py-2 hover:bg-gray-100 border-b">Guest</a>
              <a href="https://sneaker-x-mocha.vercel.app/" className="block px-4 py-2 hover:bg-gray-100">Admin</a>
            </div>
          )}
        </div>
      </nav>

      {showBrandTag && (
        <div className="fixed top-[88px] left-0 w-full z-40">
          <BrandTag visible={true} />
        </div>
      )}
    </>
  );
}
