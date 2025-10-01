import React from "react";
import "./Jurny.css";
import { FaShieldAlt } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";

const SafeJourney = () => {
  return (
    <div className="safe-journey container-fluid p-0 text-center py-5">
      <h2 className="fw-bold">Plan Your Safe Journey</h2>
      <p className="text-muted">
        Get real-time updates on road conditions, flooding, and safe alternate
        routes crowdsourced from the community.
      </p>

      
      <div className="row my-4">
        <div className="col-md-4">
          <h4 className="fw-bold text-primary">15,000+</h4>
          <p className="text-muted">Reports Today</p>
        </div>
        <div className="col-md-4">
          <h4 className="fw-bold text-success">98%</h4>
          <p className="text-muted">Accuracy Rate</p>
        </div>
        <div className="col-md-4">
          <h4 className="fw-bold text-warning">24/7</h4>
          <p className="text-muted">Live Updates</p>
        </div>
      </div>

      {/* Features */}
      <div className="row mt-4 mx-auto">
        <div className="col-md-4">
          <div className="card feature-card p-4">
            <FaShieldAlt className="icon text-success mb-3" size={40} />
            <h5 className="fw-bold">Safe Routes</h5>
            <p className="text-muted">
              AI-powered route planning that avoids flooded areas and ensures
              safe travel
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card feature-card p-4">
            <FaRegCommentDots className="icon text-primary mb-3" size={40} />
            <h5 className="fw-bold">Community Reports</h5>
            <p className="text-muted">
              Real-time crowd-sourced reports on road conditions and flooding
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card feature-card p-4">
            <FaBusAlt className="icon text-warning mb-3" size={40} />
            <h5 className="fw-bold">Transport Updates</h5>
            <p className="text-muted">
              Live updates on bus, metro, and cab availability during monsoon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeJourney;
