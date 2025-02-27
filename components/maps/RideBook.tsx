import React, { useState } from "react";
import TypeOfRide from "./TypeOfRide";
import toast, { Toaster } from "react-hot-toast";
import AutoCompleteLocation from "../AutoCompleteLocation";
import DriverAssigned from "../DriverAssigned";
const RideBook = ({
  setPickupLocation,
  setDestinationLocation,
  pickupLocation,
  destinationLocation,
}: {
  setDestinationLocation: (input: google.maps.LatLngLiteral | null) => void;
  setPickupLocation: (input: google.maps.LatLngLiteral | null) => void;
  destinationLocation: google.maps.LatLngLiteral | null;
  pickupLocation: google.maps.LatLngLiteral | null;
}) => {
  const [rideType, setRideType] = useState<"single" | "shared">("single");
  const [fare, setFare] = useState<number>(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // 📌 Create Order ID
  const createOrderId = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: fare }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order!");
      return null;
    }
  };

  // 📌 Process Razorpay Payment
  const processPayment = async () => {
    setPaymentLoading(true);

    const orderId = await createOrderId();
    if (!orderId) {
      setPaymentLoading(false);
      return;
    }

    const options = {
      key: process.env.RAZORPAY_KEY_ID!,
      amount: fare * 100,
      currency: "INR",
      name: "CarBuk Rides",
      description: "Ride Payment",
      order_id: orderId,
      handler: async function (response: any) {
        const verifyResponse = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });

        const res = await verifyResponse.json();

        if (res.isOk) {
          toast.success("Payment Successful! 🚀");
          setPaymentSuccess(true);
        } else {
          toast.error("Payment Failed!");
        }

        setPaymentLoading(false);
      },
      prefill: {
        name: "Test User. Enter Test Razorpay Card only",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: "#FEC400" },
    };
    const paymentObject = new (window as any).Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", () => {
      toast.error("Payment Failed! Try again.");
      setPaymentLoading(false);
    });
  };
  const [booked, setBooked] = useState<boolean>(false);
  return (
    <>
      {booked ? (
        <DriverAssigned />
      ) : (
        <div
          className={`w-[350px] rounded-xl border shadow-sm flex flex-col gap-6 overflow-y-scroll no-scrollbar items-center p-6 
        transition-all duration-700 ease-in-out ${
          pickupLocation && destinationLocation ? "h-full" : "h-fit"
        }`}
        >
          <Toaster position="top-center" />
          <div className="flex flex-col gap-4 w-full">
            <AutoCompleteLocation
              label="Enter Pickup location"
              onLocationSelect={setPickupLocation}
              setLocationToNull={() => setPickupLocation(null)}
            />
            <AutoCompleteLocation
              label="Enter Destination location"
              onLocationSelect={setDestinationLocation}
              setLocationToNull={() => setDestinationLocation(null)}
            />
          </div>
          {pickupLocation && destinationLocation && (
            <>
              <div className="w-full">
                <TypeOfRide
                  onSelectFare={(fare: number) => setFare(fare)}
                  rideType={rideType}
                />
              </div>
              {/* Ride Selection */}
              <div className="w-full">
                <h3 className="text-gray-700 text-sm font-semibold mb-2">
                  Select Ride Type
                </h3>
                <div className="flex gap-3">
                  <button
                    className={`flex-1 p-3 rounded-lg font-medium border  transition-all
                  ${
                    rideType === "single"
                      ? "border-[#e45200] text-[#e45200] shadow-sm"
                      : "border-gray-400 text-gray-400 opacity-90"
                  }`}
                    onClick={() => setRideType("single")}
                  >
                    Myself
                  </button>
                  <button
                    className={`flex-1 p-3 rounded-lg font-medium border transition-all
                  ${
                    rideType === "shared"
                      ? "border-[#e45200] text-[#e45200] shadow-sm"
                      : "border-gray-400 text-gray-400 opacity-90"
                  }`}
                    onClick={() => setRideType("shared")}
                  >
                    Shared Ride
                  </button>
                </div>
              </div>

              {/* 📌 Payment Method Selection (Razorpay Style) */}
              <div className="flex justify-center mt-4">
                {paymentSuccess ? (
                  <button
                    className="w-full p-3 rounded-lg text-white font-medium bg-[#e45200] hover:bg-[#c44100] transition-all flex items-center justify-center gap-2 shadow-md "
                    disabled
                  >
                    Payment Successful
                  </button>
                ) : (
                  <button
                    className="w-full p-3 rounded-lg text-white font-medium bg-[#e45200] hover:bg-[#c44100] transition-all flex items-center justify-center gap-2 shadow-md"
                    onClick={() => processPayment()} // Call the payment function
                    disabled={paymentLoading}
                  >
                    <span>💳</span>
                    {paymentLoading ? "Processing...." : `Pay ${fare}`}{" "}
                    <span className="ml-2">→</span>
                  </button>
                )}
              </div>

              {/* 📌 Confirm Booking Button */}
              <button
                className="w-full border border-[#e45200] text-[#e45200] font-semibold py-3 rounded-lg mt-4 transition-all duration-300 hover:bg-[#e45200] hover:text-white"
                onClick={() => setBooked(true)}
                disabled={!paymentSuccess}
              >
                Confirm Booking
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default RideBook;
