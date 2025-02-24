// 📌 Fetch Location Suggestions from OpenStreetMap
const NOMINATIM_URL = "https://nominatim.openstreetmap.org";

const getLocationSuggestion = async (query: string) => {
  if (query.length < 2) {
    return;
  }

  try {
    const response = await fetch(
      `${NOMINATIM_URL}/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
  }
};

export default getLocationSuggestion;
