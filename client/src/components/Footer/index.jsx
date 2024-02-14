const Footer = () => {
    return (
        <footer>
            <div className="footer-icons">
                <p>&copy; {new Date().getFullYear()} Plantasia</p>
                <img src='./socialmedia.gif'href="https://facebook.com" className='gif'/>
            </div>
        </footer>
    );
};

export default Footer;
