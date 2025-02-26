"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { RideFeedbackData } from "@/utils/staticData";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
type Ride = {
  id: number;
  driver: string;
  date: string;
  vehicle: string;
  image: string;
  feedback: { rating: number; comment: string } | null;
  pickup: string;
  destination: string;
  fare: string;
};

export default function FeedbackSystem() {
  const [rides, setRides] = useState<Ride[]>(RideFeedbackData);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const submitFeedback = () => {
    if (!selectedRide) return;
    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.id === selectedRide.id
          ? { ...ride, feedback: { rating, comment: feedback } }
          : ride
      )
    );
    setSelectedRide(null);
    setFeedback("");
    setRating(0);
  };

  return (
    <div className="max-w-2xl h-screen mx-auto p-4 flex flex-col justify-between">
      <h2 className="text-2xl font-semibold text-center">Ride Feedback</h2>
      <div className="space-y-4 h-[90%]  overflow-y-scroll no-scrollbar">
        {rides.map((ride) => (
          <div key={ride.id} className="p-5 bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-between">
              {/* 🔹 Driver Info */}
              <div className="flex items-center gap-4">
                <div className="h-7 w-7 rounded-full">
                  <Image
                    src={ride.image}
                    alt={ride.driver}
                    width={45}
                    height={45}
                    className="rounded-full w-full h-full object-cover border"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{ride.driver}</h3>
                  <div className="flex">
                    <p className="text-sm text-gray-500">
                      {ride.date} - {ride.vehicle}
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-4 text-nowrap">
                    <span>{ride.pickup}</span>{" "}
                    <span>
                      <FaRegArrowAltCircleRight className="translate-y-[1px] text-[#e45200]" />
                    </span>{" "}
                    <span>{ride.destination}</span>
                  </div>
                </div>
              </div>

              {/* 🔹 Ride Fare */}
              <div className="text-sm text-gray-600 font-semibold">
                <p className="text-[#e45200]">{ride.fare}</p>
              </div>
            </div>

            {/* 🔹 Feedback Section */}
            {ride.feedback ? (
              <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <div className="flex gap-1 text-[#e45200]">
                  {[...Array(ride.feedback.rating)].map((_, i) => (
                    <FaStar key={i} size={16} className="text-[#e45200]" />
                  ))}
                </div>
                <p className="text-sm mt-1">{ride.feedback.comment}</p>
              </div>
            ) : (
              <Button
                className="mt-4 bg-white text-[#e45200] border border-[#e45200] hover:bg-orange-100"
                onClick={() => setSelectedRide(ride)}
              >
                Give Feedback
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Feedback Modal */}
      <Dialog open={!!selectedRide} onOpenChange={() => setSelectedRide(null)}>
        <DialogContent className="p-5 rounded-lg">
          <DialogHeader className="text-lg font-semibold">
            Give Feedback
          </DialogHeader>
          <div className="flex gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="cursor-pointer"
                onClick={() => setRating(i + 1)}
              >
                {i < rating ? (
                  <FaStar size={24} fill="#e45200" />
                ) : (
                  <CiStar size={24} className="text-[#e45200]" />
                )}
              </span>
            ))}
          </div>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback..."
          />
          <Button
            className="bg-[#e45200] text-white w-full"
            onClick={submitFeedback}
          >
            Submit Feedback
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
