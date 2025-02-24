// 📌 Define Type for Location
interface RideLocation {
  label: string; // Used for react-select dropdown
  value: string; // Store place_id (optional)
  lat: number;
  lng: number;
}
