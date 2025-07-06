import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaClock, FaTag } from "react-icons/fa";

const articles = [
    {
        id: 1,
        title: "5 Gaya Streetwear dengan Sneaker Putih",
        category: "Fashion",
        date: "2025-06-20",
        excerpt:
            "Inspirasi sneaker putih yang cocok dipadankan dengan outfit streetstyle modern.",
        image: "/img/Artikel/Artikel1.jpeg",
        content:
            "Ini adalah isi lengkap dari artikel gaya streetwear. Kamu bisa menambahkan konten HTML di sini sesuai kebutuhan.",
    },
    {
        id: 2,
        title: "Cara Membersihkan Sepatu Sneakers Tanpa Merusaknya",
        category: "Perawatan",
        date: "2025-06-18",
        excerpt:
            "Tips mudah dan aman untuk menjaga sneakers kesayangan tetap bersih dan awet.",
        image: "/img/Artikel/Artikel2.jpeg",
        content:
            "Gunakan sabun khusus dan sikat lembut agar tidak merusak bahan sneakers. Jangan gunakan mesin cuci.",
    },
    {
        id: 3,
        title: "Mengapa Kami Pilih Material Premium dan Vegan",
        category: "Brand Story",
        date: "2025-06-15",
        excerpt:
            "Dibalik komitmen brand kami: penggunaan material ramah lingkungan dan berkualitas.",
        image: "/img/Artikel/Artikel3.jpg",
        content:
            "Kami percaya bahwa fashion harus selaras dengan lingkungan. Itulah alasan kami memilih material premium vegan.",
    },
    {
        id: 4,
        title: "Sneaker Terbaru Minggu Ini",
        category: "Rilisan",
        date: "2025-06-22",
        excerpt:
            "Highlight rilisan sneaker terbaru minggu ini, langsung dari koleksi eksklusif kami.",
        image: "/images/artikel4.jpg",
        content:
            "Lihat koleksi eksklusif minggu ini yang dirancang untuk kamu yang ingin tampil beda dengan gaya terkini.",
    },
];

export default function DetailArtikel() {
    const { id } = useParams();
    const article = articles.find((a) => a.id === parseInt(id));

    if (!article) {
        return (
            <div className="flex flex-col min-h-screen font-poppins">
                <Navbar />
                <div className="flex-grow flex items-center justify-center text-red-600 text-2xl">
                    Artikel tidak ditemukan.
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-base-200 font-poppins">
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-4xl mx-auto px-6 pt-24 bg-white shadow rounded-lg mt-10">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full max-h-[500px] object-contain rounded mb-6"
                    />
                    <div className="flex gap-6 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-2">
                            <FaTag /> {article.category}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaClock /> {article.date}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                        {article.content}
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
