import React, { useState } from "react";
import LocationSearch from "../LocationSearch";
import TypeOfRide from "./TypeOfRide";

const RideBook = () => {
  const [pickupLocation, setPickupLocation] = useState<RideLocation | null>(
    null
  );
  const [destinationLocation, setDestinationLocation] =
    useState<RideLocation | null>(null);
  const [rideType, setRideType] = useState<"single" | "shared">("single");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "upi">(
    "cash"
  );

  return (
    <div
      className={`w-[350px] rounded-xl border shadow-sm flex flex-col gap-6 overflow-y-scroll no-scrollbar items-center p-6 
        transition-all duration-700 ease-in-out `}
    >
      <div className="flex flex-col gap-4 w-full">
        <LocationSearch
          label="Pickup"
          selectedLocation={pickupLocation}
          onSelectedLocation={(location) => setPickupLocation(location)}
        />

        <LocationSearch
          label="Destination"
          selectedLocation={destinationLocation}
          onSelectedLocation={(location) => setDestinationLocation(location)}
        />
      </div>
      {
        <>
          <div className="w-full">
            <TypeOfRide />
          </div>
          {/* Ride Selection */}
          <div className="w-full">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Select Ride Type
            </h3>
            <div className="flex gap-3">
              <button
                className={`flex-1 p-3 rounded-lg font-medium border border-gray-300 transition-all
                  ${
                    rideType === "single"
                      ? "border-[#e45200] text-[#e45200] shadow-sm"
                      : "hover:border-gray-400 text-gray-400 opacity-90"
                  }`}
                onClick={() => setRideType("single")}
              >
                Myself
              </button>
              <button
                className={`flex-1 p-3 rounded-lg font-medium border border-gray-300 transition-all
                  ${
                    rideType === "shared"
                      ? "border-[#e45200] text-[#e45200] shadow-sm"
                      : "hover:border-gray-400 text-gray-400 opacity-90"
                  }`}
                onClick={() => setRideType("shared")}
              >
                Shared Ride
              </button>
            </div>
          </div>

          {/* 📌 Payment Method Selection (Razorpay Style) */}
          <div className="w-full">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Payment Method
            </h3>
            <div className="flex gap-3">
              <button
                className={`flex-1 p-3 rounded-lg text-sm font-medium border border-gray-300 transition-all flex items-center justify-center gap-2
                  ${
                    paymentMethod === "cash"
                      ? "border-[#e45200] text-[#e45200] shadow-sm"
                      : "hover:border-gray-400"
                  }`}
                onClick={() => setPaymentMethod("cash")}
              >
                <span>💰</span> Cash
              </button>
              <button
                className={`flex-1 p-3 rounded-lg text-sm font-medium border border-gray-300 transition-all flex items-center justify-center gap-2
                  ${
                    paymentMethod === "card"
                      ? "border-[#e45200] text-[#e45200] shadow-sm"
                      : "hover:border-gray-400"
                  }`}
                onClick={() => setPaymentMethod("card")}
              >
                <span>💳</span> Card
              </button>
              <button
                className={`flex-1 p-3 rounded-lg text-sm font-medium border border-gray-300 transition-all flex items-center justify-center gap-2
                  ${
                    paymentMethod === "upi"
                      ? "border-[#e45200] text-[#e45200] shadow-sm"
                      : "hover:border-gray-400"
                  }`}
                onClick={() => setPaymentMethod("upi")}
              >
                <span>📲</span> UPI
              </button>
            </div>
          </div>

          {/* 📌 Confirm Booking Button */}
          <button className="w-full border border-[#e45200] text-[#e45200] font-semibold py-3 rounded-lg mt-4 transition-all duration-300 hover:bg-[#e45200] hover:text-white">
            ✅ Confirm Booking
          </button>
        </>
      }
    </div>
  );
};

export default RideBook;
