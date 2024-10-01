import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="flex justify-center w-full ">
          <Outlet
            className="w-full"
          />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
