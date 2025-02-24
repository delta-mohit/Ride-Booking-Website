"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 28.6139, lng: 77.209 }; // Default center (New Delhi)

const GoogleMapsComponent = ({
  pickupLocation,
  destinationLocation,
}: {
  destinationLocation: google.maps.LatLngLiteral | null;
  pickupLocation: google.maps.LatLngLiteral | null;
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [travelTime, setTravelTime] = useState<string | null>(null);

  // 🔹 Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const directionsCallback = (
    response: google.maps.DirectionsResult | null,
    status?: google.maps.DirectionsStatus
  ) => {
    if (response && status === google.maps.DirectionsStatus.OK) {
      setDirections(response);
      setTravelTime(response.routes[0].legs[0]?.duration?.text ?? "N/A");
    } else {
      console.error("Directions request failed with status:", status);
    }
  };

  // 🔹 Reset directions when locations change
  useEffect(() => {
    if (!pickupLocation || !destinationLocation) {
      setDirections(null);
      setTravelTime(null);
      setTimeout(() => {
        setDirections(null);
        setTravelTime(null);
      }, 100);
    }
  }, [pickupLocation, destinationLocation]);

  if (!isLoaded) {
    return <p className="text-center text-gray-500">Loading Google Maps...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickupLocation || defaultCenter}
      zoom={10}
      onLoad={(map) => setMap(map)}
    >
      {pickupLocation && <Marker position={pickupLocation} />}
      {destinationLocation && <Marker position={destinationLocation} />}

      {/* 🔹 Show route only when both locations are selected */}
      {pickupLocation && destinationLocation && (
        <DirectionsService
          options={{
            destination: destinationLocation,
            origin: pickupLocation,
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={(response, status) => directionsCallback(response, status)}
        />
      )}

      {directions && <DirectionsRenderer options={{ directions }} />}
    </GoogleMap>
  );
};

export default GoogleMapsComponent;
