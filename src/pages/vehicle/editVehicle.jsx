import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Api from '../../helpers/api'
import Loading from '../../components/loading_animation/loading'
import NavbarCOM from '../../components/navbar/navbar'
import FooterCOM from '../../components/footer/footer'
import {MdArrowBackIos} from 'react-icons/md'
import Auth from '../../helpers/auth'

function EditVehicle() {

    const history = useNavigate()
    const historyHandler = ()=>{
        history(-1)
    }

    const [editVehicle, setEditVehicle] = useState([])
    const [category, setCategory] = useState([])
    const [data, setData] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    const api = Api()

    const onChangeInput = (event) => {
        event.preventDefault()
        const tmpdata = { ...data }
        tmpdata[event.target.name] = event.target.value
        setData(tmpdata)
        console.log(data)
    }

    const onChangeFile = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        if (file) {
            const tmpdata = { ...data }
            tmpdata['image'] = file
            setData(tmpdata)
        }
    }

    const getVehicle = () => {
        api.requests({
            method: 'GET',
            url: `/vehicles/${params.id}`
        }).then((res) => {
            const { data } = res.data
            setEditVehicle(data)
        }).catch((err) => {
            console.log(err)
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

    const updateData = () => {
        const formData = new FormData()
        for (const key in data) {
            formData.append(`${key}`, data[key])
        }

        api.requests({
            method: 'PUT',
            url: '/vehicles/updatevehicle/' + params.id,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
        }).then((res) => {
            console.log(res)
            navigate('/dashboard')
        }).catch((err) => {
            alert(err)
        })
    }

    useEffect(()=>{
        getVehicle()
        getCategory()
        setData({
            ...data,
            image: editVehicle.image,
            category_id: editVehicle.category_id
        })
    }, [])

    if (!category || !editVehicle) {
        return <Loading/>
    }

    return (
        <div className="App">
            <NavbarCOM/>

            <main>

                <section className='popular-in-town mt-5'>                    

                    <div className="container">

                        <div className="row">
                            <h2 className="edit-title"><Link onClick={historyHandler} className='back-arrow' ><MdArrowBackIos/></Link>Edit Vehicle</h2>
                        </div>

                        <div className="row">
                            <div className="col">
                                <input type="text" className='form-control form-control-lg' name='model' placeholder='Name' onChange={onChangeInput} defaultValue={editVehicle.model}/>

                                <input type="text" className='form-control form-control-lg' name='location' placeholder='Location' onChange={onChangeInput} defaultValue={editVehicle.location} />

                                <input type="text" className='form-control form-control-lg' name='description' placeholder='Description' onChange={onChangeInput} defaultValue={editVehicle.description}/>

                                <input type="number" className='form-control form-control-lg' name='price' placeholder='Price' onChange={onChangeInput} defaultValue={editVehicle.price} />

                                <input type="text" className='form-control form-control-lg' name='status' placeholder='Status' onChange={onChangeInput} defaultValue={editVehicle.status} />

                                <input type="number" className='form-control form-control-lg' name='stock' placeholder='Stock' onChange={onChangeInput} defaultValue={editVehicle.stock} />

                                <input type="number" className='form-control form-control-lg' name='capacity' placeholder='Capacity' onChange={onChangeInput} defaultValue={editVehicle.capacity}/>

                                <br />

                                <select name="category_id" className='form-control form-control-lg' onChange={onChangeInput}>
                                    <option selected>Add item to</option>

                                    {category.map((v, k) => (
                                        <option value={v.category_id}>
                                            {v.category_name}
                                        </option>
                                    ))}
                                </select>

                                <input type="file" className='form-control form-control-lg' name='image' placeholder='Vehicle Image' onChange={onChangeFile} defaultValue={editVehicle.image}/>

                                <div className='d.flex justify-content-center mt-3'>
                                    {data.image && (
                                        <img src={URL.createObjectURL(data.image)} alt="..." className='w-50' />
                                    )}
                                </div>

                                <br />

                                <button className='btn btn-lg btn-warning w-100 fw-bold mb-5' onClick={updateData}>Save</button>
                            </div>
                        </div>

                    </div>

                </section>

            </main>

            <FooterCOM/>
        </div>
    )
}

export default Auth(EditVehicle)