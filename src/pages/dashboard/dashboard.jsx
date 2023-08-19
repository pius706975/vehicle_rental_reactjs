import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading_animation/loading";
import NavbarCOM from "../../components/navbar/navbar";
import Api from "../../helpers/api";
import {FiEdit} from 'react-icons/fi'
import {RiDeleteBin5Line} from 'react-icons/ri'
import { Modal } from "react-bootstrap";
import Auth from '../../helpers/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

function Dashboard() {

    const [vehicle, setVehicle] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState({
        id: ''
    })
    const api = Api()
    const navigate = useNavigate()
    const handleClose = ()=> setShowModal(false)
    const handleShow = (id)=>{
        setSelectedVehicle(id)
        setShowModal(true)
    }

    const getPopularVehicle = ()=>{
        api.requests({
            method: 'GET',
            url: '/vehicles/'
        }).then((res)=>{
            const {data} = res.data
            setVehicle(data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const deleteVehicle = (id)=>{
        api.requests({
            method: 'DELETE',
            url: '/vehicles/removevehicle/' + id
        }).then((res)=>{
            window.location.reload(navigate('/dashboard'))
        }).catch((err)=>[
            console.log(err)
        ])
    }

    useEffect(()=>{
        getPopularVehicle()
    }, [])

    if (!vehicle) {
        return <Loading/>
    }

    return (
        <div className="App">
            <NavbarCOM/>

            <main>

                <section className="popular-in-town">

                    <div className="container">
                        
                        <div className="row">
                            <h2 className="dashboard-title">Vehicle List</h2>
                        </div>

                        <div className="row">
                            <Link to="/vehicles/addvehicle">
                                <button type="button" className="add-button">Add Vehicle</button>
                            </Link>
                        </div>

                        <div className="row">
                            <div className="table-responsive">
                                <table className="table table-bordered  table-striped rounded-10">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Model</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Capacity</th>
                                            <th>Status</th>
                                            <th>Stock</th>
                                            <th>Location</th>
                                            <th>Image</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {vehicle.map((v, k)=>{
                                           return (
                                            <tr style={{margin:"auto"}}>
                                                <td>{k+1}</td>
                                                <td>{v.model}</td>
                                                <td>{v.description}</td>
                                                <td>{v.price}</td>
                                                <td>{v.capacity}</td>
                                                <td>{v.status}</td>
                                                <td>{v.stock}</td>
                                                <td>{v.location}</td>
                                                <td>
                                                    <img className="text-center w-50" src={v.image} alt="" />
                                                </td>
                                                <td>
                                                    <Link to={"/vehicles/edit/" + v.id}>
                                                        <button className="border-0"><FiEdit/></button>
                                                    </Link>

                                                    <button className="border-0" onClick={()=>handleShow(v.id)}><RiDeleteBin5Line/></button>
                                                    <Modal show={showModal} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>
                                                                Confirm Deletion
                                                            </Modal.Title>
                                                        </Modal.Header>

                                                        <Modal.Body>Are you sure?
                                                        </Modal.Body>

                                                        <Modal.Footer>
                                                            <button onClick={handleClose}>Cancel</button>

                                                            <button onClick={()=>{
                                                                deleteVehicle(v.id)
                                                                handleClose()
                                                            }}>Delete</button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </td>
                                            </tr>
                                           )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                </section>

            </main>
        </div>
    )
}

export default Auth(Dashboard)