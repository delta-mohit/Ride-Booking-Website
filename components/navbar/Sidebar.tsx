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
import SideItem from "./SideItem";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import logOut from "@/lib/logOut";

const links = [
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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    toast.promise(
      async () => {
        await logOut();
      },
      {
        loading: "Logging out...",
        success: "Logged out successfully!",
        error: "Error when log out",
      }
    );
    router.push("/login");
  };
  return (
    <>
      <Toaster position="top-center" />
      <div
        className={`h-screen flex ${
          isOpen ? "w-[18%]" : "w-[5%]"
        } transition-all duration-500 bg-[#e45200] hidden lg:block`}
      >
        {/* Sidebar Container */}
        <div className={`h-full flex flex-col justify-evenly w-[90%] mx-auto`}>
          {/* Menu Toggle Button */}
          <div className={`h-fit flex  ${!isOpen ? "justify-center" : ""}`}>
            <button
              className="text-white p-3 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Sidebar Items */}
          <div className="h-[60%] flex flex-col items-center space-y-6 w-[85%] mx-auto ">
            {links.map((link, index) => (
              <SideItem
                key={index}
                href={link.href}
                icon={link.icon}
                text={link.label}
                isOpen={isOpen}
              />
            ))}
          </div>
          <div className="h-fit w-3/4 mx-auto">
            <SideItem
              href={"/features/profile"}
              icon={<FaUser size={20} />}
              text="Profile"
              isOpen={isOpen}
            />
            <button
              onClick={handleLogout}
              className={`flex items-center  space-x-5 w-full py-3 ${
                isOpen ? "px-4 " : "justify-center"
              } bg-[#e45200] rounded-md transition-all text-white`}
            >
              <FaSignOutAlt size={20} />
              {isOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
