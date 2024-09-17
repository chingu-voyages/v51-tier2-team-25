import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <main className="flex  h-screen">
      <Navbar />
      <div className="flex justify-center w-screen bg-gray-50">
        <Outlet />
      </div>

      <Toaster />
    </main>
  );
}
