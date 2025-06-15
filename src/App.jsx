// File: src/App.jsx
import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const GuestLayout = React.lazy(() => import("./Guest/Layouts/GuestLayout"));
const Loading = React.lazy(() => import("./Guest/Components/Loading"));
const Produk = React.lazy(() => import("./Guest/Pages/Produk"));
const FAQs = React.lazy(() => import("./Guest/Pages/FAQs"));

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
        <Route path="/produk" element={<Produk/>}/>
        <Route path="/FAQs" element={<FAQs/>}/>

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
