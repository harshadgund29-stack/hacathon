import React, { useState } from "react";
import LocationPicker from "./Locationpicker";
import { useNavigate } from "react-router-dom";

const AddReport = () => {
  const [issueType, setIssueType] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const nav =useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const newReport = {
      issueType,
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      severity,
      description,
      locationName,
    };

    console.log(newReport);
    const users =JSON.parse(localStorage.getItem("users")) || []
    const i = users.findIndex(u => u.email === (JSON.parse(localStorage.getItem("current_user")) || {}).email);
    
    // console.log(i);
    if(i!=-1){
        users[i].reportedConditions.push(newReport)
        localStorage.setItem("users",JSON.stringify(users))
        localStorage.setItem("current_user",JSON.stringify(users[i]))
        alert("Report added successfully!");
        nav('/home')
    }
    else{
        alert("Error adding report. Please try again.");
        return;
    }
    

    


    setIssueType("");
    setLat("");
    setLng("");
    setSeverity("Low");
    setDescription("");
    setLocationName("");

    
  };

  return (
    <div style={{ maxWidth: "97vw", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px",boxShadow:"1px 1px 5px gray" }}>
      <h3>Add New Report</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Issue Type:</label>
          <input
          className="form-control"
            type="text"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            required
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>Latitude:</label>
            <input
                className="form-control"
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Longitude:</label>
            <input
            className="form-control"
              type="number"
              step="any"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Severity:</label>
          <select
          className="form-control"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
          className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Location Name:</label>
          <input
          className="form-control"
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        </div>

        <button
        className="mb-3"
          type="submit"
          style={{ padding: "10px 15px", background: "#0d6efd", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Add Report
        </button>
      </form>

        <h4>Pick Co-ordinates From here or Enter Manualy</h4>
      <LocationPicker onSelectLocation={(latlng) =>{ setLat(latlng.lat), setLng(latlng.lng)}}/>
    </div>
  );
};

export default AddReport;
