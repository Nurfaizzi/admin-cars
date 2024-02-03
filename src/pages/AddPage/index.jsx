import React from "react"
import SideBar from "../../components/SideBar"

import AddCars from "../../components/AddCars";
import NavbarTop from "../../components/NavBar";
import CarCard from "../../components/CarCard";
const AddPage = () => {
    return (
        <div>

            <SideBar /> 
            <NavbarTop/>
            <div className="page-car">
            <AddCars />
            </div>     


        </div>
    )
}

export default AddPage