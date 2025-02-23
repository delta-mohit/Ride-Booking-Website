"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 📌 GoMaps.pro Base URL
const BASE_URL = "https://maps.gomaps.pro/maps/api";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// 📌 Map Style
const containerStyle = {
  height: "100%",
  width: "100%",
};

// 📌 Default Location
const defaultCenter: [number, number] = [28.6139, 77.209];

export default function GoMapsComponent({
  pickup,
  destination,
}: {
  pickup: any;
  destination: any;
}) {
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null
  );
  const [destinationCoords, setDestinationCoords] = useState<
    [number, number] | null
  >(null);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);

  // 📌 Fetch Coordinates from GoMaps.pro Geocoding API
  const getCoordinates = async (address: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        return [location.lat, location.lng];
      } else {
        console.error("Geocoding Error:", data.status);
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

    if (!pickupLocation || !destinationLocation)
      return alert("Could not find locations");

    setPickupCoords(pickupLocation as [number, number]);
    setDestinationCoords(destinationLocation as [number, number]);

    try {
      const response = await fetch(
        `${BASE_URL}/directions/json?origin=${pickup}&destination=${destination}&mode=driving&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const polyline = data.routes[0].overview_polyline.points;
        setRoutePath(decodePolyline(polyline) as [number, number][]); // Decode polyline to coordinates
      } else {
        console.error("Directions API Error:", data.status);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 h-full w-full">
      {/* 📌 Map Container */}
      <MapContainer center={defaultCenter} zoom={12} style={containerStyle}>
        {/* 📌 Use GoMaps.pro Tile Server */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📌 Pickup & Destination Markers */}
        {pickupCoords && <Marker position={pickupCoords} />}
        {destinationCoords && <Marker position={destinationCoords} />}

        {/* 📌 Route Path */}
        {routePath.length > 0 && (
          <Polyline positions={routePath} color="blue" />
        )}
      </MapContainer>
      {routePath.length > 0 && <Polyline positions={routePath} color="blue" />}
    </div>
  );
}

// 📌 Decode Google's Encoded Polyline (Works for GoMaps too)
const decodePolyline = (encoded: string) => {
  let points = [];
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

    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
};
