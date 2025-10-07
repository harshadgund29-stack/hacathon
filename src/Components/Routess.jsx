import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import './Rotes.css'

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjkwNjVmNmQ1MDBjMTRkZjBhZTc0ODkwZDg2Zjk2MDkzIiwiaCI6Im11cm11cjY0In0=";

// Get issues from localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];
const issues = users.map(u => u.reportedConditions || []).flat();

// Custom icons
const startIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [42, 42],
  iconAnchor: [16, 32],
});
const endIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [42, 42],
  iconAnchor: [16, 32],
});
const issueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Zoom map to selected route
const RouteZoomer = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) map.fitBounds(coords);
  }, [coords, map]);
  return null;
};

// Check if route passes near any issue
const routeHasIssues = (routeCoords, issueCoords, threshold = 0.002) => {
  return issueCoords.some(
    ([ilat, ilng]) =>
      routeCoords.some(
        ([rlat, rlng]) =>
          Math.abs(rlat - ilat) < threshold && Math.abs(rlng - ilng) < threshold
      )
  );
};

const RouteMap = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const fetchCoords = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${place}&format=json`
    );
    const data = await res.json();
    if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    return null;
  };

  const fetchRoutes = async (start, end) => {
    try {
      const polygons = issues.map(issue => {
        const offset = 0.001;
        const { lat, lng } = issue.location;
        return [
          [lng - offset, lat - offset],
          [lng + offset, lat - offset],
          [lng + offset, lat + offset],
          [lng - offset, lat + offset],
          [lng - offset, lat - offset],
        ];
      });

      const preferences = ["fastest", "shortest"];
      const routePromises = preferences.map(pref =>
        axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            coordinates: [[start[1], start[0]], [end[1], end[0]]],
            preference: pref,
            options: { avoid_polygons: { type: "Polygon", coordinates: polygons } },
          },
          { headers: { Authorization: ORS_API_KEY, "Content-Type": "application/json" } }
        )
      );

      const results = await Promise.all(routePromises);
      const fetchedRoutes = results.map((res, idx) => {
        const route = res.data.features[0];
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
        const summary = route.properties.summary;
        const hasIssue = routeHasIssues(coords, issues.map(i => [i.location.lat, i.location.lng]));
        return {
          id: idx + 1,
          coords,
          distance: (summary.distance / 1000).toFixed(2),
          duration: (summary.duration / 60).toFixed(0),
          hasIssue,
        };
      });

      setRoutes(fetchedRoutes);
      setSelectedRoute(fetchedRoutes[0]);
    } catch (err) {
      console.error("Error fetching routes:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (from && to) {
        const s = await fetchCoords(from);
        const e = await fetchCoords(to);
        console.log(e);
        
        if (s && e) {
          setStartPoint(s);
          setEndPoint(e);
          fetchRoutes(s, e);
        }
      }
    };
    load();
  }, [from, to]);

  return (
    <div id="main" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div id="sidebar" style={{ width: "300px", padding: "15px", overflowY: "auto", background: "#f8f9fa" }}>
        <h3>Available Routes</h3>
        {routes.map(route => (
          <div
            key={route.id}
            onClick={() => setSelectedRoute(route)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              background: selectedRoute?.id === route.id ? "#d9d1f7ff" : "#fff",
              border: selectedRoute?.id === route.id ? "2px solid #1200b8ff" : "1px solid #ccccccff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h4>Route {route.id}</h4>
              <p>Distance: {route.distance} km</p>
              <p>Duration: {route.duration} mins</p>
            </div>
            {route.hasIssue && <span style={{ color: "red", fontWeight: "bold" }}>⚠️</span>}
          </div>
        ))}
      </div>

      {/* Map */}
      <div style={{ flex: 1 }}>
        {startPoint && endPoint && selectedRoute && (
          <MapContainer center={startPoint} zoom={10} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <RouteZoomer coords={selectedRoute.coords} />

            {/* Only selected route */}
            <Polyline
              positions={selectedRoute.coords}
              color="#2320ebff"
              weight={6}
            />

            {/* Start & End */}
            <Marker position={startPoint} icon={startIcon}>
              <Popup>Start: {from}</Popup>
            </Marker>
            <Marker position={endPoint} icon={endIcon}>
              <Popup>Destination: {to}</Popup>
            </Marker>

            {/* Issues */}
            {issues.map((issue, idx) => (
              <React.Fragment key={idx}>
                <Marker position={[issue.location.lat, issue.location.lng]} icon={issueIcon}>
                  <Popup>{issue.issueType} - {issue.severity}</Popup>
                </Marker>
                <Circle
                  center={[issue.location.lat, issue.location.lng]}
                  radius={100}
                  pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.3 }}
                />
              </React.Fragment>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default RouteMap;
