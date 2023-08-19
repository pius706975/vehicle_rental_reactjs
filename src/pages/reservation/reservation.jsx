import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import Auth from '../../helpers/auth'
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarCOM from "../../components/navbar/navbar";
import FooterCOM from "../../components/footer/footer";
import axios from "axios";
import Loading from "../../components/loading_animation/loading";
import {MdArrowBackIos} from 'react-icons/md'

function Reservation() {

    const history = useNavigate()
    const historyHandler = ()=>{
        history(-1)
    }

    const [vehicle, setVehicle] = useState('')
    const params = useParams()

    const getVehicle = async () => {
        try {
			const { data: vehicle } = await axios.get(
				`${process.env.REACT_APP_BASEURL}/vehicles/${params.id}`
			)

			setVehicle(vehicle.data)
                
		} catch (error) {
			console.log(error)
		}
    }

    useEffect(()=>{
        getVehicle()
    }, [])

    if (!vehicle) {
        return <Loading/>
    }

    const formatCurrency = (amount)=>{
        const formatter = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        });
      
        return formatter.format(amount);
      }

    return (
        <div className="App">
            <NavbarCOM/>

            <main>

                <section className="popular-in-town">

                    <div className="container">

                        <div className="row">
                            <h2 className='title'><Link onClick={historyHandler} className='back-arrow'><MdArrowBackIos/></Link>Reservation</h2>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <img className="detail-image" src={vehicle.image} alt="" />
                            </div>

                            <div className="col-lg-6 justify-content-end">
                                <div className="col-lg-6 justify-content-end">
                                    <p className="detail-model">{vehicle.model}</p>
                                    <p className="detail-location">{vehicle.location}</p>
                                    <p className="detail-status">{vehicle.status}</p>
                                    <p className="detail-description">{vehicle.description}</p>
                                    <p className="detail-etc">
                                        Capacity : {vehicle.capacity} person
                                    </p>
                                    <p className="detail-etc">Reservation before 2PM</p>
                                    <p className="detail-price">
                                        {formatCurrency(vehicle.price)}/Day
                                    </p>
                                </div>
                            </div>  

                            <div className="row mt-5 mb-5">
                                <div className="col-md-4 mt-4 ">
                                    <p className="title">Reservation date :</p>
                                </div>

                                    
                                <div className="col-md-4">
                                    <input type="date" name="start_date" className="form-control form-control-lg" placeholder="Start Date" required/>
                                </div>

                                
                                <div className="col-md-4">
                                    <input type="date" name="end_date" className="form-control form-control-lg" placeholder="End Date" required/>
                                </div>
                            </div>


                            <div className="row mt-5 mb-5">
                                <div className="col-lg">
                                    <button className="btn btn-lg btn-warning w-100 h-auto fw-bold form-login">Total</button>
                                </div>    
                            </div>   

                            <div className="row mt-5 mb-5">
                                <div className="col-lg">
                                    <button className="btn btn-lg btn-warning w-100 h-auto fw-bold form-login">Go to pay</button>
                                </div>
                            </div> 
                        </div>                  

                    </div>

                </section>

            </main>

            <FooterCOM/>
        </div>
    )
}

export default Auth(Reservation)