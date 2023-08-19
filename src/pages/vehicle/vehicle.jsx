import React, { useEffect, useState } from 'react'
import Card from '../../components/card/card'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import NavbarCOM from '../../components/navbar/navbar'
import FooterCOM from '../../components/footer/footer'
import Loading from '../../components/loading_animation/loading'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import {GoSearch} from 'react-icons/go'
import './vehicle.css'
import Api from '../../helpers/api'

function Vehicle()  {

    const [popular, setPopular] = useState([])
    const [cars, setCars] = useState([])
    const [motorbikes, setMotorbikes] = useState([])
    const [bicycles, setBicycles] = useState([])
    
    const getVehicle = async () => {
        try {
            const { data: popular } = await axios.get(
                process.env.REACT_APP_BASEURL + '/vehicles/popular/sort?desc'
                )
            const { data: cars } = await axios.get(
                process.env.REACT_APP_BASEURL + '/vehicles/category/cars'
                )
            const { data: motobikes } = await axios.get(
                process.env.REACT_APP_BASEURL + '/vehicles/category/motorbikes'
                )
            const { data: bicycles } = await axios.get(
                process.env.REACT_APP_BASEURL + '/vehicles/category/bicycles'
                )

                setPopular(popular.data)
                setCars(cars.data)
                setMotorbikes(motobikes.data)
                setBicycles(bicycles.data)
        } catch (error) {
            console.log(error)
        }
    }

    const [category, setCategory] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const params = useParams()
    const api = Api()

    const getVehicleCategory = ()=>{
        api.requests({
            
        })
    }

    useEffect(()=>{
        getVehicle()
    }, [])




    if (!popular || !cars || !motorbikes || !bicycles) {
        return <Loading/>
    }

    return(
        <div className="App">
            <NavbarCOM/>

            <section className='popular-in-town'>
                <div className="container">
                    <form className='d-flex form-control'>
                        <input type="text" className='form-input form-control me-2' aria-label='Search' onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search vehicle (e.g. cars, cars model)"/>
                        
                        <button className='form-input search-button' type='submit'><GoSearch/></button>
                    </form>
                </div>
            </section>

            <section className="popular-in-town">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2 className="title">Popular in Town</h2>
                        </div>
    
                        <div className="col-sm-6">
                            <Link to="/vehicles/popular" className="view-all">
                                <p className="text-end fw-bold">{'View all '}<b>{'>'}</b></p>
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
                
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2 className="title">Cars</h2>
                        </div>
    
                        <div className="col-sm-6">
                            <Link to="/vehicles/allcars" className="view-all">
                                <p className="text-end fw-bold">{'View all '}<b>{'>'}</b></p>
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        {cars.map((v, k) => {
                            if (k < 4) {
                                return (
                                    <Card id={v.id} image={v.image} name={v.model} location={v.location}/>
                                )
                            }
                        })}
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2 className="title">Motorbikes</h2>
                        </div>
    
                        <div className="col-sm-6">
                            <Link to="/vehicles/allmotorbikes" className="view-all">
                                <p className="text-end fw-bold">{'View all '}<b>{'>'}</b></p>
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        {motorbikes.map((v, k) => {
                            if (k < 4) {
                                return (
                                    <Card id={v.id} image={v.image} name={v.model} location={v.location}/>
                                )
                            }
                        })}
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2 className="title">Bicycles</h2>
                        </div>
    
                        <div className="col-sm-6">
                            <Link to="/vehicles/allbicycles" className="view-all">
                                <p className="text-end fw-bold">{'View all '}<b>{'>'}</b></p>
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        {bicycles.map((v, k) => {
                            if (k < 4) {
                                return (
                                    <Card id={v.id} image={v.image} name={v.model} location={v.location}/>
                                )
                            }
                        })}
                    </div>
                </div>
            </section>
    
            <FooterCOM/>
        </div>
    )
}

export default Vehicle

    // const filteredCars = cars.filter((car)=>{
    //     const seacrhStr = `${car.model} ${car.category} ${car.location}`.toLowerCase()
    //     return seacrhStr.includes(searchInput.toLowerCase())
    // })

    // const filteredCMotorbikes = motorbikes.filter((motorbike)=>{
    //     const seacrhStr = `${motorbike.model} ${motorbike.category} ${motorbike.location}`.toLowerCase()
    //     return seacrhStr.includes(searchInput.toLowerCase())
    // })

    // const filteredCBicycles = bicycles.filter((bicycle)=>{
    //     const seacrhStr = `${bicycle.model} ${bicycle.category} ${bicycle.location}`.toLowerCase()
    //     return seacrhStr.includes(searchInput.toLowerCase())
    // })
