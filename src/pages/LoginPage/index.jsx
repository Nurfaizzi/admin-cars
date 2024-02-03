import React from "react"
import CompLogin from "../../components/CompLogin";
import './style.css'
import bannerLogin from "../../assets/bannerlogin.png";
const LoginPage = () => {

    return (
        <div className="container-login row">
        <div className="container-right-login">
          <img className="image-formlogin" src={bannerLogin} alt="" />
        </div>
        <div className="container-left-login">
          <CompLogin />
        </div>
      </div>
    )
}

export default LoginPage