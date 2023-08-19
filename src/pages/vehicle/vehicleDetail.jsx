import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FooterCOM from "../../components/footer/footer";
import NavbarCOM from "../../components/navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './vehicle.css'
import Loading from "../../components/loading_animation/loading";
import axios from "axios";
import {MdArrowBackIos} from 'react-icons/md'
import {FaHeart} from 'react-icons/fa'
import currency from '../../helpers/formatCurrency'


function VehicleDetail() {

    const history = useNavigate()
    const historyHandler = ()=>{
        history(-1)
    }

    const [vehicleDetail, setVehicleDetail] = useState([])
    const params = useParams()

    const getVehicleDetail = async ()=>{
        try {
            const {data: vehicleDetail} = await axios.get(process.env.REACT_APP_BASEURL + '/vehicles/' + params.id)
            setVehicleDetail(vehicleDetail.data)
            // console.log(vehicleDetail.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getVehicleDetail()
    }, [])

    if (!vehicleDetail) {
        return <Loading/>
    }

    return (
        <div className="App">
            <NavbarCOM/>

            <section className="popular-in-town">

                <div className="container">

                    <div className="row">
                        <h2 className="title"><Link  className="back-arrow" onClick={historyHandler}><MdArrowBackIos/></Link>Details</h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <img className="detail-image" src={vehicleDetail.image} alt="" />
                        </div>

                        <div className="col-lg-6 justify-content-end">
                            <p className="detail-model">{vehicleDetail.model}</p>
                            <p className="detail-location">{vehicleDetail.location}</p>
                            <p className="detail-status">{vehicleDetail.status}</p>
                            <p className="detail-description">{vehicleDetail.description}</p>
                            <p className="detail-etc">
                                Capacity : {vehicleDetail.capacity} person
                            </p>
                            <p className="detail-etc">Reservation before 2PM</p>
                            <p className="detail-price">
                                {currency(vehicleDetail.price)}/Day
                            </p>
                        </div>
                    </div>

                    <div className="row mt-5 mb-5">
                        <div className="col-md-4">
                            <button className="CA-button btn-lg w-100 fw-bold form-login">Chat Admin</button>
                        </div>

                        <div className="col-md-4">
                            <Link to={`/reservation/${vehicleDetail.id}`}>
                                <button className="R-button btn-lg w-100 fw-bold form-login">Reservation</button>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <button className="L-button btn-lg w-100 fw-bold form-login"><FaHeart/> Like</button>
                        </div>
                    </div>

                </div>
                
            </section>

            <FooterCOM/>
        </div>
    )
}

export default VehicleDetail