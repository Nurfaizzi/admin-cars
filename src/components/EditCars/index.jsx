import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import imageNotFound from "../../assets/imagenotfound.png";
import { Button, Card, Modal, ModalBody } from "react-bootstrap";
const EditComp = () => {
  const [listcar, setListCars] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(false);
  const [editSucces, setEditSucces] = useState(false);
  const [prevUrl, setPrevUrl] = useState(null);
  const [buttonEdit, setButtonEdit] = useState(false);
  const [allowExtend, setAllowExtend] = useState(false);
  const [allowSize, setAllowSize] = useState(false);
  const [inputField, setinputField] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const nameChange = (e) => {
    if (setName === "") {
      setButtonEdit(false);
    } else {
      setButtonEdit(true);
    }
    setName(e.target.value);
  };

  const priceChange = (e) => {
    if (setPrice === "") {
      setButtonEdit(false);
    } else {
      setButtonEdit(true);
    }
    setPrice(Number(e.target.value));
  };

  const ImageChange = (e) => {
    

    setAllowExtend(false);
    setAllowSize(false);

    const extend = e.target.files[0]?.type.split("/")[1];
    const alllowExtend = ["png", "jpeg"];
    const allowedSize = 1024 * 1024;
    const data = e.target.files[0];

    if (!alllowExtend.includes(extend) || name === "" || price === "" || category === "") {
      setAllowExtend(true);
      setButtonEdit(false);
      e.target.value = null
    } else if (data.size > allowedSize) {
      setAllowSize(true);
      setButtonEdit(true);
      e.target.value = null
    } else {
      setAllowExtend(false);
      setAllowSize(false);
      setButtonEdit(true);
      const file = e.target.files[0];
      setImage(e.target.files[0]);
      setPrevUrl(URL.createObjectURL(file));
      setImage(file);
      return;
    }
  };

  

  const categoryChange = (e) => {
    if (setCategory === "") {
      setButtonEdit(false);
    } else {
      setButtonEdit(true);
    }
    setCategory(e.target.value);
  };

  useEffect(() => {
    GetDetailCars();
  }, []);

  const GetDetailCars = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: `${token}`,
        },
      };

      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        config
      );

      setListCars(res.data);
      setName(res.data.name);
      setPrice(res.data.price);
      setImage(res.data.image);
      setCategory(res.data.category);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCar = async (e) => {


    if (image === null ) {
     setinputField(true)
     setButtonEdit(false)
    } else {
      try {
        const token = localStorage.getItem("access_token");
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            access_token: `${token}`,
          },
        };
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("status", status);
        const res = await axios.put(
          `https://api-car-rental.binaracademy.org/admin/car/${id}`,
          formData,
          config
        );
        setEditSucces(true);
        
        localStorage.setItem("editsucces", handleEditCar);
        navigate("/car");
      } catch (err) {
        console.log(err);
      }
    }
  };



  return (

    <div>
      <div className="container-editdata">
        <div className="editdata">
          <h1 className="heading-pageedit">
            {" "}
            <b>Cars &gt;</b>
            <Link to={"/car"} className="backto-list-cars">
              List Cars
            </Link>
            <b>&gt;</b> <p className="heading-editcar">Edit car </p>{" "}
          </h1>
        </div>
        <div className="container-subheading-pageedit">
          <h1 className="subheading-pageedit">Edit Cars</h1>
        </div>
        {inputField ? (
          <p className="alert-inputfield">please enter an image!</p>
        ) : null}
        {allowSize ? (
          <p className="alert-inputfield">image size is too large</p>
        ) : null}
        {allowExtend ? (
          <p className="alert-inputfield">file must be jpeg or png</p>
        ) : null}
        <div className="container-form-edit">
          <div className="container">
            <form>
              <div className="row">
                <div className="col-25">Nama/Tipe Mobil</div>
                <div className="col-75">
                  <input
                    type="text"
                    id="fname"
                    value={name}
                    name="name"
                    placeholder="Nama/Tipe Mobil"
                    className="input-editdata"
                    onChange={nameChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label className="label-edit"> Harga*</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="fname"
                    value={price}
                    placeholder=" Harga"
                    className="input-editdata"
                    onChange={priceChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label className="label-edit">Foto*</label>
                </div>
                <div className="col-75">
                  <input
                    onChange={ImageChange}
                    type="file"
                    name="image"
                    placeholder="Upload Foto Mobil"
                    className="input-adddata"
                  />
                  <p className="notice">Wajib Untuk Mengupload ulang foto mobil.</p>
                  {listcar.image === null ? (
                    <Card.Img src={imageNotFound} id="previmage-car" />
                  ) : (
                    <img src={listcar.image} alt="" id="previmage-car" />
                  )}
                  <img src={prevUrl} alt="" id="previmage-car" />
                  <p className="max-sizefoto">File size max. 2MB</p>
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label className="label-edit">Kategori</label>
                </div>
                <div className="col-75">
                  <select onChange={categoryChange} value={category}>
                    <option value={""} disabled>
                      Pilih Kategori Mobil
                    </option>
                    <option value={"small"}>2 - 4 orang</option>
                    <option value={"medium"}>4 - 6 orang</option>
                    <option value={"large"}>6 - 8 orang</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label className="label-edit">Created at</label>
                </div>
                <div className="col-75"></div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label className="label-edit">Updated at</label>
                </div>
                <div className="col-75"></div>
              </div>
            </form>
          </div>
        </div>
        <div className="button-adddata">
          <Link to={"/car"}>
            <button type="button" className="btn btn-outline-primary">
              Cancel
            </button>
          </Link>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleEditCar}
            id="button-editdata"
            disabled={!buttonEdit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComp;
