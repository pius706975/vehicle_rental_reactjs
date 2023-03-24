import React from "react";
import { Spinner } from "react-bootstrap";
import FooterCOM from "../footer/footer";
import NavbarCOM from "../navbar/navbar";
import './loading.css'

function Loading() {
    return (
        <div>
            <NavbarCOM/>
            <div className="loading">
                <Spinner animation="grow" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>
                
                <h1> Loading </h1>
                
                <Spinner animation="grow" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>
            </div>
            <FooterCOM/>
        </div>
    )

}

export default Loading