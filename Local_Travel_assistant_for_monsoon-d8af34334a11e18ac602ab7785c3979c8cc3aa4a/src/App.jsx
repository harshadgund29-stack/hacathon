import React from 'react'
import Login from './Components/Login'
import LocationPicker from './Components/Locationpicker'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import Search from './Components/Search';
import AddReport from './Components/Reports';
import Footer from './Components/Footer';
import NotFound from './Components/NotFound';
import Routess from './Components/Routess';
import MyReports from './Components/Myrports';
import TransportTab from './Components/Travels';
const App = () => {
  return (
    
    <>

    <Router>

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/reports' element={<AddReport />} />
      <Route path='/routess/*' element={<Routess />} />
      <Route path='/myreports' element={<MyReports />} />
      <Route path ='/travelavailability' element={<TransportTab />} />
      <Route path="*" element={<NotFound/>}/>
      
    </Routes>
      <Footer/>
    </Router>  
    
    {/* <AddReport/> */}

    
    {/* <LocationPicker onSelectLocation={(latlng) => console.log("Selected Location:", latlng)} /> */}
    
    </>

  )
}

export default App
