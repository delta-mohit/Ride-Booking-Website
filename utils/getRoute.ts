const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const getRoute = async (
  origin: string,
  destination: string,
  waypoints?: string[]
) => {
  try {
    // 📌 Base URL
    const BASE_URL = "https://maps.gomaps.pro/maps/api/directions/json";

    // 📌 Construct waypoints query string
    const waypointsParam = waypoints ? `&waypoints=${waypoints.join("|")}` : "";

    // 📌 Construct request URL
    const url = `${BASE_URL}?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(
      destination
    )}&mode=driving&units=metric&language=en&region=en${waypointsParam}&key=${GOOGLE_MAPS_API_KEY}`;

    // 📌 Make the API Request
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Error: ${data.status}`);
    }

    return data.routes[0]; // ✅ Returns the first route
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
