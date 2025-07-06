// File: src/App.jsx
import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom"

const GuestLayout = React.lazy(() => import("./Guest/Layouts/GuestLayout"));
const Loading = React.lazy(() => import("./Guest/Components/Loading"));
const Produk = React.lazy(() => import("./Guest/Pages/Produk"));
const DetailProduk = React.lazy(() => import("./Guest/Pages/DetailProduk"));
const FAQ = React.lazy(() => import("./Guest/Pages/FAQ"));
const Galeri = React.lazy(() => import("./Guest/Pages/Galeri"));
const Kontak = React.lazy(() => import("./Guest/Pages/Kontak"));
const Artikel = React.lazy(() => import("./Guest/Pages/Artikel"));
const DetailArtikel = React.lazy(() => import("./Guest/Pages/DetailArtikel"));
const OurTeam = React.lazy(() => import("./Guest/Pages/OurTeam"));
const Career = React.lazy(() => import("./Guest/Pages/Career"));
const Keranjang = React.lazy(() => import("./Guest/Pages/Keranjang"));
const PricingPage = React.lazy(() => import("./Guest/Pages/PricingPage"));
const SimulasiHarga = React.lazy(() => import("./Guest/Components/SimulasiHarga"));

const AuthLayout = React.lazy(() => import("./Auth/Layouts/AuthLayout"));
const Login = React.lazy(() => import("./Auth/Login"));
const Register = React.lazy(() => import("./Auth/Register"));
const Forgot = React.lazy(() => import("./Auth/Forgot"));

const Error400 = React.lazy(() => import("./Error/Error400"));
const Error401 = React.lazy(() => import("./Error/Error401"));
const Error403 = React.lazy(() => import("./Error/Error403"));
const Error404 = React.lazy(() => import("./Error/Error404"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Guest layout */}
        <Route path="/" element={<GuestLayout />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/produk/:id" element={<DetailProduk />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel/:id" element={<DetailArtikel />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/career" element={<Career />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/PricingPage" element={<PricingPage />} />
        <Route path="/SimulasiHarga" element={<SimulasiHarga/>} />

        {/* Auth layout routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Catch-all */}
        <Route path="/badrequest" element={<Error400 />} />
        <Route path="/unauthorized" element={<Error401 />} />
        <Route path="/forbidden" element={<Error403 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
