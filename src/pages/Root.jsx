import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import Banner from "../components/Banner.jsx";
import Footer from "./Footer.jsx";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row tracking-wide">
      <Navbar />
      <main className="relative flex-grow flex flex-col bg-blue-background">
        <div className="absolute w-full">
         <Banner />
        </div>
        <div className="flex-grow flex justify-center w-full ">
          <Outlet
            className="w-full"
          />
        </div>
        <Footer />
      </main>
      <Toaster />
    </div>
  );
}
