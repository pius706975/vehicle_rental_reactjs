import React, { useEffect, useState } from "react";
import FooterCOM from "../../components/footer/footer";
import NavbarCOM from "../../components/navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import Loading from "../../components/loading_animation/loading";
import Card from "../../components/card/card";
import Api from "../../helpers/api";

function AllBicycles() {

    const api = Api()
    const [bicycles, setBicycles] = useState([])

    const getCategory = ()=>{
        api.requests({
            method: 'GET',
            url: '/vehicles/category/bicycles'
        }).then((res)=>{
            const {data} = res.data
            setBicycles(data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getCategory()
    }, [])

    if (!bicycles) {
        return <Loading/>
    }
    
    return (
        <div className="App">
            <NavbarCOM/>

            <section className="popular-in-town">
                
                <div className="container">

                    <div className="row">
                        <div className="col-sm-6">
                            <h2 className="title">Bicycles</h2>
                        </div>
                    </div>

                    <div className="row">
                        {bicycles.map((v, k)=>{
                            return (
                                <Card id={v.id} image={v.image} name={v.model} location={v.location}/>
                            )
                        })}
                    </div>
                </div>

            </section>

            <FooterCOM/>
        </div>
    )
}

export default AllBicycles