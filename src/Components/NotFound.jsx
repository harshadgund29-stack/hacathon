import React from "react";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa", padding: "20px" }}
    >
      <h1 style={{ fontSize: "8rem", color: "#0d6efd", margin: 0 }}>404</h1>
      <h2 className="my-3" style={{ fontSize: "2rem" }}>Oops! Page Not Found</h2>
      <p style={{ fontSize: "1.2rem", color: "#6c757d", maxWidth: "500px" }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <a
        href="/home"
        className="btn btn-primary mt-3"
        style={{ padding: "12px 25px", fontWeight: "bold" }}
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
