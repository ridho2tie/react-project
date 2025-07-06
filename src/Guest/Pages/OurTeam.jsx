import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';

const teamMembers = [
    {
        id: 1,
        name: "Ridho Alamsyah",
        role: "CEO & Founder",
        image: "/img/team/ridho.jpg",
    },
    {
        id: 2,
        name: "Dewi Ramadhani",
        role: "UI/UX Designer",
        image: "/img/team/dewi.jpg",
    },
    {
        id: 3,
        name: "Andi Nugraha",
        role: "Frontend Developer",
        image: "/img/team/andi.jpg",
    },
    {
        id: 4,
        name: "Siti Nurhaliza",
        role: "Marketing Specialist",
        image: "/img/team/siti.jpg",
    },
];

export default function OurTeam() {
    return (
        <div className="bg-base-200 min-h-screen pt-20 font-poppins">
            <Navbar />

            {/* Header */}
            <section className="text-center py-10 px-4">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Meet Our Team</h1>
                <p className="text-gray-600 text-lg">
                    Orang-orang hebat di balik produk dan layanan terbaik kami.
                </p>
            </section>

            {/* Team Cards */}
            <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-12">
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden text-center hover:shadow-2xl transition duration-300"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </div>
    );
}
