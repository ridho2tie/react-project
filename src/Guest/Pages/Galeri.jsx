import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { GaleriAPI } from "../services/GaleriAPI";
import { useState, useEffect } from "react";
import AlertBox from "../Components/AlertBox";
import GenericTable from "../Components/GenericTable";
import LoadingSpinner from "../Components/LoadingSpinner";
import EmptyState from "../Components/EmptyState";

export default function Galeri() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [galeri, setGaleri] = useState([]);
  const [dataForm, setDataForm] = useState({
    title: "",
    gambar: "",
    video: "",
  });
  const [editId, setEditId] = useState(null);

  // Ambil data galeri saat komponen pertama kali render
  useEffect(() => {
    loadGaleri();
  }, []);

  const loadGaleri = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await GaleriAPI.fetchGaleri();
      setGaleri(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat galeri");
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

      await GaleriAPI.createGaleri({
        title: dataForm.title,
        gambar: dataForm.gambar,
        video: dataForm.video,
      });

      setSuccess("Galeri berhasil ditambahkan!");
      setDataForm({ title: "", gambar: "", video: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadGaleri();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle untuk aksi hapus data
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus galeri ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await GaleriAPI.deleteGaleri(id);

      setSuccess("Galeri berhasil dihapus!");
      setTimeout(() => setSuccess(""), 3000);

      // Refresh data
      loadGaleri();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setDataForm({
      title: item.title,
      gambar: item.gambar,
      video: item.video,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await GaleriAPI.updateGaleri(editId, dataForm);
      setSuccess("Galeri berhasil diupdate!");
      setEditId(null);
      setDataForm({ title: "", gambar: "", video: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadGaleri();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6"> {/* Ubah max-w-2xl ke max-w-6xl dan tambah w-full */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Galeri App</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tambah Galeri Baru
        </h3>
        <form onSubmit={editId ? handleUpdate : handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={dataForm.title}
            placeholder="Judul"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200"
          />
          <input
            type="text"
            name="gambar"
            value={dataForm.gambar}
            placeholder="URL Gambar"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200"
          />
          <input
            type="text"
            name="video"
            value={dataForm.video}
            placeholder="URL Video"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200"
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
              ? "Update Galeri"
              : "Tambah Galeri"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setDataForm({ title: "", gambar: "", video: "" });
              }}
              className="ml-2 px-6 py-3 bg-gray-400 text-white rounded-2xl"
            >
              Batal Edit
            </button>
          )}
        </form>
      </div>

      {/* Galeri Table & State */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
        <div className="w-full">
          <div className="px-6 py-4 ">
            <h3 className="text-lg font-semibold">
              Daftar Galeri ({galeri.length})
            </h3>
          </div>

          {loading && <LoadingSpinner text="Memuat galeri..." />}

          {!loading && galeri.length === 0 && !error && (
            <EmptyState text="Belum ada galeri. Tambah galeri pertama!" />
          )}

          {!loading && galeri.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
          )}

          {!loading && galeri.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">#</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">Judul</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">Gambar</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">Video</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 border-b border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {galeri.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 border-b border-gray-200 align-top font-semibold text-gray-700">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 align-top">
                      <div className="font-semibold text-emerald-600">
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 align-top max-w-xs">
                      <div className="truncate text-gray-600">
                        <a href={item.gambar} target="_blank" rel="noopener noreferrer">{item.gambar}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 align-top max-w-xs">
                      <div className="truncate text-gray-600">
                        <a href={item.video} target="_blank" rel="noopener noreferrer">{item.video}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 align-top">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => handleEdit(item)}
                          disabled={loading}
                          className="px-3 py-1 bg-yellow-100 rounded hover:bg-yellow-200 transition-colors"
                          title="Edit"
                        >
                          <AiFillEdit className="text-2xl text-yellow-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-100 rounded hover:bg-red-200 transition-colors"
                          title="Hapus"
                        >
                          <AiFillDelete className="text-2xl text-red-500" />
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
