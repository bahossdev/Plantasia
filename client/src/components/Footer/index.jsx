// import React from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer-icons">
                <h5>&copy; {new Date().getFullYear()} Plantasia</h5>
                {/* <a className="footer-icons" href="https://twitter.com"><FaSquareXTwitter /></a>
                <a className="footer-icons" href="https://facebook.com"><FaFacebook /></a>
                <a className="footer-icons" href="https://instagram.com"><FaInstagram /></a> */}
                <img src='./socialmedia.gif' className='gif'/>
            </div>
        </footer>
    );
};

export default Footer;
