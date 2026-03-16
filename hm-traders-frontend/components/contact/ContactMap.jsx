export default function ContactMap() {
  return (
    <div className="mapContainer">
      <iframe
        src="https://maps.google.com/maps?q=22.5792625,88.349173&z=17&output=embed"
        width="100%"
        height="490px"
        style={{ border: 0 }}
        loading="lazy"
      />
    </div>
  );
}