import React, {useEffect, useState} from "react";
import "./signup.css";
import {FcGoogle} from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../helpers/api";
import { addUsers } from "../../store/reducer/user";
import Footer from "../../components/footer/footer";

function SignUP() {
    
    const [Users, setUsers] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'user'
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
    
    const login = () => {
        navigate('/login')
    }
    
    const onChangeInput = (event) => {
        event.preventDefault()
        const data = { ...Users }
        data[event.target.name] = event.target.value
        setUsers(data)
    }
    
    const register = () => {
        if (Users.username === '' || Users.email === '' || Users.password === '') {
          alert('Please fill all fields')
        } else if (Users.username !== Users.username.toLowerCase()) {
          alert('username must be lowercase')
        } else if (Users.password.length < 8) {
          alert('password length must be greater than 8')
        } else {
            api
            .requests({
                method: 'POST',
                url: '/user/register',
                data: Users
            }).then((res) => {
                dispatch(addUsers(res.data))
                navigate('/login')
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
                                    
                                    <Link to="/login">
                                        <button className="btn-login form-login" onClick={login}>Login</button>
                                    </Link>
                                </div>

                            </div>

                            <div className="col-lg-6">
                                <input className="form-control form-control-md form-login" name="username" type="text" placeholder="Name" onChange={onChangeInput} required></input>

                                <input className="form-control form-control-md form-login" name="username" type="text" placeholder="Username" onChange={onChangeInput} required></input>
                                
                                <input className="form-control form-control-md form-login" name="email" type="email" placeholder="Email" onChange={onChangeInput} required ></input>
                                
                                <input className="form-control form-control-md form-login password" name="password" type="password" placeholder="Password" onChange={onChangeInput} required></input><br />
                                
                                <button className="btn-signup form-login" onClick={register}>Sign up</button><br />
                                
                                <Link to="/">
                                    <button className="btn-google form-login"><FcGoogle className="gg-icon" />Sign up with Google</button>
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

export default SignUP;