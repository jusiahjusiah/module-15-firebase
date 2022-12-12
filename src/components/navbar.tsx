import { Link } from 'react-router-dom'
//by calling auth we can access the user's information from Google Login
import { auth } from '../config/firebase'
//gets the auth state of the current logged in user
import { useAuthState } from "react-firebase-hooks/auth"
//allows you to sign out
import { signOut } from 'firebase/auth'
import '../App.css';
export const Navbar = () => {
    const [user] = useAuthState(auth);
    //allows user to logout
    const signUserOut = async () => {
        await signOut(auth)
    }
    return (
        <div>
            <div className='navbar'>
                <div className="links">
                <Link to="/" > Home </Link>
                {/* if user is not logged in, show login link */}
                {!user ? 
                <Link to="/login" > Login </Link>
                :
                // if logged in, remove login link show create post
                <Link to="/createPost"> Create Post </Link>
                }
                </div>
                {/* dont display this block if user is not logged in */}
                { user && (
                <div className="user">
                    <img src={user?.photoURL || "ello"} height="50" width="50" alt='hello'/>
                    {/* displays only the first name of the user */}
                    <p> {user?.displayName?.split(' ')[0]} </p>
                    <button onClick={signUserOut} className="logout"> Log-out </button>
                </div>
                )}   
            </div>
        </div>
    )
}
