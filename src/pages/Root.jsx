import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <main className="flex h-screen">
      <Navbar />
      <div className="flex flex-grow bg-gray-50">
        <div className="flex justify-center w-full ">
          <Outlet
            className="w-full"
          />
        </div>
      </div>
      

      <Toaster />
    </main>
  );
}
