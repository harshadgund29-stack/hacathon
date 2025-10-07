import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup, Circle } from "react-leaflet";
import L from "leaflet";

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const issueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);
  return null;
};

const Defaultloc = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [recenterPos, setRecenterPos] = useState(null);
  //console.log(currentLocation);
  // localStorage.setItem("current_location", JSON.stringify(currentLocation));
  
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const reportedConditions = users
    .map((user) => user.reportedConditions || [])
    .flat();

  // Get current location once on load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = [pos.coords.latitude, pos.coords.longitude];
          setCurrentLocation(loc);
          // console.log(loc);
          
          localStorage.setItem("current_location", JSON.stringify(loc));
        },
        (err) =>{ localStorage.setItem("current_location", JSON.stringify([19.1, 72.8777])),console.error("GPS error:", err),setCurrentLocation([19.1, 72.8777]),
        { enableHighAccuracy: true }}
      );
    }
  }, []);

  // Handle map drag to show recenter button
  const MapEventHandler = () => {
    const map = useMap();
    useEffect(() => {
      const onDrag = () => setRecenterPos(null); // show button again
      map.on("dragstart", onDrag);
      return () => map.off("dragstart", onDrag);
    }, [map]);
    return null;
  };

  return (
    <div className="pb-3" style={{ position: "relative" }}>
        <h3 className="text-center">Live Map - Click on Markers for Details</h3>
      <MapContainer
        center={[19.076, 72.8777]}
        zoom={10}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEventHandler />

        {/* Current Location Marker */}
        {currentLocation && (
          <Marker position={currentLocation} icon={greenIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Recenter map instantly when button clicked */}
        {recenterPos && <RecenterMap position={recenterPos} />}

        {/* Reported Conditions */}
        {reportedConditions.map((condition, i) => (
          <React.Fragment key={i}>
            <Marker
              position={[condition.location.lat, condition.location.lng]}
              icon={issueIcon}
            >
              <Popup>
                <b>{condition.issueType}</b>
                <br />
                Severity: {condition.severity}
                <br />
                {condition.description}
                <br />
                Location: {condition.locationName}
              </Popup>
            </Marker>
            <Circle
              center={[condition.location.lat, condition.location.lng]}
              radius={
                condition.severity === "High"
                  ? 500
                  : condition.severity === "Medium"
                  ? 300
                  : 100
              }
              pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.3 }}
            />
          </React.Fragment>
        ))}
      </MapContainer>

      {/* Button to recenter instantly */}
      {currentLocation && !recenterPos && (
        <button
        type="button"
          onClick={() => setRecenterPos(currentLocation)}
          style={{
            position: "absolute",
            top: 70,
            right: 10,
            padding: "8px 12px",
            background: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            zIndex:1000
          }}

        >
          Go to My Location
        </button>
      )}
    </div>
  );
};

export default Defaultloc;
