import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-10 grid md:grid-cols-3 gap-6">
      
      {/* Logo & Socials */}
      <div>
        <h3 className="text-lg font-bold mb-2">Slick</h3>
        <p className="text-sm text-gray-400 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <div className="flex space-x-4 text-xl">
          <span>📘</span>
          <span>📷</span>
        </div>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-lg font-bold mb-2">Subscribe to our newsletter</h3>
        <input
          type="email"
          placeholder="Enter your email..."
          className="py-2 px-4 w-full bg-white rounded text-black"
        />
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg ml-30 font-bold mb-2">Quick Links</h3>
        <ul className="space-y-2 ml-30 text-sm text-gray-300">
          <li>
            <Link
              to="/"
              className="underline hover:text-white transition"
            >
              FAQs
            </Link>
          </li>
          <li>
            <Link
              to="/Kontak"
              className="underline hover:text-white transition"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/OurTeam"
              className="underline hover:text-white transition"
            >
              Our Team
            </Link>
          </li>
          <li>
            <Link
              to="/Career"
              className="underline hover:text-white transition"
            >
              Career
            </Link>
          </li>
          <li>
            <Link
              to="/Galeri"
              className="underline hover:text-white transition"
            >
              Galeri
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
