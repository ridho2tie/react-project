import { AiFillEdit } from "react-icons/ai"; 
import { FAQAPI } from "../services/FAQAPI";
import { useState, useEffect } from "react";
import AlertBox from "../Components/AlertBox";
import GenericTable from "../Components/GenericTable";
import LoadingSpinner from "../Components/LoadingSpinner";
import EmptyState from "../Components/EmptyState";
import { AiFillDelete } from "react-icons/ai";

export default function FAQ() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [dataForm, setDataForm] = useState({
    question: "",
    answer: "",
  });
  const [editId, setEditId] = useState(null);

  // Ambil data FAQ saat komponen pertama kali render
  useEffect(() => {
    loadFAQ();
  }, []);

  const loadFAQ = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await FAQAPI.fetchFAQ();
      setFaqs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat FAQ");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await FAQAPI.createFAQ({
        title: dataForm.question,
        jawaban: dataForm.answer,
      });

      setSuccess("FAQ berhasil ditambahkan!");
      setDataForm({ question: "", answer: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadFAQ();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle untuk aksi hapus data
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus FAQ ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await FAQAPI.deleteFAQ(id);

      setSuccess("FAQ berhasil dihapus!");
      setTimeout(() => setSuccess(""), 3000);

      // Refresh data
      loadFAQ();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditId(faq.id);
    setDataForm({
      question: faq.title,
      answer: faq.jawaban,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await FAQAPI.updateFAQ(editId, {
        title: dataForm.question,
        jawaban: dataForm.answer,
      });
      setSuccess("FAQ berhasil diupdate!");
      setEditId(null);
      setDataForm({ question: "", answer: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadFAQ();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">FAQ App</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tambah FAQ Baru
        </h3>
        <form onSubmit={editId ? handleUpdate : handleSubmit} className="space-y-4">
          <input
            type="text"
            name="question"
            value={dataForm.question}
            placeholder="Pertanyaan"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200"
          />
          <textarea
            name="answer"
            value={dataForm.answer}
            placeholder="Isi jawaban"
            onChange={handleChange}
            disabled={loading}
            required
            rows="2"
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200 resize-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                        rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500
                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200 shadow-lg"
            disabled={loading}
          >
            {loading
              ? "Mohon Tunggu..."
              : editId
              ? "Update Catatan"
              : "Tambah Catatan"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setDataForm({ question: "", answer: "" });
              }}
              className="ml-2 px-6 py-3 bg-gray-400 text-white rounded-2xl"
            >
              Batal Edit
            </button>
          )}
        </form>
      </div>

      {/* Notes Table & State */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
        <div className="w-full">
          <div className="px-6 py-4 ">
            <h3 className="text-lg font-semibold">
              Daftar FAQ ({faqs.length})
            </h3>
          </div>

          {loading && <LoadingSpinner text="Memuat FAQ..." />}

          {!loading && faqs.length === 0 && !error && (
            <EmptyState text="Belum ada FAQ. Tambah FAQ pertama!" />
          )}

          {!loading && faqs.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
          )}

          {!loading && faqs.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">#</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">Pertanyaan</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">Jawaban</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq, index) => (
                  <tr key={faq.id}>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <div className="font-semibold text-emerald-600">
                        {faq.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 break-words">
                      <div className="text-gray-600">
                        {faq.jawaban}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                          <AiFillDelete className="text-2xl text-red-500" />
                          <span>Delete</span>
                        </button>
                        <button
                          onClick={() => handleEdit(faq)}
                          className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                          <AiFillEdit className="text-2xl text-yellow-500" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
}
