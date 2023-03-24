import React, { useEffect, useState } from "react";
import FooterCOM from "../../components/footer/footer";
import NavbarCOM from "../../components/navbar/navbar";
import './home.css'
import Card from '../../components/card/card'
import axios from 'axios'
import testimonials from '../home/img/image6.png'
import star from '../home/img/star.png'
import { Link } from "react-router-dom";

function Home() {

    const [popular, setVehicle] = useState([])

    const getPopularVehicle = async () => {
        try {
            const { data: popular } = await axios.get(process.env.REACT_APP_BASEURL + '/vehicles/popular/sort?desc')
                
                setVehicle(popular.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPopularVehicle()
    }, [])

    return (

        <div className="App">
            
            <NavbarCOM/>

            <main>
                
                <section className="finder">

                    <div className="container">
                        
                        <div className="row">
                        
                            <div className="col-lg-6">
                        
                                <h1 className="tagline text-black">Explore and<br />Travel</h1>

                                <p className="text-white subtagline">Vehicle Finder</p>
                                
                                <div className="row">
                                    <div className="col-lg-6 finderopt">
                                        <select className="w-100 opacity-75 px-2 py-3 rounded-3 fw-bold" name="location" id="location">
                                            <option value="" selected disabled hidden>Location</option>
                                            <option value="jakarta">Jakarta</option>
                                            <option value="samarinda">Samarinda</option>
                                            <option value="malang">Malang</option>
                                            <option value="berau">Berau</option>
                                            <option value="yogyakarta">Yogyakarta</option>
                                        </select>
                                    </div>

                                    <div className="col-lg-6 finderopt">
                                        <select className="w-100 opacity-75 px-2 py-3 rounded-3 fw-bold" name="type" id="type">
                                            <option value="" selected disabled hidden>Type</option>
                                            <option value="cars">Cars</option>
                                            <option value="motobikes">Motobikes</option>
                                            <option value="bike">Bikes</option>
                                        </select>
                                    </div>

                                    <div className="col-lg-6 finderopt">
                                        <select className="w-100 opacity-75 px-2 py-3 rounded-3 fw-bold" name="price" id="price">
                                            <option value="" selected disabled hidden>Payment</option>
                                            <option value="100000">{'< 100000'}</option>
                                            <option value="100000">100000 - 250000</option>
                                            <option value="100000">{'> 250000'}</option>
                                        </select>
                                    </div>

                                    <div className="col-lg-6 finderopt">
                                        <select className="w-100 opacity-75 px-2 py-3 rounded-3 fw-bold" name="date" id="date">
                                            <option value="" selected disabled hidden>Date</option>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>
                                    </div>

                                </div>

                                <button className="btn btn-lg btn-warning w-25 fw-bold btn-explore">Explore</button>
                           
                            </div>
                        
                        </div>
                    
                    </div>

                </section>

                <section className="popular-in-town">
                    
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2 className="title">Popular in Town</h2>
                            </div>
                            
                            <div className="col-sm-6">
                                <Link to="/vehicles/all" className="view-all">
                                    <p className="text-end fw-bold">
                                        {'View all '}
                                        <b>{'>'}</b>
                                    </p>
                                </Link>
                            </div>
                        </div>

                        <div className="row">
                            {popular.map((v, k) => {
                                if (k < 4) {
                                    return (
                                        <Card id={v.id} image={v.image} name={v.model} location={v.location}/>
                                    )
                                }
                            })}
                        </div>

                    </div>

                </section>

                <section className="testimonials">
                    <div className="container">
                        <div className="row">
                            <h2 className="title">Testimonials</h2>
                            <div className="col-md-6 my-auto">
                                <img className="star-rate" src={star} alt="" />
                                <img className="star-rate" src={star} alt="" />
                                <img className="star-rate" src={star} alt="" />
                                <img className="star-rate" src={star} alt="" />
                                <img className="star-rate" src={star} alt="" />
                                <p className="comment">”It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to havea ride for wildlife trip!”</p>
                                <p className="testi-man">Edward Newgate</p>
                                <p className="testi-job">Founder Circle</p>
                            </div>
                            
                            <div className="col-md-6 text-center">
                                <img className="rounded-4" src={testimonials} alt="" />
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <FooterCOM/>

        </div>
    )
}

export default Home