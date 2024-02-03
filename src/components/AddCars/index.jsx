import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Fade } from "react-bootstrap";
const AddCars = ({succes}) => {
  const navigate = useNavigate()
  const [name,setName ] = useState("")
  const [price,setPrice] = useState("")
  const [image,setImage] = useState("")
  const [category,setCategory] = useState("")
  const [status,setStatus] = useState(false)
  const [inputField,setinputField] = useState(false)
  const [allowExtend,setAllowExtend] = useState(false)
  const [allowSize,setAllowSize] = useState(false)
  const [buttonSave,setButtonSave] = useState(false)
  const [addSucces,setAddSucces] = useState(false)

  const nameChange = (e) => {
    setName(e.target.value)
    setinputField(false)

  }


  const priceChange = (e) => {
    setPrice(Number(e.target.value))
    setinputField(false)
 
  }
  
  const ImageChange = (e) => {
    setAllowExtend(false)
    setAllowSize(false)
    setButtonSave(false)
    const extend = e.target.files[0]?.type.split("/")[1]
    console.log(extend)
    const alllowExtend = ["png","jpeg"]
    const allowedSize = 1024 * 1024
    const data = e.target.files[0]



    if(!alllowExtend.includes(extend)){
      setAllowExtend(true)

    }else if(data.size > allowedSize){
     setAllowSize(true)

    }else{
      setAllowExtend(false)
      setAllowSize(false)
      const file = e.target.files[0];
      setImage(file);
 
    }



  };


  const categoryChange = (e) => {
    if(setCategory === ""){
      setButtonSave(false)
    }else{
      setButtonSave(true)
    }
    setCategory(e.target.value)
    setinputField(false)
  }



  const handleAddCars = async (e) => {
    try {
      
      if(name === "" || price === "" || image === "" || category === ""){
        setinputField(true)
      }else{
      e.preventDefault()
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "access_token": `${token}`,
        },
      };
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("status", status);
      const res = await axios.post(
        `https://api-car-rental.binaracademy.org/admin/car`,
        formData,
        config
      );
      setAddSucces(true)
      console.log(res.data);
      navigate('/car')
      setTimeout(() => {
       
       
      }, 2000);
      localStorage.setItem("addsucces",handleAddCars)
      setButtonSave(true)
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div className="container-addData">
      <div className="addData">
   
        <h1 className="heading-pageadd">   
        <b>Cars &gt;</b> 
        {addSucces ? <p className="add-carssucces">Data Berhasil Disimpan</p> : null }
        <Link to={'/car'} className="backto-list-cars">
        List Car   
        </Link>
         <b>&gt;</b> Add New Car
       
         </h1>
      </div>
      <div className="container-subheading-pageadd">
        <h1 className="subheading-pageadd">Add New Car</h1>
      </div>
      {allowSize? <p className="alert-inputfield">image size is too large</p> : null}
      {allowExtend ? <p className="alert-inputfield">file must be jpeg or png</p> : null}
      {inputField ? <p className="alert-inputfield">data is required to be filled in</p> : null}
      <div className="container-form">
        <div className="container">
          <form>
            <div className="row">
     
              <div className="col-25">Nama/Tipe Mobil</div>
              <div className="col-75">
                <input
                  onChange={nameChange}
                  type="text"
                  id="fname"
                 value={name}
                  placeholder="Nama/Tipe Mobil"
                  className="input-adddata"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label className="label-add"> Harga*</label>
              </div>
              <div className="col-75">
                <input
                  onChange={priceChange}
                  type="text"
                  id="fname"
                 value={price}
                  placeholder=" Harga"
                  className="input-adddata"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label className="label-add">Foto*</label>
              </div>
              <div className="col-75">
                <input
                  onChange={ImageChange}
                  type="file"
                  name="image"
                  placeholder="Upload Foto Mobil"
                  className="input-adddata"
                />
                <p className="max-sizefoto">File size max. 2MB</p>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label className="label-add">Kategori</label>
              </div>
              <div className="col-75">
                <select onChange={categoryChange} value={category}>
                  <option value={""}>Pilih Kategori Mobil</option>
                  <option value={"small"}>2 - 4 orang</option>
                  <option value={"medium"}>4 - 6 orang</option>
                  <option value={"large"}>6 - 8 orang</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="button-adddata">
        <Link to={'/car'}>
        <button type="button" className="btn btn-outline-primary">
          Cancel
        </button>
        </Link>
    
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleAddCars}
          disabled={!buttonSave}
          id="button-saveadddata"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddCars;
