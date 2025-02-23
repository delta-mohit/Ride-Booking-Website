"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 📌 GoMaps.pro API Base URL
const BASE_URL = "https://maps.gomaps.pro/maps/api";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// 📌 Default Location (New Delhi, India)
const defaultCenter: [number, number] = [22.3157, 87.309];

// 📌 Decode Google's Encoded Polyline (Works for GoMaps too)
const decodePolyline = (encoded: string): { lat: number; lng: number }[] => {
  let points: { lat: number; lng: number }[] = [];
  let index = 0,
    lat = 0,
    lng = 0;

  while (index < encoded.length) {
    let shift = 0,
      result = 0,
      byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return points;
};

const customIcon = new L.Icon({
  iconUrl: "/pinpoint.svg", // Place a marker icon in the public folder
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapsTest({
  pickup,
  destination,
}: {
  pickup: string;
  destination: string;
}) {
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null
  );
  const [destinationCoords, setDestinationCoords] = useState<
    [number, number] | null
  >(null);
  const [routePath, setRoutePath] = useState<{ lat: number; lng: number }[]>(
    []
  );

  // 📌 Fetch Coordinates from GoMaps.pro Geocoding API
  const getCoordinates = async (
    address: string
  ): Promise<[number, number] | null> => {
    try {
      console.log(`Fetching coordinates for: ${address}`);
      const response = await fetch(
        `${BASE_URL}/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        console.log(`Coordinates for ${address}:`, [
          location.lat,
          location.lng,
        ]);
        return [location.lat, location.lng]; // ✅ Ensure [lat, lng] format
      } else {
        console.error("Geocoding API Error:", data.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  // 📌 Fetch Route from GoMaps.pro Directions API
  const getRoute = async () => {
    if (!pickup || !destination) return alert("Enter both locations");

    const pickupLocation = await getCoordinates(pickup);
    const destinationLocation = await getCoordinates(destination);

    if (!pickupLocation || !destinationLocation) {
      return alert("Could not find locations");
    }

    setPickupCoords(pickupLocation);
    setDestinationCoords(destinationLocation);

    try {
      console.log(`Fetching route from ${pickup} to ${destination}`);
      const response = await fetch(
        `${BASE_URL}/directions/json?origin=${pickup}&destination=${destination}&mode=driving&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const polyline = data.routes[0].overview_polyline.points;
        const decodedPath = decodePolyline(polyline);

        console.log("Decoded Route Path:", decodedPath);
        setRoutePath(decodedPath);
      } else {
        console.error("Directions API Error:", data.status);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // 📌 Run `getRoute()` when pickup/destination changes
  useEffect(() => {
    if (pickup && destination) {
      alert("API Call Ho jayega!!");
      // getRoute();
    }
  }, [pickup, destination]);

  return (
    <div className="h-full w-full ">
      {/* 📌 Map Container */}
      <MapContainer
        center={pickupCoords || defaultCenter}
        zoom={12}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📌 Pickup & Destination Markers */}
        {pickupCoords && (
          <Marker position={pickupCoords} icon={customIcon}>
            <Popup>📍 Pickup Location</Popup>
          </Marker>
        )}
        {destinationCoords && (
          <Marker position={destinationCoords} icon={customIcon}>
            <Popup>📍 Destination</Popup>
          </Marker>
        )}

        {/* 📌 Route Path */}
        {routePath.length > 0 && (
          <Polyline positions={routePath} color="blue" />
        )}
      </MapContainer>
    </div>
  );
}
