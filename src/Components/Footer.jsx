import React, { useEffect, useState } from "react";
import { FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";
import "./Footer.css"; 
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const current_user = JSON.parse(localStorage.getItem("current_user")) || null;
  const nav = useNavigate()
  const location = useLocation()
  const [login ,setLogin] = useState(()=>localStorage.getItem('islogin') || false);

  useEffect(()=>{

    window.scrollTo(0,0);

  },[location.pathname])

  useEffect(()=>{
    if(!login){
      nav('/')
    }
  },[login])
  return (
    <footer className="footer bg-light text-dark pt-5 pb-3">
      <div className="container ">
        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="d-flex align-items-center mb-2">
              <FaShieldAlt className="text-primary me-2" size={22} />
              <h5 className="fw-bold m-0">SafeRoute</h5>
            </div>
            <p className="small text-muted">
              Keeping communities safe during monsoon season with real-time,
              crowd-sourced navigation.
            </p>
          </div>


          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Features</h6>
            <ul className="list-unstyled small">
              <li>Safe Route Planning</li>
              <li>Real-time Flood Reports</li>
              <li>Transport Updates</li>
              <li>Emergency Contacts</li>
            </ul>
          </div>


          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Community</h6>
            <ul className="list-unstyled small">
              <li>Report Conditions</li>
              <li>Help Others</li>
              <li>Safety Guidelines</li>
              <li>Weather Alerts</li>
            </ul>
          </div>

   
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Emergency</h6>
            <ul className="list-unstyled small">
              <li>Emergency: 108</li>
              <li>Traffic Police: 103</li>
              <li>Flood Helpline: 1916</li>
              <li>Disaster Management</li>
            </ul>
          </div>
        </div>


        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-top pt-3 mt-3">
          <p className="small text-muted mb-2 mb-md-0">
            © 2024 SafeRoute. Keeping you safe during monsoons.
          </p>
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-success">50,000+ Active Users</span>
            <span className="text-secondary small">Community</span>
          </div>
        </div>
      </div>

        <abbr title="Report Condtion" style={{cursor:'pointer'}}>
     {current_user &&  <button className="emergency-btn btn btn-danger rounded-circle shadow-lg" style={{position: 'fixed'}} onClick={() => nav('/reports') }>
     
        <FaExclamationTriangle size={22} />
        
      </button>
}

      {
        current_user && <div className="dropdown" style={{ position: "fixed", top: "20px", right: "10px", zIndex: "1000" }}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">

            <li>
              <button className="dropdown-item" onClick={() => nav('/myreports')} >
                My Reports
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => nav('/allreports')} >
                All Reports
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={()=> nav('/home')}>
                Home
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={()=> nav('/travelavailability')} >
                Transport Availibliy
              </button>
            </li>
            <li>
              <button className='dropdown-item ' type='button' onClick={() => { setLogin(false), localStorage.setItem('islogin', false), localStorage.setItem('current_user', null) }}>Logout</button>

            </li>
          </ul>
        </div>

      }
       
      </abbr>
    </footer>
  );
};

export default Footer;
