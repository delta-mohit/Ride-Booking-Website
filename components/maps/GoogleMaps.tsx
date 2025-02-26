"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useCallback,
} from "react";
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
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // 🔹 Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: useMemo(() => ["places"], []), // Prevent unnecessary reloading
  });

  // 🔹 Reset directions when locations change
  useEffect(() => {
    if (!pickupLocation || !destinationLocation) {
      setDirections(null);
      setTimeout(() => {
        setDirections(null);
      }, 100);
    }
  }, [pickupLocation, destinationLocation]);

  const directionOptions = useMemo(() => {
    if (!pickupLocation || !destinationLocation) return null;
    return {
      origin: pickupLocation,
      destination: destinationLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  }, [pickupLocation, destinationLocation]);

  const directionsCallback = useCallback(
    (
      response: google.maps.DirectionsResult | null,
      status?: google.maps.DirectionsStatus
    ) => {
      if (response && status === google.maps.DirectionsStatus.OK) {
        setDirections(response);
      } else {
        console.error("Directions request failed with status:", status);
      }
    },
    [] // Empty dependency array ensures function reference remains stable
  );
  if (!isLoaded) {
    return <p className="text-center text-gray-500">Loading Google Maps...</p>;
  }
  return (
    <>
      {console.log("Google Maps re-render") as ReactNode}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pickupLocation || defaultCenter}
        zoom={10}
      >
        {pickupLocation && <Marker position={pickupLocation} />}
        {destinationLocation && <Marker position={destinationLocation} />}

        {/* 🔹 Show route only when both locations are selected */}
        {directionOptions && (
          <DirectionsService
            options={directionOptions}
            callback={directionsCallback}
          />
        )}

        {directions && <DirectionsRenderer options={{ directions }} />}
      </GoogleMap>
    </>
  );
};

export default GoogleMapsComponent;
