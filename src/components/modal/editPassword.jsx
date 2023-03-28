import React, { useState } from "react"
import Api from "../../helpers/api"
import './editPassword.css'

function EditPassword() {

    const api = Api()
    const [show, setShow] = useState(false)
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const closeHandler = ()=>setShow(false)
    const showHandler = ()=>setShow(true)

    const changePassword = ()=>{
        api.requests({
            method: 'PUT',
            url: '/user',
            data: {password: password1}
        }).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    // const confirmHandler
    
    return (
        <div className="App">
            <button className="edit-password-btn btn-lg w-100 fw-bold">Edit Password</button>
        </div>
    )
}

export default EditPassword