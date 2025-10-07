

import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt,  FaLocationArrow } from "react-icons/fa";
import "./MyReports.css";
import { Link } from "react-router-dom";




const severityColors = {
    High: "danger",
    Medium: "warning",
    Low: "success",
};

const Allreports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        console.log(users);

        const mockReports = users
            .map((user) => user.reportedConditions || [])
            .flat();
        console.log(mockReports);

        setReports(mockReports);
    }, []);

    return (
        <div className="container my-reports" style={{ minHeight: "80vh" }}>
            <h2 className="text-center mb-4 mt-4">All Reports</h2>
            
            <div className="row">
                {reports.length === 0 && <p className="text-center">No reports found.</p>}
                {reports.map((report, i) => (
                    <div key={i} className="col-md-6 col-lg-4 mb-4">
                        <div className="card report-card" style={{boxShadow: "1px 1px 8px rgba(12, 45, 146, 0.81)"}}>
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
                                <p>
                                    <Link target="_blank" title={`View Location:- ${report.locationName}`} to={`https://www.google.com/maps?q=${report.location.lat},${report.location.lng}(${encodeURIComponent(report.locationName)})`}
                                        rel="noopener noreferrer" style={{ textDecoration: "none" }}><FaLocationArrow size={12} color="blue" /> View On Map</Link></p>
                                <small className="text-muted">{report.description}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Allreports;