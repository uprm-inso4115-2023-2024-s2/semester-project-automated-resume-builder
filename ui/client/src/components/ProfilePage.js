import "./ProfilePage.css"
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';



// import './PreviewPage.css';


function ProfilePage() {
    const { globalUser, setGlobalUser, logout } = useUser();
    // globalUser.defaultProps ={name: "Username"}


    // const navigate = useNavigate();

    // const handleMainMenu = () =>{
    //     navigate('/')
    // }

    // const handleResumePage = () =>{
    //     navigate('/resume/datainput')
    // }

    // const handleTemplatePage = () =>{
    //     navigate('/resume/new')
    // }

    return (<>
        <Box className="Profile-page">

            <Link to='/' className="link">
                <h1 className='upresume-title'>UPResuMe</h1>
            </Link>
            <div className='top-buttons-group'>
                <Link to='/resume/templates' className='link'>
                    <button className='top-button'>Templates</button>
                </Link>
                <Link to='/resume/datainput' className='link'>
                    <button className='top-button'>Resume</button>
                </Link>
            </div>
            {/* i'm going to try to use grids instead of <div> */}
            <div className="gallery-box">
                {/* <Box classNames="savedTemps" id="box0"></Box> */}
                <div className="savedTemps" id="box1">
                    <img src="/resume1.png" alt="resume 1" className="gallery-img"></img>
                </div>
                <div className="savedTemps" id="box2">
                    <img src="/resume2.png" alt="resume 2" className="gallery-img"></img>

                </div>
                <div className="savedTemps" id="box3">
                    <img src="" alt="" className="gallery-img"></img>
                </div>
                <div className="savedTemps" id="box4">
                    <img src="" alt="" className="gallery-img"></img>

                </div>

            </div>
            <div className='BigProfilePicture'>
                <img src="/UPR_at_Mayaguez_Seal.svg.png" id="profile-picture" className="BigProfilePicture " alt="profile picture"></img>
                <h1 className="username">Username</h1>
                <h3 className="user-info-sign-out">My Info</h3>
                <Link onClick={logout} to='/' className="link">
                    <h3 className="user-info-sign-out">Sign Out</h3>
                </Link>
            </div>





        </Box>


    </>)

}


export default ProfilePage