"use client";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import logOut from "@/lib/logOut";
import { RiRidingFill } from "react-icons/ri";
import { BsChatDotsFill } from "react-icons/bs";
import { PiChatTextFill } from "react-icons/pi";

const links = [
  {
    href: "/features/book-ride",
    label: "Book Ride",
    icon: <RiRidingFill size={24} />,
  },
  {
    href: "/features/chat",
    label: "Chat with Driver",
    icon: <BsChatDotsFill size={20} />,
  },
  {
    href: "/features/feedback",
    label: "Feedback",
    icon: <PiChatTextFill size={24} />,
  },
  {
    href: "/features/ride-history",
    label: "Ride History",
    icon: <FaHistory size={20} />,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    toast.promise(
      async () => {
        await logOut();
        router.push("/login");
      },
      {
        loading: "Logging out...",
        success: "Logged out successfully!",
        error: "Error when log out",
      }
    );
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* Navbar for Smaller Screens */}
      <div className="z-10 fixed top-1 left-1 rounded-lg lg:hidden  h-10 w-10  bg-orange-600 text-white">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="focus:outline-none p-2"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Small Sidebar for Mobile */}
      <div
        className={`z-50 fixed top-0 left-0 h-[100%] w-[50%] sm:w-[30%] bg-[#e45200] text-white shadow-lg  p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={() => setIsOpen(false)} className="text-white">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-6 space-y-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-3 px-2 py-4 text-sm hover:bg-orange-500 rounded-md"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Profile Button */}
          <Link
            href="/features/profile"
            className="flex items-center gap-3 px-3 py-4 text-sm hover:bg-orange-500 rounded-md"
          >
            <FaUser size={22} />
            <span>Profile</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-red-600 w-full text-sm"
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Background overlay (click to close sidebar) */}
      {isOpen && (
        <div
          className="z-10 fixed top-0 left-0 w-full h-full bg-black opacity-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
