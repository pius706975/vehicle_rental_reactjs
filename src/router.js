import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Reservation from "./pages/reservation/reservation";
import SignUP from "./pages/signup/signup";
import AddVehicle from "./pages/vehicle/addVehicle";
import EditVehicle from "./pages/vehicle/editVehicle";
import Vehicle from "./pages/vehicle/vehicle";
import VehicleDetail from "./pages/vehicle/vehicleDetail";

function TheRouter() {

    return (

        <Router>
            
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/signup" element={<SignUP/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/vehicles" element={<Vehicle/>} />
                <Route path="/vehicles/details/:id" element={<VehicleDetail/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/vehicles/addvehicle" element={<AddVehicle/>}/>
                <Route path="/vehicles/edit/:id" element={<EditVehicle/>}/>
                <Route path="/Reservation/:id" element={<Reservation/>}/>
                <Route path="/profile/edit" element={<Profile/>}/>
            </Routes>

        </Router>
    )
}

export default TheRouter