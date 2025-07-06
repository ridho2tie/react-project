import { NavLink } from "react-router-dom";

export const Card = ({ to, children, className = "" }) => {
  const baseClass = `bg-white shadow rounded-2xl overflow-hidden transition hover:shadow-lg ${className}`;

  // Jika ada prop `to`, bungkus Card dengan NavLink (misal untuk ke detail produk)
  return to ? (
    <NavLink to={to} className={baseClass}>
      {children}
    </NavLink>
  ) : (
    <div className={baseClass}>{children}</div>
  );
};

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
