"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

// ✅ Custom Marker Icon (Fixes Leaflet missing default marker issue)
const customIcon = new L.Icon({
  iconUrl: "/pinpoint.svg", // Place a marker icon in the public folder
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const SimpleMap = () => {
  const [markerPosition, setMarkerPosition] =
    useState<L.LatLngExpression | null>([22.34601, 87.231972]);

  return (
    <MapContainer
      center={markerPosition as L.LatLngExpression}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {/* Tile Layer - OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ✅ Marker to pinpoint the location */}
      {markerPosition && (
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>📍 Pickup Location</Popup>
        </Marker>
      )}
      <RouteLayer
        pickup={[22.34601, 87.231972]}
        destination={[22.3248, 87.315]}
      />
    </MapContainer>
  );
};

export default SimpleMap;

// 📌 Route Layer to Draw Path Between Pickup & Destination
const RouteLayer = ({
  pickup,
  destination,
}: {
  pickup: L.LatLngExpression;
  destination: L.LatLngExpression;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!pickup || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(pickup), L.latLng(destination)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "#FEC400", weight: 5 }],
      },
      createMarker: () => null, // Prevents extra default markers
    }).addTo(map);

    //Hiding undesired element
    const routingContainer = document.querySelector(
      ".leaflet-routing-container"
    );
    if (routingContainer) {
      routingContainer.remove();
    }

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    }; // Cleanup on unmount
  }, [pickup, destination, map]);

  return null;
};
