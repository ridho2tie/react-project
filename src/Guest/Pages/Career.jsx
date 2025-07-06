import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const careers = [
    {
        id: 1,
        title: "Frontend Developer",
        location: "Bandung, Indonesia",
        type: "Full-Time",
        description:
            "Bertanggung jawab atas pengembangan antarmuka web menggunakan React dan Tailwind CSS.",
    },
    {
        id: 2,
        title: "Digital Marketing Specialist",
        location: "Remote",
        type: "Contract",
        description:
            "Mengelola kampanye pemasaran digital untuk meningkatkan brand awareness dan konversi.",
    },
    {
        id: 3,
        title: "UI/UX Designer",
        location: "Jakarta, Indonesia",
        type: "Full-Time",
        description:
            "Merancang pengalaman pengguna yang menarik dan responsif dengan pendekatan user-centered.",
    },
];

export default function Career() {
    return (
        <div className="bg-base-200 min-h-screen pt-20 font-poppins">
            <Navbar />

            {/* Header */}
            <section className="text-center py-12 px-4">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Karier di Perusahaan Kami</h1>
                <p className="text-gray-600 text-lg">
                    Bergabunglah dan bantu kami membangun masa depan yang lebih baik bersama!
                </p>
            </section>

            {/* Career Cards */}
            <section className="max-w-6xl mx-auto px-6 grid gap-8">
                {careers.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                        <div className="flex items-center text-gray-500 text-sm gap-4 mb-2">
                            <span className="flex items-center gap-1">
                                <FaMapMarkerAlt /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <FaBriefcase /> {job.type}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        <button className="btn btn-outline btn-emerald-600 hover:btn-emerald-700">
                            Lamar Sekarang
                        </button>
                    </div>
                ))}
            </section><br></br>
            <Footer />
        </div>
    );
}
