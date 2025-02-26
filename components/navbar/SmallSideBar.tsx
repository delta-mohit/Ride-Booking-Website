"use client";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHistory,
  FaCreditCard,
  FaCommentAlt,
  FaUser,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import logOut from "@/lib/logOut";

export const links = [
  {
    href: "/features/book-ride",
    label: "Book Ride",
    icon: <FaCreditCard size={20} />,
  },
  {
    href: "/features/chat",
    label: "Chat with Driver",
    icon: <FaMapMarkerAlt size={20} />,
  },
  {
    href: "/features/feedback",
    label: "Feedback",
    icon: <FaCommentAlt size={20} />,
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
    await logOut();
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* Navbar for Smaller Screens */}
      <div className="fixed top-1 left-1 rounded-lg lg:hidden  h-10 w-10  bg-orange-600 text-white">
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
        className={`z-10 fixed top-0 left-0 h-[100%] w-[50%] bg-orange-700 text-white shadow-lg  p-4 transition-transform duration-300 ${
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
            <FaUser size={20} />
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
          className=" fixed top-0 left-0 w-full h-full bg-black opacity-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
