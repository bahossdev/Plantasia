// import React from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer-icons">
                <a href="https://facebook.com"><FaFacebook /></a>
                <a href="https://twitter.com"><FaSquareXTwitter /></a>
                <a href="https://instagram.com"><FaInstagram /></a>
            </div>
            <div className="copyright">
                <h4 className="footer">&copy; {new Date().getFullYear()} Plantasia</h4>
            </div>
        </footer>
    );
};

export default Footer;
