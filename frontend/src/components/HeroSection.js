import React from 'react';
import '../App.css'
import './HeroSection.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src = '/videos/video_landing_1.mp4' autoPlay loop/>
            <h1>BEER GAME</h1>
            <p>The Game Of Supply Chain Management</p>
            <div className="hero-btns">
                <Link to = '/animation'>
                    <Button className='btns' buttonStyles='btn--outline'
                    buttonSize='btn--large'>Get Started</Button>
                </Link>
            </div>
        </div>
    )
}
export default HeroSection
