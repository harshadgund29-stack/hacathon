import React, { useEffect, useState } from "react";


const transportData = {
  buses: [
    { route: "Bus 101", status: "Available", nextArrival: "10 mins" },
    { route: "Bus 203", status: "Delayed", nextArrival: "25 mins" },
    { route: "Bus 307", status: "Cancelled", nextArrival: "-" },
    { route: "Bus 412", status: "Available", nextArrival: "5 mins" },
    { route: "Bus 509", status: "Available", nextArrival: "18 mins" }
  ],
  trains: [
    { route: "Central Line - CSMT to Thane", status: "Available", nextArrival: "6 mins" },
    { route: "Western Line - Churchgate to Borivali", status: "Delayed", nextArrival: "15 mins" },
    { route: "Harbor Line - Panvel to CST", status: "Available", nextArrival: "9 mins" },
    { route: "Metro Line 1 - Versova to Ghatkopar", status: "Available", nextArrival: "4 mins" },
    { route: "Monorail - Chembur to Wadala", status: "Limited Service", nextArrival: "20 mins" }
  ],
  autos: [
    { location: "Andheri Station", status: "Available" },
    { location: "Dadar Circle", status: "High Demand" },
    { location: "Borivali East", status: "Available" },
    { location: "Thane West", status: "Not Available" },
    { location: "Kurla Station", status: "High Demand" }
  ],
  cabs: [
    { provider: "Ola", status: "Available", eta: "7 mins" },
    { provider: "Uber", status: "Surge Pricing", eta: "12 mins" },
    { provider: "Rapido", status: "Available", eta: "5 mins" },
    { provider: "Meru", status: "Delayed", eta: "15 mins" },
    { provider: "Uber Pool", status: "Available", eta: "10 mins" }
  ]
};

const statusBadge = (status) => {
  if (status.toLowerCase().includes("available")) return "success";
  if (status.toLowerCase().includes("delayed")) return "warning";
  if (status.toLowerCase().includes("cancelled") || status.toLowerCase().includes("not available")) return "danger";
  if (status.toLowerCase().includes("high demand") || status.toLowerCase().includes("surge")) return "info";
  return "secondary";
};

const TransportTab = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(transportData);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 mt-5 text-center">🚍 Transport Availability Checker</h2>

      {/* Buses */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">🚌 Buses</div>
        <div className="card-body">
          {data.buses?.map((bus, idx) => (
            <div key={idx} className="row border-bottom py-2">
              <div className="col-md-6">{bus.route}</div>
              <div className="col-md-3">
                <span className={`badge bg-${statusBadge(bus.status)}`}>{bus.status}</span>
              </div>
              <div className="col-md-3 text-end">Next: {bus.nextArrival}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trains */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-success text-white">🚆 Trains</div>
        <div className="card-body">
          {data.trains?.map((train, idx) => (
            <div key={idx} className="row border-bottom py-2">
              <div className="col-md-6">{train.route}</div>
              <div className="col-md-3">
                <span className={`badge bg-${statusBadge(train.status)}`}>{train.status}</span>
              </div>
              <div className="col-md-3 text-end">Next: {train.nextArrival}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Autos */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-warning">🛺 Autos</div>
        <div className="card-body">
          {data.autos?.map((auto, idx) => (
            <div key={idx} className="row border-bottom py-2">
              <div className="col-md-6">{auto.location}</div>
              <div className="col-md-6 text-end">
                <span className={`badge bg-${statusBadge(auto.status)}`}>{auto.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cabs */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-dark text-white">🚖 Cabs</div>
        <div className="card-body">
          {data.cabs?.map((cab, idx) => (
            <div key={idx} className="row border-bottom py-2">
              <div className="col-md-4">{cab.provider}</div>
              <div className="col-md-4">
                <span className={`badge bg-${statusBadge(cab.status)}`}>{cab.status}</span>
              </div>
              <div className="col-md-4 text-end">ETA: {cab.eta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportTab;
