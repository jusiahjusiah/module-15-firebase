import { provider, auth } from "../config/firebase"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
//this method will allow us to sign in using Google

export const Login = () => {
    const navigate = useNavigate();
    //allows us to navigate through a page when called
    const signWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result)
        navigate('/');
    }

    return (
        <div className="login-page-container">
            <div className="login-page">
                <h2> This is the log-in page </h2>
                <p> Sign in with Google </p>
                {/* import files from config file to enable google auth */}
                <button onClick={signWithGoogle} className="sign-in"> Google </button>
            </div>
        </div>
    )
}
