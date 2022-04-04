import React from 'react'
import '../../App.css'
import './About.css';

export const About = () => {
    return (
        <div class='about-container'>
            <video src = '/videos/video_landing_3.mp4' autoPlay loop muted />
            {/* <video src = '/videos/video_landing_1.mp4' autoPlay loop muted /> */}
            <h1>ABOUT</h1>
        </div>
    );
}

export default About
