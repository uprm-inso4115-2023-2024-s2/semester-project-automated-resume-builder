import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    const [started, setStarted] = useState(false);

    const handleGetStarted = () => {
        setStarted(true);
    }

    return (
        <div style={styles.container}>
            <h1>Welcome to the Resume Builder</h1>
            {!started && (
                <div>
                    <p>Get started by creating a new resume</p>
                    {/* Apply custom styles to the Link */}
                    <Link to="/resume/new" onClick={handleGetStarted} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button style={{ textDecoration: 'none', color: 'black' }}>Start your resume!</button>
                    </Link>
                </div>
            )}
            {started && (
                <p>You have already started!</p>
            )}
        </div>
    );
}

// Define styles
const styles = {
    container: {
        background: 'linear-gradient(to bottom, #7be495, #28a745)', // Brighter green variant with faster color transition
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        color: 'white', // Text color
    },
};

export default LandingPage;
