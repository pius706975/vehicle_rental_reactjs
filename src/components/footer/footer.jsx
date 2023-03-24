import React from "react";
import "./footer.css"
import {FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube} from "react-icons/fa";
import logo from './img/logo.png'
import { Link } from "react-router-dom";

const FooterCOM = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row inner">
                    {/* column 1 */}
                    <div className="col-md-5">
                        <Link to="/"><img src={logo} alt="..." className="logo"/></Link>

                        <p className="main-message">Plan and book your perfect trip with expert advice, travel tips for vehicle information from us</p>
                    
                        <p className="main-copyright main-message">&#169;2020 Vehicle Rental Center. All rights reserved</p>
                    </div>

                    {/* column 2 */}
                    <div className="col-md-2 col-sm-6">
                        <h5><b>Destinations</b></h5>
                        <ul className="list-unstyled">
                            <li>Bali</li>
                            <li>Yogyakarta</li>
                            <li>Jakarta</li>
                            <li>Kalimantan</li>
                            <li>Malang</li>
                        </ul>
                    </div>
                    
                    {/* column 3 */}
                    <div className="col-md-2 col-sm-6">
                        <h5><b>Vehicles</b></h5>
                        <ul className="list-unstyled">
                            <li>Bike</li>
                            <li>Cars</li>
                            <li>Motorbike</li>
                            <li>Return Times</li>
                            <li>FAQs</li>
                        </ul>
                    </div>

                    {/* column 4 */}
                    <div className="col-md-3 col-sm-6">
                        <h5><b>Interests</b></h5>
                        <ul className="list-unstyled">
                            <li>Advanture Travel</li>
                            <li>Art And Culture</li>
                            <li>Wildlife And Nature</li>
                            <li>Family Holidays</li>
                            <li>Culinary Trip</li>
                        </ul>
                    </div>

                </div>

                <div className="main-footer-line"></div>

                <div className="main-social-media text-center mw-100 pt-3">
                    <a href="https://twitter.com/" target={"blank"}><FaTwitter/></a>
                    <a href="https://web.facebook.com/?_rdc=1&_rdr" target={"blank"}><FaFacebook/></a>
                    <a href="https://www.instagram.com/" target={"blank"}><FaInstagram/></a>
                    <a href="https://www.linkedin.com/" target={"blank"}><FaLinkedin/></a>
                    <a href="https://www.youtube.com/" target={"blank"}><FaYoutube/></a>
                </div>
            </div>
        </div>
    )
}

export default FooterCOM