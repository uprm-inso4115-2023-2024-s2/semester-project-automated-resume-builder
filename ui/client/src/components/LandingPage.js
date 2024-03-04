import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const [started, setStarted] = useState(false);

    const handleGetStarted = () => {
        setStarted(true);
    }

    return (
        <div className='container'> {/* Apply custom styles to the container */}
            <h1>Welcome to the Resume Builder</h1>
            {!started && (
                <div>
                    <p>Get started by creating a new resume</p>
                    {/* Apply custom styles to the Link */}
                    <Link to="/resume/new" onClick={handleGetStarted} className='link'>
                        <button className='button'>Start your resume!</button>
                    </Link>
                </div>
            )}
            {started && (
                <p>You have already started!</p>
            )}
        </div>
    );
}



export default LandingPage;
