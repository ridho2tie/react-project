import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import { FaClock, FaTag } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "5 Gaya Streetwear dengan Sneaker Putih",
    category: "Fashion",
    date: "2025-06-20",
    excerpt:
      "Inspirasi sneaker putih yang cocok dipadankan dengan outfit streetstyle modern.",
    image: "/img/Artikel/Artikel1.jpeg",
  },
  {
    id: 2,
    title: "Cara Membersihkan Sepatu Sneakers Tanpa Merusaknya",
    category: "Perawatan",
    date: "2025-06-18",
    excerpt:
      "Tips mudah dan aman untuk menjaga sneakers kesayangan tetap bersih dan awet.",
    image: "/img/Artikel/Artikel2.jpeg",
  },
  {
    id: 3,
    title: "Mengapa Kami Pilih Material Premium dan Vegan",
    category: "Brand Story",
    date: "2025-06-15",
    excerpt:
      "Dibalik komitmen brand kami: penggunaan material ramah lingkungan dan berkualitas.",
    image: "/img/Artikel/Artikel3.jpg",
  },
  {
    id: 4,
    title: "Sneaker Terbaru Minggu Ini",
    category: "Rilisan",
    date: "2025-06-22",
    excerpt:
      "Highlight rilisan sneaker terbaru minggu ini, langsung dari koleksi eksklusif kami.",
    image: "/images/artikel4.jpg",
  },
];

const articlesPerPage = 2;

export default function Artikel() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-base-200 pt-25 font-poppins min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="text-center py-14 px-2">
        <h1 className="text-6xl font-bold font-poppinsxl text-gray-800 mb-4">
          Artikel & Wawasan
        </h1>
        <p className="text-gray-600 text-lg font-poppins">
          Temukan tips, inspirasi, dan cerita di balik produk terbaik kami.
        </p>
      </section>

      {/* Alternating Artikel Cards */}
      <section className="w-full space-y-24 pb-12">
        {currentArticles.map((art, idx) => (
          <div key={art.id} className="w-full px-6 flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full bg-gradient-to-l from-black to-white rounded-xl shadow-xl overflow-hidden min-h-[28rem]">
              {/* Gambar */}
              <div className={`${idx % 2 === 1 ? "lg:order-2" : ""} h-full`}>
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="max-h-full object-center max-w-full object-fill"
                  />
                </div>
              </div>

              {/* Konten */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex gap-6 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-2">
                    <FaTag /> {art.category}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock /> {art.date}
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-4 font-poppinsxl text-gray-800">
                  {art.title}
                </h2>
                <p className="text-gray-700 font-poppins text-base leading-relaxed mb-6">
                  {art.excerpt}
                </p>
                <button className="btn btn-outline btn-emerald-600 hover:btn-emerald-700">
                  <NavLink
                    to={`/Artikel/${art.id}`}
                    className={({ isActive }) =>
                      `transition duration-200 ${isActive ? "text-gray-500" : "text-black"} hover:text-gray-500`
                    }
                  >
                    Baca Selengkapnya
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx + 1)}
            className={`px-4 py-2 border rounded ${currentPage === idx + 1 ? "bg-black text-white" : ""
              }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}
