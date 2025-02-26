"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

interface LocationSearchProps {
  label: string;
  onLocationSelect: (location: google.maps.LatLngLiteral) => void;
  setLocationToNull: () => void;
}

const AutoCompleteLocation: React.FC<LocationSearchProps> = ({
  label,
  onLocationSelect,
  setLocationToNull,
}) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // 🔹 Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: useMemo(() => ["places"], []), // Prevent unnecessary reloading
  });

  // 📌 Stable reference for onLoad function
  const onLoad = useCallback(
    (autocompleteInstance: google.maps.places.Autocomplete) => {
      setAutocomplete(autocompleteInstance);
    },
    []
  );

  // 📌 Stable reference for onPlaceChanged function
  const onPlaceChanged = useCallback(() => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (place.geometry?.location) {
      onLocationSelect({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  }, [autocomplete, onLocationSelect]);

  // 📌 Handle input change efficiently
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setLocationToNull(); // 🔹 Reset location when input is cleared
      }
    },
    [setLocationToNull]
  );

  if (!isLoaded) {
    return (
      <p className="text-center text-gray-500">Loading location search...</p>
    );
  }

  return (
    <>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder={label}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </Autocomplete>
    </>
  );
};

export default React.memo(AutoCompleteLocation); // Memoize component to prevent unnecessary re-renders
