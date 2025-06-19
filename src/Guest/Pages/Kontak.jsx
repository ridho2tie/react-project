import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { KontakAPI } from "../services/KontakAPI";
import { useState, useEffect } from "react";
import AlertBox from "../Components/AlertBox";
import GenericTable from "../Components/GenericTable";
import LoadingSpinner from "../Components/LoadingSpinner";
import EmptyState from "../Components/EmptyState";

export default function Kontak() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [kontak, setKontak] = useState([]);
  const [dataForm, setDataForm] = useState({
    namaPengirim: "",
    email: "",
    subjekPesan: "",
    isiPesan: "",
    tanggalKirim: "",
    status: "",
  });
  const [editId, setEditId] = useState(null);

  // Ambil data kontak saat komponen pertama kali render
  useEffect(() => {
    loadKontak();
  }, []);

  const loadKontak = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await KontakAPI.fetchKontak();
      setKontak(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat kontak");
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

      await KontakAPI.createKontak({
        namaPengirim: dataForm.namaPengirim,
        email: dataForm.email,
        subjekPesan: dataForm.subjekPesan,
        isiPesan: dataForm.isiPesan,
        tanggalKirim: dataForm.tanggalKirim,
        status: dataForm.status,
      });

      setSuccess("Kontak berhasil ditambahkan!");
      setDataForm({
        namaPengirim: "",
        email: "",
        subjekPesan: "",
        isiPesan: "",
        tanggalKirim: "",
        status: "",
      });
      setTimeout(() => setSuccess(""), 3000);
      loadKontak();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle untuk aksi hapus data
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus kontak ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await KontakAPI.deleteKontak(id);

      setSuccess("Kontak berhasil dihapus!");
      setTimeout(() => setSuccess(""), 3000);

      // Refresh data
      loadKontak();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setDataForm({
      namaPengirim: item.namaPengirim,
      email: item.email,
      subjekPesan: item.subjekPesan,
      isiPesan: item.isiPesan,
      tanggalKirim: item.tanggalKirim,
      status: item.status,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await KontakAPI.updateKontak(editId, dataForm);
      setSuccess("Kontak berhasil diupdate!");
      setEditId(null);
      setDataForm({
        namaPengirim: "",
        email: "",
        subjekPesan: "",
        isiPesan: "",
        tanggalKirim: "",
        status: "",
      });
      setTimeout(() => setSuccess(""), 3000);
      loadKontak();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Kontak App</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tambah Kontak Baru
        </h3>
        <form onSubmit={editId ? handleUpdate : handleSubmit} className="space-y-4">
          <input
            type="text"
            name="namaPengirim"
            value={dataForm.namaPengirim}
            placeholder="Nama Pengirim"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <input
            type="email"
            name="email"
            value={dataForm.email}
            placeholder="Email"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <input
            type="text"
            name="subjekPesan"
            value={dataForm.subjekPesan}
            placeholder="Subjek Pesan"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <textarea
            name="isiPesan"
            value={dataForm.isiPesan}
            placeholder="Isi Pesan"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <input
            type="date"
            name="tanggalKirim"
            value={dataForm.tanggalKirim}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <select
            name="status"
            value={dataForm.status}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <option value="">Pilih Status</option>
            <option value="Belum dibaca">Belum dibaca</option>
            <option value="Sudah dibaca">Sudah dibaca</option>
          </select>
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
              ? "Update Kontak"
              : "Tambah Kontak"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setDataForm({
                  namaPengirim: "",
                  email: "",
                  subjekPesan: "",
                  isiPesan: "",
                  tanggalKirim: "",
                  status: "",
                });
              }}
              className="ml-2 px-6 py-3 bg-gray-400 text-white rounded-2xl"
            >
              Batal Edit
            </button>
          )}
        </form>
      </div>

      {/* Kontak Table & State */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
        <div className="w-full">
          <div className="px-6 py-4 ">
            <h3 className="text-lg font-semibold">
              Daftar Kontak ({kontak.length})
            </h3>
          </div>

          {loading && <LoadingSpinner text="Memuat kontak..." />}

          {!loading && kontak.length === 0 && !error && (
            <EmptyState text="Belum ada kontak. Tambah kontak pertama!" />
          )}

          {!loading && kontak.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
          )}

          {!loading && kontak.length > 0 ? (
            <GenericTable
              columns={[
                "#",
                "Nama Pengirim",
                "Email",
                "Subjek",
                "Isi Pesan",
                "Tanggal Kirim",
                "Status",
                "Aksi",
              ]}
              data={kontak}
              renderRow={(item, index) => (
                <>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {index + 1}.
                  </td>
                  <td className="px-6 py-4">{item.namaPengirim}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.subjekPesan}</td>
                  <td className="px-6 py-4">{item.isiPesan}</td>
                  <td className="px-6 py-4">{item.tanggalKirim}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">
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
                </>
              )}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
