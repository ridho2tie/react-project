import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { UserRoleAPI } from "../services/UserRole";
import { useState, useEffect } from "react";
import AlertBox from "../Components/AlertBox";
import GenericTable from "../Components/GenericTable";
import LoadingSpinner from "../Components/LoadingSpinner";
import EmptyState from "../Components/EmptyState";

export default function UserRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userRole, setUserRole] = useState([]);
  const [dataForm, setDataForm] = useState({
    nama: "",
    email: "",
    password: "",
    role: "",
    status_user: "",
  });
  const [editId, setEditId] = useState(null);

  // Ambil data user role saat komponen pertama kali render
  useEffect(() => {
    loadUserRole();
  }, []);

  const loadUserRole = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await UserRoleAPI.fetchUserRole();
      setUserRole(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat user role");
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

      await UserRoleAPI.createUserRole({
        nama: dataForm.nama,
        email: dataForm.email,
        password: dataForm.password,
        role: dataForm.role,
        status_user: dataForm.status_user, 
      });

      setSuccess("User berhasil ditambahkan!");
      setDataForm({ nama: "", email: "", password: "", role: "", status_user: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadUserRole();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle untuk aksi hapus data
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus user ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await UserRoleAPI.deleteUserRole(id);

      setSuccess("User berhasil dihapus!");
      setTimeout(() => setSuccess(""), 3000);

      // Refresh data
      loadUserRole();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setDataForm({
      nama: item.nama,
      email: item.email,
      password: item.password,
      role: item.role,
      status_user: item.status_user,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await UserRoleAPI.updateUserRole(editId, dataForm);
      setSuccess("User berhasil diupdate!");
      setEditId(null);
      setDataForm({ nama: "", email: "", password: "", role: "", status_user: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadUserRole();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6"> {/* Ubah max-w-2xl ke max-w-6xl */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">User Role App</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tambah User Baru
        </h3>
        <form onSubmit={editId ? handleUpdate : handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            value={dataForm.nama}
            placeholder="Nama"
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
            name="password"
            value={dataForm.password}
            placeholder="Password"
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <select
            name="role"
            value={dataForm.role}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <option value="">Pilih Role</option>
            <option value="Admin">Admin</option>
            <option value="Kasir">Kasir</option>
            <option value="Staff">Staff</option>
          </select>
          <select
            name="status_user"
            value={dataForm.status_user}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <option value="">Pilih Status User</option>
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
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
              ? "Update User"
              : "Tambah User"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setDataForm({ nama: "", email: "", password: "", role: "", status_user: "" });
              }}
              className="ml-2 px-6 py-3 bg-gray-400 text-white rounded-2xl"
            >
              Batal Edit
            </button>
          )}
        </form>
      </div>

      {/* User Role Table & State */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
        <div className="px-6 py-4 ">
          <h3 className="text-lg font-semibold">
            Daftar User ({userRole.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat user..." />}

        {!loading && userRole.length === 0 && !error && (
          <EmptyState text="Belum ada user. Tambah user pertama!" />
        )}

        {!loading && userRole.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}

        {!loading && userRole.length > 0 ? (
          <div className="w-full"> {/* Ubah min-w-[900px] ke w-full */}
            <GenericTable
              columns={[
                "#",
                "Nama",
                "Email",
                "Password",
                "Role",
                "Status User",
                "Created At",
                "Aksi",
              ]}
              data={userRole}
              renderRow={(item, index) => (
                <>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {index + 1}.
                  </td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.password}</td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {item.status_user}
                  </td>
                  <td className="px-6 py-4">{item.created_at}</td>
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
          </div>
        ) : null}
      </div>
    </div>
  );
}
