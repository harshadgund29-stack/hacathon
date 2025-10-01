import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'



const defaultUsers = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    password: "password123",
    reportedConditions: [
      {
        issueType: "Flood",
        location: { lat: 19.076, lng: 72.8777 }, // Mumbai
        severity: "High",
        description: "Water level rising near main road.",
        locationName: "Mumbai, India"
      },
      {
        issueType: "Road Block",
        location: { lat: 19.2183, lng: 72.9781 }, // Andheri
        severity: "Medium",
        description: "Tree fallen blocking street traffic.",
        locationName: "Andheri, Mumbai"
      }
    ]
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    password: "mypassword",
    reportedConditions: [
      {
        issueType: "Landslide",
        location: { lat: 18.7553, lng: 73.4006 }, // Lonavala
        severity: "High",
        description: "Hill road partially blocked due to landslide.",
        locationName: "Lonavala, India"
      }
    ]
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    email: "alice@example.com",
    password: "alice123",
    reportedConditions: [
      {
        issueType: "Flood",
        location: { lat: 18.5204, lng: 73.8567 }, // Pune
        severity: "Medium",
        description: "Low-lying areas submerged after heavy rain.",
        locationName: "Pune, India"
      },
      {
        issueType: "Traffic Jam",
        location: { lat: 18.5675, lng: 73.9123 }, // Hinjewadi
        severity: "Low",
        description: "Slow traffic due to construction work.",
        locationName: "Hinjewadi, Pune"
      }
    ]
  },
  {
    id: 4,
    fullName: "Bob Williams",
    email: "bob@example.com",
    password: "bobpass",
    reportedConditions: [
      {
        issueType: "Road Block",
        location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
        severity: "High",
        description: "Accident on main highway.",
        locationName: "Bangalore, India"
      }
    ]
  },
  {
    id: 5,
    fullName: "Mary Clark",
    email: "mary@example.com",
    password: "mary123",
    reportedConditions: [
      {
        issueType: "Flood",
        location: { lat: 13.0827, lng: 80.2707 }, // Chennai
        severity: "High",
        description: "Waterlogged streets due to heavy monsoon rain.",
        locationName: "Chennai, India"
      },
      {
        issueType: "Landslide",
        location: { lat: 12.2958, lng: 76.6394 }, // Mysore
        severity: "Medium",
        description: "Mudslide on hill road after rainfall.",
        locationName: "Mysore, India"
      }
    ]
  }
];
// localStorage.setItem("current_user", null)
// localStorage.clear()
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

export default defaultUsers;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
