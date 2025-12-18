export default function Input({ location, onLocationChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search from location..."
        value={location}
        onChange={onLocationChange}
      />
    </div>
  );
}
