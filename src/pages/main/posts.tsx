
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { Post } from "./main"
interface Props {
    //data type is Post from main
    post: Post
}
export const Posts = (props : Props) => {
    const [user] = useAuthState(auth);
    //desstructure the data to only get the post
    const { post } = props;
    return (
        <div className="home-container">
            <div>
            <img className="home-photo" alt="Users avatar" src={user?.photoURL || "ello"}/> 
                <div className="home-title">{props.post.title}</div>
                <div className="home-description">{props.post.description}</div>
                    <div className="home-username">

                        @{props.post.username.split(' ')[0]}
                    </div>
            </div>
        </div>
    )
}