"use client";

import Image from "next/image";
import { useState } from "react";

const rideOptions = [
  {
    category: "Economy",
    rides: [
      {
        name: "Mini Car",
        price: 120,
        time: "10 min",
        icon: "/economy-car1.png",
      },
      {
        name: "Auto",
        price: 80,
        time: "5 min",
        icon: "/economy-auto.png",
      },
    ],
  },
  {
    category: "Premium",
    rides: [
      {
        name: "Sedan",
        price: 250,
        time: "12 min",
        icon: "/premium-car.png",
      },
    ],
  },
];

export default function TypeOfRide({
  onSelectFare,
}: {
  onSelectFare: (fare: number) => void;
}) {
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  return (
    <div className="w-full border rounded-xl shadow-lg p-4 ">
      <h2 className="text-lg font-semibold text-[#e45200] text-center pb-2">
        Choose Your Ride
      </h2>

      {rideOptions.map((section) => (
        <div key={section.category} className="pb-4">
          <h3 className="text-gray-600 text-sm font-medium">
            {section.category}
          </h3>
          <div className="flex flex-col gap-3 mt-2">
            {section.rides.map((ride) => (
              <div
                key={ride.name}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition border-2 ${
                  selectedRide === ride.name
                    ? "border-[#e45200] bg-orange-100 shadow-md scale-105 shadow-orange-400/30"
                    : "border-gray-300 hover:border-[#e45200] hover:shadow-lg hover:scale-105 transition-all duration-300"
                }`}
                onClick={() => {
                  setSelectedRide(ride.name);
                  onSelectFare(ride.price);
                }}
              >
                {/* Vehicle Icon */}
                <div className="flex items-center gap-3">
                  <Image
                    src={ride.icon}
                    alt={ride.name}
                    width={50}
                    height={50}
                  />
                  <div>
                    <h4 className="text-black font-medium">{ride.name}</h4>
                    <p className="text-gray-500 text-xs">{ride.time} away</p>
                  </div>
                </div>

                {/* Estimated Fare */}
                <span className="text-green-600 font-semibold">
                  ₹{ride.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
