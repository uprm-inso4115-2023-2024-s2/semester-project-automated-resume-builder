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
            <h1 className='upresume-title'>UPResuMe</h1>
            <div className='top-buttons-group'>
                <Link to='/resume/templates' className='link'>
                    <button className='top-button'>Templates</button>
                </Link>

                <Link to='/resume/datainput' className='link'>
                    <button className='top-button'>Resume</button>
                </Link>
            </div>
            <Link to="/profile" className='link'>
                <div className='profile-picture'></div>
            </Link>
            <h1 className='welcome'>
                <p>Resumes got you crazy?</p>
                <p>Can't find the right color?</p>
                <p>Need help picking the right template?</p>
            </h1>
            {/*diplaing resume images*/}
            <div className='resume-images'>
                <img src="/resume1.png" alt='resume1' />
                <img src='/resume2.png' alt='resume2' />
            </div>
            {!started && (
                <div className='button-container'>
                    {/* Apply custom styles to the Link */}
                    <Link to="/resume/new" onClick={handleGetStarted} className='link'>
                            <button className='button'>Start your resume today!</button>
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
