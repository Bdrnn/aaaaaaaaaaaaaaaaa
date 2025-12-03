import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from '../img/blogLogo.svg'

export default function Navbar() {
    const { users, currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        navigate('/');
    }
    return (
        <nav>
            <div className="navFirst">
                <div style={{
                    display: "flex"
                }}>
                    <h1 style={{
                        color: "#0866FF"
                    }}>B</h1>
                    <h1>L</h1>
                    <h1>O</h1>
                    <h1>G</h1>
                </div>

                <Link to='/'><FaHome size={30} /></Link>
            </div>
            {currentUser ? (
                <>
                    <div className="navSecond">
                        <Link to='/profile'>
                            <p className='navProfile'>
                                {currentUser.profileImage && (
                                    <img src={currentUser.profileImage} style={{
                                        width: "30px",
                                        borderRadius: "50%",
                                        height: "30px"
                                    }} />
                                )}
                                {currentUser.displayName}</p>
                        </Link>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </div>
                </>

            ) : (
                <>
                    <div className="loginregister">
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </div>

                </>
            )}







        </nav>
    )
}