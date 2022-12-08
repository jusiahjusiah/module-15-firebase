import { Link } from 'react-router-dom'
//by calling auth we can access the user's information from Google Login
import { auth } from '../config/firebase'
//gets the auth state of the current logged in user
import { useAuthState } from "react-firebase-hooks/auth"
//allows you to sign out
import { signOut } from 'firebase/auth'
export const Navbar = () => {
    const [user] = useAuthState(auth);
    //allows user to logout
    const signUserOut = async () => {
        await signOut(auth)
    }
    return (
        <div>
            <Link to="/" > Home </Link>
            <Link to="/login" > login </Link>
            <div>
                {/* dont display this block if user is not logged in */}
                { user && (
                    <div>
                    <p> {user?.displayName} </p>
                        <button onClick={signUserOut}> Log-out </button>
                        <img src={user?.photoURL || "ello"} height="50" width="50" alt='hello'/>
                            
                    </div>
                )}   
            </div>

        </div>
    )
}
