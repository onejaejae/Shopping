import React from 'react'
import { FaCode } from "react-icons/fa";
import { useSelector } from 'react-redux';

function LandingPage() {
    const user = useSelector(state => state.user)
    
    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </>
    )
}

export default LandingPage