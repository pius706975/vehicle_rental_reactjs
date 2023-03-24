import React, { useEffect, useState } from "react";
import {Navbar, Nav, Dropdown, DropdownButton} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import logo from '../navbar/img/logo.png'
import { useDispatch, useSelector } from "react-redux";
import Api from "../../helpers/api";
import { logout } from "../../store/reducer/user";
import testimg from './img/test.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

function NavbarCOM() {

    const history = useNavigate()
    const historyHandler = ()=>{
        history(-1)
    }

    const dispatch = useDispatch()
    const {isAuth} = useSelector((state) => state.users)
    const [user, setUser] = useState("")
    const api = Api()

    const getUser = ()=>{
        api.requests({
            method: 'GET',
            url: '/user/profile'
        }).then((res)=>{
            const {data} = res.data
            setUser(data)
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        if (isAuth) {
            getUser()
        }
    }, [])



    return (
        <div className="navcontainer">
            <Navbar expand="lg">

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
                    <a className="navbar-brand" onClick={historyHandler}>
                        <img className="img-brand" src={logo} alt="..." />
                    </a>

                    <Nav className="nav-menu">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/vehicles">Vehicle Type</Nav.Link>
                        <Nav.Link as={Link} to="/history">History</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    
                    <Nav>
                        {isAuth ? (
                            <div className="dropdown-container">
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="link" className="profile-pic-toggle">
                                        <img src={user.image} alt="..." className="profile-pic rounded-circle"/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="profile-menu">
                                        <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>

                                        <Dropdown.Item href="/profile/edit">Edit Profile</Dropdown.Item>
                                        
                                        <Dropdown.Item onClick={()=>dispatch(logout())}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <button className="nav-button nav-login">Login</button>
                                </Nav.Link>
                                
                                <Nav.Link as={Link} to="/signup">
                                    <button className="nav-button nav-signup">Register</button>
                                </Nav.Link>
                            </>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarCOM