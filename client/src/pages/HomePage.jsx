import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className='home-container'>
                <div className="home-card">
                    <Link to="/plantcare">
                        <div className="image-container">
                            <img src="./wateringcan.gif" alt="Plant Care" className="home-img" />
                            <div className="overlay">
                                <h3 className="home-title">Plant Care</h3>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="home-card">
                    <Link to="/forum">
                        <div className="image-container">
                            <img src="./forumplant.gif" alt="Forum" className="home-img" />
                            <div className="overlay">
                                <h3 className="home-title">Forum</h3>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="home-card">
                    <Link to="/shop">
                        <div className="image-container">
                            <img src="./plantshop.gif" alt="Shop" className="home-img" />
                            <div className="overlay">
                                <h3 className="home-title">Shop</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}


  

export default Home;

