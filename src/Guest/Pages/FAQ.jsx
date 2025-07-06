// src/Guest/Pages/FAQ.jsx
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import { useEffect, useState } from "react";
import {FAQAPI} from "../../services/FAQAPI"

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    FAQAPI.fetchFAQ().then(setFaqs);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <section className="max-w-3xl mx-auto py-25 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Pertanyaan Umum
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg mb-2 text-emerald-600">
                {faq.title}
              </h3>
              <p className="text-gray-600">{faq.jawaban}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
