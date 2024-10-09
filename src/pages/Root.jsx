import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer.jsx";

export default function RootLayout() {
  return (
    <div className="flex flex-col h-screen md:flex-row">
      <Navbar />
      <main className="flex-grow bg-blue-background">
        <div className="flex justify-center w-full ">
          <Outlet
            className="w-full"
          />
        </div>
        <Footer/>
      </main>
      <Toaster />
    </div>
  );
}
