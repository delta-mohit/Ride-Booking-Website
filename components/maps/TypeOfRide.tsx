"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  SharedRidePricingData,
  SingleRidePricingData,
} from "@/utils/staticData";

export default function TypeOfRide({
  onSelectFare,
  rideType,
}: {
  onSelectFare: (fare: number) => void;
  rideType: string;
}) {
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    setIndex(Math.floor(Math.random() * SingleRidePricingData.length));
  }, []); // Runs only once on client-side

  useEffect(() => {
    //as the ride type change then payment need to change
    const data =
      rideType === "single"
        ? SingleRidePricingData[index]
        : SharedRidePricingData[index];
    let newFare = data
      .flatMap((category) => category.rides)
      .find((ride) => ride.name === selectedRide)?.price;
    if (newFare == undefined) newFare = 0;
    onSelectFare(newFare as number);
  }, [rideType]);

  return (
    <div className="w-full border rounded-xl shadow-lg p-4 ">
      <h2 className="text-lg font-semibold text-[#e45200] text-center pb-2">
        Choose Your Ride
      </h2>

      {(rideType == "single"
        ? SingleRidePricingData[index]
        : SharedRidePricingData[index]
      ).map((section) => (
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
