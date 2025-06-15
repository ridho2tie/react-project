import Navbar from "../Components/Navbar";

// src/Guest/Pages/Faqz.jsx
export default function FAQs() {
  const faqs = [
    {
      question: "Apa itu KickShoe?",
      answer: "KickShoe adalah platform jual sepatu berkualitas.",
    },
    {
      question: "Apakah bisa retur?",
      answer: "Ya, maksimal 7 hari sejak barang diterima.",
    },
    {
      question: "Metode pembayaran apa saja?",
      answer: "Kami mendukung transfer, e-wallet, dan COD.",
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-gray-200 shadow">
      <Navbar />
      <section className="max-w-3xl mx-auto py-55 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Pertanyaan Umum
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
