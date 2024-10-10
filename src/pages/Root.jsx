import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer.jsx";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row tracking-wide">
      <Navbar />
      <main className="flex-grow flex flex-col bg-blue-background">
        <div className="flex flex-grow justify-center w-full ">
          <Outlet className="w-full" />
        </div>
        <Footer />
      </main>
      <Toaster />
    </div>
  );
}
