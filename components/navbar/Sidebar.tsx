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
} from "react-icons/fa";
import SideItem from "./SideItem";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Logged out successfully!");
    router.push("/login");
  };
  return (
    <>
      <Toaster position="top-center" />
      <div
        className={`h-screen flex ${
          isOpen ? "w-[18%]" : "w-[5%]"
        } transition-all duration-500 bg-[#006B60]`}
      >
        {/* Sidebar Container */}
        <div className={`h-full flex flex-col justify-evenly w-[90%] mx-auto`}>
          {/* Menu Toggle Button */}
          <div className={`h-[10%] flex  ${!isOpen ? "justify-center" : ""}`}>
            <button
              className="text-white p-3 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Sidebar Items */}
          <div className="h-[60%] flex flex-col items-center space-y-6 w-full">
            <SideItem
              icon={<FaHistory size={20} />}
              text="Ride History"
              isOpen={isOpen}
            />
            <SideItem
              icon={<FaCreditCard size={20} />}
              text="Payment Details"
              isOpen={isOpen}
            />
            <SideItem
              icon={<FaCommentAlt size={20} />}
              text="Feedback"
              isOpen={isOpen}
            />

            <SideItem
              icon={<FaMapMarkerAlt size={20} />}
              text="My Locations"
              isOpen={isOpen}
            />
          </div>
          <div className="h-[10%] w-full">
            <SideItem
              icon={<FaUser size={20} />}
              text="Profile"
              isOpen={isOpen}
            />
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
