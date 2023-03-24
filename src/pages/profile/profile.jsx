import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import NavbarCOM from "../../components/navbar/navbar";
import FooterCOM from "../../components/footer/footer";
// import testImg from './img/test.png'
import Api from "../../helpers/api";
import Auth from '../../helpers/auth'
import './profile.css'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineMail} from 'react-icons/ai'
import {BsTelephoneForward} from 'react-icons/bs'
import {MdOutlineJoinInner} from 'react-icons/md'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "antd";


function Profile() {

    const history = useNavigate()
    const historyHandler = ()=>{
        history(-1)
    }

    const api = Api()
    const [bg1, setBg1] = useState(true)
    const [bg2, setBg2] = useState(false)
    const [name1, setName1] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState("")
    const [year, setYear] = useState("")

    const [data1, setData1] = useState("")
    const [data2, setData2] = useState("")
    const [data3, setData3] = useState("")
    const [data4, setData4] = useState("")
    const [data5, setData5] = useState("")
    const [data6, setData6] = useState("")
    const [data7, setData7] = useState("")

    const getUser = ()=>{
        api.requests({
            url: '/user/profile'
        }).then((res)=>{

            setData1(res.data.data.name)
            setData2(res.data.data.username)
            setData3(res.data.data.email)
            setData4(res.data.data.address)
            setData5(res.data.data.gender)
            setData6(res.data.data.mobile_number)
            setData7(res.data.data.image)

            const {data} = res.data
            const year = data.created_at.split('-')[0]
            setYear({...data, created_year: year})
            console.log(data);
        }).catch((err)=>{
            console.log(err)
        })
    }

    const updateUser = ()=>{
        api.requests({
            method: 'PUT',
            url: '/user/profile/edit',
            headers: {'Content-Type': 'multipart/form-data'},
            data: {
                name: name1,
                username: username,
                email: email,
                address: address,
                gender: gender,
                mobile_number: phone,
                image: image,
            },
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const bg1Handler = ()=>{
        setBg1(true)
        setBg2(false)
        setGender("Male")
    }

    const bg2Handler = ()=>{
        setBg1(false)
        setBg2(true)
        setGender("Female")
    }

    const genderHandler = ()=>{
        if (data5 === "Male") {
            setBg1(true)
            setBg2(false)
        } else if (data5 === "Female") {
            setBg1(false)
            setBg2(true)
        }
    }

    useEffect(()=>{
        getUser()
    }, [])

    useEffect(()=>{
        genderHandler()
    }, [data5])

    return (
        <div className="App">
            <NavbarCOM/>

            <main>

                <section className="popular-in-town mt-5">

                    <div className="container">

                        <div className="row">
                            <h2 className="edit-title">Profile</h2>
                        </div>

                        <div className="profile-img text-center p-4 ">
                            <div className="flex flex-row justify-content-center">
                                <Avatar className="rounded-circle" style={{width:"150px", height:"150px", border:"1px black solid", objectFit:"cover", cursor:"pointer"}}  alt="." src={data7}/>
                                
                                <p className="fw-bold change-pic"><FiEdit/> Change profile picture</p>

                                <h2 className="fw-bold name">{data1}</h2>

                                <p className="main-user-info"><AiOutlineMail/> {data3}<br/><BsTelephoneForward/> {data6}<br/><MdOutlineJoinInner/> Has been active since {year.created_year}</p>
                            </div>

                            <div className="flex flex-row jusify-content-center">
                                <Form>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check inline label="Male" name="gender" type={type} onClick={bg1Handler} checked={bg1}/>
                                            
                                            <Form.Check inline label="Female" name="gender" type={type} onClick={bg2Handler} checked={bg2}/>
                                        </div>
                                    ))}
                                </Form>
                            </div>
                        </div>

                        <div>
                            <p className="fw-bold">Contacts</p>
                            <Form.Control type="text" className="update-field" placeholder="Display name" defaultValue={data1} onChange={(e)=>setName1(e.target.value)}/>

                            <Form.Control type="text"  className="update-field" placeholder="username" defaultValue={data2} onChange={(e)=>setUsername(e.target.value)}/>

                            <Form.Control type="text" className="update-field" placeholder="Email" defaultValue={data3} onChange={(e)=>setEmail(e.target.value)}/>

                            <Form.Control type="text" className="update-field" placeholder="Address" defaultValue={data4} onChange={(e)=>setAddress(e.target.value)}/>

                            <Form.Control type="text" className="update-field" placeholder="Mobile Number" defaultValue={data6} onChange={(e)=>setPhone(e.target.value)}/>
                        </div>

                        <div className="row mt-5 mb-5">
                            <div className="col-md-4">
                                <Link>
                                    <button className="save-btn btn-lg w-100 fw-bold" onClick={updateUser}>Save Changes</button>
                                </Link>
                            </div>

                            <div className="col-md-4">
                                <button className="edit-password-btn btn-lg w-100 fw-bold">Edit Password</button>
                            </div>

                            <div className="col-md-4">
                                <button className="cancel-btn btn-lg w-100 fw-bold" onClick={historyHandler}>Cancel</button>
                            </div>
                        </div>

                    </div>

                </section>

            </main>

            <FooterCOM/>
        </div>
    )
}

export default Auth(Profile)