import React, { useState } from "react";
import "./style.css";
import {
  Navbar,
  Form,
  Button,
  Container,
  Row,
  Col,
  NavDropdown,
} from "react-bootstrap/";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCars } from "../../redux/cars/carSlice";
const NavbarTop = () => {
const [showDropDown,setShowDropDown] = useState(false)
const [searchParams, setSearchParams] = useSearchParams();
const [searchCars,setSearchCar] = useState("")
const dispatch = useDispatch()
const navigate = useNavigate()
let role = localStorage.getItem("response")
role = JSON.parse(role);
localStorage.getItem("accesToken")

const handleDropDown = () => {
  setShowDropDown(!showDropDown);
}
const handleLogOut =() => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("response");
  navigate('/')
}

const handleSearch = async () => {
try{
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      access_token: `${token}`,
    },
  };
const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/v2/car?name=${searchCars}&page=1&pageSize=10`,config)
dispatch(getCars(res.data.cars))
console.log(res.data.cars)
setSearchParams({name : searchCars})
}catch(err){
  console.log(err)
}
}


  return (
    <div>
 
      <div className="header-navbar">
      <div>
        <Link to={'/'}>
        <h1 className="box-abu"></h1>
        </Link>
        {/* <i class="fa-solid fa-bars fa-xl"></i> */}
        </div>
      
        <div className="form-search">
          <form>
            <div className="form-group mx-sm-3 mb-2" id="form-search">
              <input type="text" className="form-control" placeholder="Search" onChange={(e) =>  setSearchCar(e.target.value)}  />
              <Button variant="outline-primary" onClick={handleSearch}>
                Search
              </Button>
              <i className="fa-solid fa-circle-user fa-2xl" id="circle-user"  ></i>
              <p className="name-user" onClick={handleDropDown}>{role}</p>
              <i className="fa-solid fa-caret-down" id="dropdown-user" onClick={handleDropDown}></i>
              {showDropDown ? (
                <div className="dropdown-circle" >
            <button type="button"className="btn btn-primary d-grid gap-3 btn-sm" id="button-login" onClick={handleLogOut}>LogOut</button>
                </div>
    
              ):(
                <h1></h1>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
