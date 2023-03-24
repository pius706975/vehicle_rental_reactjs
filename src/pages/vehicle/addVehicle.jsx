import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../../helpers/api'
import './vehicle.css'
import Loading from '../../components/loading_animation/loading'
import NavbarCOM from '../../components/navbar/navbar'
import FooterCOM from '../../components/footer/footer'
import {MdArrowBackIos} from 'react-icons/md'
import Auth from '../../helpers/auth'

function AddVehicle() {

    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const api = Api()
    const [data, setData] = useState({
        model: '',
        location: '',
        description: '',
        price: 0,
        status: '',
        stock: 0,
        capacity: 0,
        category_id: '',
        image: null,
    })

    const onChangeInput = (e)=>{
        e.preventDefault()

        const tmpData = {...data}
        tmpData[e.target.name] = e.target.value
        setData(tmpData)
    }

    const onChangeFile = (e)=>{
        e.preventDefault()

        const file = e.target.files[0]
        if (file) {
            const tmpData = {...data}
            tmpData['image'] = file
            setData(tmpData)
        }
    }

    const postData = ()=>{
        const formData = new FormData()
        for (const key in data) {
            formData.append(`${key}`, data[key])
        }
        console.log(process.env.REACT_APP_BASEURL+'/vehicles/addvehicle');
        api.requests({
            method: 'POST',
            url: '/vehicles/addvehicle',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
        }).then((res) => {
            console.log(res)
            navigate('/dashboard')
        }).catch((err) => {
            alert(err)
        })
    }

    const getCategory = () => {
        api.requests({
            method: 'GET',
            url: '/vehicles/category/'
        }).then((res) => {
            const { data } = res.data
            setCategory(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(()=>{
        getCategory()
    }, [])

    if (!category) {
        return <Loading/>
    }

    return (
        <div className="App">
            <NavbarCOM/>

            <main>

                <section className='popular-in-town mt-5'>

                    <div className="container">

                        <div className="row">
                            <h2 className='dashboard-title'><Link to="/dashboard" className='left-link'><MdArrowBackIos className="back-arrow"/></Link>Add Vehicle</h2>
                        </div>

                        <div className="row">
                             <div className="col">
                                <input type="text" className='form-control form-control-lg' name='model' placeholder='Name' onChange={onChangeInput} required/>

                                <input type="text" className='form-control form-control-lg' name='location' placeholder='Location' onChange={onChangeInput} required/>

                                <input type="text" className='form-control form-control-lg' name='description' placeholder='Description' onChange={onChangeInput} required/>

                                <input type="number" className='form-control form-control-lg' name='price' placeholder='Price' onChange={onChangeInput} required/>

                                <input type="text" className='form-control form-control-lg' name='status' placeholder='Status' onChange={onChangeInput} required/>

                                <input type="number" className='form-control form-control-lg' name='stock' placeholder='Stock' onChange={onChangeInput} required/>

                                <input type="number" className='form-control form-control-lg' name='capacity' placeholder='Capacity' onChange={onChangeInput} required/>
                                
                                <br />

                                <select name="category_id" className='form-control form-control-lg' onChange={onChangeInput}>
                                    <option selected>Add item to</option>

                                    {category.map((v, k) => (
                                        <option value={v.category_id}>
                                            {v.category_name}
                                        </option>
                                    ))}
                                </select>

                                <input type="file" className='form-control form-control-lg' name='image' placeholder='Vehicle Image' onChange={onChangeFile}/>

                                <div className='d.flex justify-content-center mt-3'>
                                    {data.image && (
                                        <img src={URL.createObjectURL(data.image)} alt="..." className='w-50' />
                                    )}
                                </div>

                                <br />

                                <button className='btn btn-lg btn-warning w-100 fw-bold mb-5' onClick={postData}>Add</button>
                            </div>
                        </div>
                    </div>

                </section>

            </main>

            <FooterCOM/>
        </div>
    )
}

export default Auth(AddVehicle)