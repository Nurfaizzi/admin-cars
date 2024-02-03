import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import moment from "moment";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button, Card, Modal, ModalBody } from "react-bootstrap";
import modalDelete from "../../assets/modal.png";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../redux/cars/carSlice";
import imageNotFound from "../../assets/imagenotfound.png"
const CompAllCar = ({car}) => {
  const dispatch = useDispatch();

  const [listCar, setListCar] = useState([]);
  const [category, setCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteSucces,SetDeleteSucces] = useState(false)
  const [addSucces,setAddSucces] = useState(false)
  const [editSucces,setEditSucces] = useState(false)
  const { id } = useParams();
  const {data_car,loading,error} = useSelector ((state) =>state.cars)

  
  useEffect(() => {
    getAllCars(category);
    handleFilterCategory();

  }, []);

  const categories = [
    { label: "All", value: "" },
    { label: "2 - 4 people", value: "small" },
    { label: "4 - 6 people", value: "medium" },
    { label: "6 - 8 people", value: "large" },
  ];

  const handleFilterCategory = () => {
    const categorys = searchParams.get("category");
    if (categorys) {
      setCategory(categorys);
    }
  };

  const handleSubmit = (e) => {
    getAllCars(category);
    setCategory(e.target.value);
  };

  const getAllCars = async (categoryCar) => {
    try {
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/customer/v2/car?category=${categoryCar}&page=1&pageSize=10&id=${id}`
      );
      dispatch(getCars(res.data.cars))

      setCategory(categoryCar);
      setSearchParams(categoryCar)
      SetDeleteSucces(false)
      const EditDataSucces = localStorage.getItem("editsucces")
      if(EditDataSucces){
        setEditSucces(true)
        setTimeout(() => {
          setEditSucces(false)
          localStorage.removeItem("editsucces")
        }, 4000);
      }  


      const addDataSucces = localStorage.getItem("addsucces")
      if(addDataSucces){
        setAddSucces(true)
        setTimeout(() => {
          setAddSucces(false)
          localStorage.removeItem("addsucces")
        }, 4000);
     
      }
    } catch (err) {
      console.log(err);
    }
  };

  const buttonFilterCategory = () => {
    return categories.map((object) => (
      <Button
        key={object.value}
        className={`rounded-0 me-2 ${
          category === object.value ? "active" : ""
        }`}
        onClick={() => getAllCars(object.value)}
      >
        {object.label}
      </Button>
    ));
  };

  const handleDelete = async (id) => {
    try{
      await handleDeleteCars(id),
      await getAllCars(category),
      handleCloseModalDelete()
      SetDeleteSucces(true)
      setTimeout(() => {
        SetDeleteSucces(false)
      }, 4000);
    }catch(err){
      console.log(err)
    }
  }

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleConfirmModalDelete = () => {
    setShowModalDelete(true);
  };

  const handleDeleteCars = async (id) => {
    try {
  
 
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: `${token}`,
        },
      };
      const res = await axios.delete(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        config
        
      );
  
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="mt-5">
      <div className="routes-cars">
        <p className="head-pagecars">
          {" "}
          <b>Car &gt;</b> List Car
        </p>
      </div>
      <div className="heading-listcars">
        <h1>List Cars</h1>
        {editSucces? <p className="add-carssucces">Data Berhasil Disimpan</p> : null }
        {addSucces ? <p className="add-carssucces">Data Berhasil Disimpan</p> : null }
        {deleteSucces ? <p className="delete-succes">Data Berhasil Dihapus</p> : null}
        <Link to={"/addcars"}>
          <button type="button" className="btn btn-primary" id="button-addData" >
            + Add New Car
          </button>
        </Link>
      </div>
   
      <div className="d-flex gap-2 mt-2">{buttonFilterCategory()}</div>
      <div className="mt-3">
        <div className="row">
          
          {data_car.length > 0 ?(
   data_car.map((obj, key) => (
    <div className="col-4 mb-4" key={key}>
      <div className="card-group" id="card-group">
        <div className="card">
          <div className="card-img-top">
          
            {
              obj.image === null ? (
                <Card.Img src={imageNotFound} className="card-img-top" id="image-car" />
              ):(
                <img
                src={obj.image}
                className="card-img-top"
                alt="..."
                id="image-car"
              />
              )
          
     
            }
          </div>

          <div className="card-body">
            <h5 className="card-title">{obj.name}</h5>
            <h5 className="card-price">Rp.{obj.price} / hari</h5>
            <div className="card-category">
              <i
                id="icon-result"
                className="fa-solid fa-user-group"
              ></i>
              <p>
                {(() => {
                  if (obj.category == "small") {
                    return "2 - 4 Orang";
                  } else if (obj.category == "medium") {
                    return "4 - 6 Orang";
                  } else {
                    return "6 - 8 Orang";
                  }
                })()}
              </p>
            </div>

            <p className="card-text">
              <small className="text-muted">
                Updated at{" "}
                {moment(obj.updatedAt).format("DD MMMM YYYY, h:mm")}
              </small>
            </p>
            <div className="row">
              <div className="col-6">
                <Button
                  variant="outline-danger"
                  className="button-card"
                  onClick={() => handleConfirmModalDelete()}
                ><i class="fa-solid fa-trash" id="icon-delete"></i>
                  Delete
                </Button>
              </div>
              <div className="col-6">
                <Link to={`/edit/${obj.id}`}>
                  <Button variant="success" className="button-card">
                    Edit
                  </Button>
                </Link>
                <Modal
                  show={showModalDelete}
                  onHide={handleCloseModalDelete}
                  centered
                >
                  <Modal.Body className="text-center px-5 align-middle">
                    <img
                      src={modalDelete}
                      alt=""
                      className="iamge-modadelete"
                    />
                    <h1 className="mt-3">
                      Anda Yakin Menghapus Data Ini
                    </h1>
                    <p className="mb-0">
                      Setelah dihapus, data mobil tidak dapat
                    </p>
                    <p>dikembalikan. Yakin ingin menghapus?</p>
                    <div className="d-flex justify-content-center ">
                      <Button
                        variant="primary"
                        className="me-2"
                        id="button-deletecars"
                        onClick={() => handleDelete(obj.id)}
                      >
                        <b>Ya</b>
                      </Button>
                      <Button
                        variant="outline-primary"
                        id="button-canceldeletecars"
                        onClick={() => handleCloseModalDelete()}
                      >
                        <b>Tidak</b>
                      </Button>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
          ):(
            <h1 className="data-notfound">Data  Tidak Ditemukan</h1>
          )}
       
        </div>
      </div>
    </div>
  );
};

export default CompAllCar;
