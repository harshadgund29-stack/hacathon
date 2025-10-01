import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import "./MyReports.css";

  
  // console.log(i);
  
const severityColors = {
  High: "danger",
  Medium: "warning",
  Low: "success",
};

const MyReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
  const i = users.findIndex(user => user.email === (JSON.parse(localStorage.getItem("current_user")) || {}).email);
  const mockReports = users[i]?.reportedConditions
    setReports(mockReports);
  },[]);

  return (
    <div className="container my-reports">
      <h2 className="text-center mb-4 mt-4">My Reports</h2>
      <div className="d-flex justify-content-center"><button className="btn btn-primary mb-4" onClick={()=> window.location.href="/home"}>Back to Home</button></div>
      <div className="row">
        {reports.length === 0 && <p className="text-center">No reports found.</p>}
        {reports.map((report,i) => (
          <div key={i} className="col-md-6 col-lg-4 mb-4">
            <div className="card report-card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    {report.locationName}
                  </h5>
                  <span className={`badge bg-${severityColors[report.severity]}`}>
                    {report.severity}
                  </span>
                </div>
                <p className="card-text">{report.issueType}</p>
                <small className="text-muted">{report.description}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;
