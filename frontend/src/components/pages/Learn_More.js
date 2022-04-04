import React from 'react'
import '../../App.css'
import './Learn_More.css'

export const LearnMore = () => {
    return (
        <div class = 'learn-more-container'>
            <video src = '/videos/video_landing_3.mp4' autoPlay loop muted />
            <h1>LEARN MORE</h1>
        </div>
    )
}

export default LearnMore