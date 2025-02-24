"use client";

import { useState } from "react";
import Select from "react-select";

// 📌 Define Type for RideLocation
interface RideLocation {
  label: string; // Used for react-select dropdown
  value: string; // Store place_id (optional)
  lat: number;
  lng: number;
}

interface LocationSearchProps {
  label: string;
  onSelectedLocation: (location: RideLocation) => void;
  selectedLocation: RideLocation | null;
}

export default function LocationSearch({
  label,
  onSelectedLocation,
  selectedLocation,
}: LocationSearchProps) {
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<RideLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // ✅ Add loading state
  // 📌 Fetch Suggestions from OpenStreetMap API
  const getSuggestions = async (query: string) => {
    let options: RideLocation[] = [];
    if (query.length < 2) {
      setOptions(options);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (!Array.isArray(data)) {
        setOptions(options);
        setLoading(false); // ✅ Stop loading if no data
        return;
      }

      const locations: RideLocation[] = data.map((item: any) => ({
        label: item.display_name, // Show full address in dropdown
        value: item.place_id || item.display_name, // Unique identifier
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      }));

      options = locations;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      options = [];
    }
    setOptions(options);
    setLoading(false);
  };

  // 📌 Handle RideLocation  Selection
  const handleSelect = (selectedOption: RideLocation | null) => {
    if (selectedOption && selectedOption.value !== "loading") {
      setSearch(selectedOption.label);
      onSelectedLocation(selectedOption);
    }
  };

  return (
    <div className="w-full">
      {/* 📌 React-Select Dropdown */}
      <Select
        value={selectedLocation}
        onInputChange={(newValue) => {
          setSearch(newValue);
          getSuggestions(newValue);
        }}
        onChange={handleSelect}
        options={
          loading
            ? [{ label: "Loading...", value: "loading", lat: 0, lng: 0 }]
            : options
        }
        // ✅ Show "Loading..." in dropdown
        isLoading={loading} // ✅ Show loading spinner
        placeholder={`${label} location`}
        isClearable
        components={{ DropdownIndicator: null }}
        className="w-full"
      />
    </div>
  );
}
