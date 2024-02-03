import 'bootstrap/dist/css/bootstrap.min.css'
import {Col, Card, Button, Row, Container} from 'react-bootstrap/';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./style.css";


const CarCard = () => {
const navigate = useNavigate()
    return (
    <div className="side-car">
        <p> CARS </p>
        <div onClick={() => navigate("/car")}>
          <a href="">Cars</a>  
        </div>

      </div>

    )
}

export default CarCard