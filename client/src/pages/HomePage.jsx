import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className='home-container'>
                <div className="home-card">
                    <Link to="/plantcare">
                        <h2 className="home-title">Plant Care</h2>
                        <img src="./images/plantcare.jpg" alt="Plant Care" className="home-img" />
                    </Link>
                </div>

                <div className="home-card">
                    <Link to="/forum">
                        <h2 className="home-title">Forum</h2>
                        <img src="./images/forum.jpg" alt="Forum" className="home-img" />
                    </Link>
                </div>

                <div className="home-card">
                    <Link to="/shop">
                        <h2 className="home-title">Shop</h2>
                        <img src="./images/shop.jpg" alt="Shop" className="home-img" />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;
