import { Outlet } from "react-router-dom";


export default function AuthLayout() {
  return (
      <div className="h-250 flex items-center inset-0 justify-center bg-gradient-to-r from-gray-600 to-white">
        <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg flex overflow-hidden">
          <Outlet />
        </div>
      </div>

  );
}
