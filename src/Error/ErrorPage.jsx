import { NavLink } from "react-router-dom";

export default function ErrorPage({ errorCode, title, message, image }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <img
        src={image}
        alt={`Error ${errorCode}`}
        className="w-96 h-auto mb-6 object-contain"
      />
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">{errorCode}</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">{title}</h2>
      <p className="text-gray-500 text-lg mb-6 max-w-lg">{message}</p>
      <NavLink
        to="/"
        className="px-6 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800"
      >
        Back to Homepage
      </NavLink>
    </div>
  );
}