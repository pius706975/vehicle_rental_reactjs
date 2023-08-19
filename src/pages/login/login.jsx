import React, {useEffect, useState} from "react";
import "./login.css";
import {FcGoogle} from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../helpers/api";
import { login } from "../../store/reducer/user";
import Footer from "../../components/footer/footer";

function Login() {
    
    const [Users, setUsers] = useState({
        email: '',
        password: ''
    })
    
    const { isAuth } = useSelector((state) => state.users)
    const api = Api()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])
    
    const onChangeInput = (e) => {
        e.preventDefault()
        const data = { ...Users }
        data[e.target.name] = e.target.value
        setUsers(data)
    }
    
    const loginUser = () => {
        if (Users.username === '' || Users.password === '') {
            alert('Fields cannot be empty')
        } else {
            // console.log(process.env.REACT_APP_BASEURL);
            api.requests({
                method: 'POST',
                url: 'auth/login',
                data: Users
            }).then((res) => {
                const { data } = res.data
                dispatch(login(data.token))
            }).catch((err) => {
                alert(err)
            })
        }
    }

    return (

        <div className="App">
        
            <main>

                <section className="login-bg">
                
                    <div className="container">
                
                        <div className="row">
                
                            <div className="col-lg-6">
                                
                                <div className="login-form">
                                    <h1 className="login-tagline text-white">Let's Explore<br />The World</h1>

                                    <p className="text-white login-subtagline">Already have account?</p>
                                    
                                    <Link to="/signup">
                                        <button className="btn-login form-login" onClick={login}>Sign Up</button>
                                    </Link>
                                </div>

                            </div>

                            <div className="col-lg-6">

                                <input className="form-control invisible-form form-control-md form-login"></input>
                                
                                <input className="form-control form-control-md form-login" name="email" type="email" placeholder="Email" onChange={onChangeInput} required ></input>
                                
                                <input className="form-control form-control-md form-login password" name="password" type="password" placeholder="Password" onChange={onChangeInput} required></input><br />
                                
                                <button className="btn-signup form-login" onClick={loginUser}>Login</button><br />
                                
                                <Link to="/">
                                    <button className="btn-google form-login"><FcGoogle className="gg-icon" />Login with Google</button>
                                </Link>
                            </div>
        
                        </div>
        
                    </div>
        
                </section>
        
            </main>

            <Footer/>
        
        </div>
    );

}

export default Login;