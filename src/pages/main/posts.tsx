import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post } from "./main"
import { useEffect, useState } from "react";
interface Props {
    //data type is Post from main
    post: Post
}
//unique userId under Like
interface Like {
    likeId: string,
    userId: string;
}
export const Posts = (props : Props) => {
    // In the context of passing an interface to a prop, destructuring can be useful because it allows you to specify exactly which properties from the interface you want to pass to the prop, rather than passing the entire interface. This can make your code more readable and maintainable, and can also help prevent errors if the prop expects specific properties to be present.
    const { post } = props;
    const [user] = useAuthState(auth);

    //useState to alter value the numbers and show the number of likes on the post display
    //useState can be initialized as null but will take a number when ready
    //changed the state's data type to Like as we defined from the interface above
    const [likes, setLikes] = useState<Like[] | null>(null)

    const likesRef = collection(db, "likes");
    //gets document from databse when conditions are met
    const likesDoc = query(likesRef, 
        where("postId", "==", post.id))
    
    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        //we will get the length of the array that we queried so that we
        //can set it as the value of our likes
        setLikes(data.docs.map( (doc) => ( 
            { userId: doc.data().userId,
            likeId: doc.id
        })))
    } 

const removeLike = async () => {
    try {
        //gets the post to be deleted
        const likeToDeleteQuery = query(likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid))
        
        //waits for the liketoDeleteQuery
        const likeToDeleteData = await getDocs(likeToDeleteQuery)
        //has the data to be deleted
        const likeId = likeToDeleteData.docs[0].id
        const likeToDelete = doc(db, "likes", likeId)
        console.log(likeToDelete)
        await deleteDoc(likeToDelete)

        if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
    }
    } catch (err) {
        console.log(err)
    }
}

const addLike = async () => {
    //we put try catch because we used optimistic rendering for our like and unlike icon
    //this is a error safety method just in case our API rendering fails
    try {
        const newLike = await addDoc(likesRef, {
            userId: user?.uid , 
            postId: post.id 
        })

        //dynamically updates the like unlike icon and the like number
        //we used if statement because user cannot be null
        if (user) {
        setLikes((prev) => prev ? [...prev, 
            { userId: user.uid, likeId: newLike.id }] : 
            [{ userId : user.uid, likeId: newLike.id}])
    }
} catch (err) {
    console.log(err)
}
}

    //returns true or false if the post selected has already been liked or not by the logged in user
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid )

    useEffect(() => {
        getLikes()
    }, [])
    
    return (
        <div className="home-container">
            <div>
                <img className="home-photo" alt="Users avatar" src={user?.photoURL || "ello"}/> 
                    <div className="home-title">{props.post.title}</div>
                        <div className="home-description">{props.post.description}</div>
                            <div className="home-username"> @{props.post.username.split(' ')[0]}</div>
                            <div className="home-likes">
                                {/* conditional rendering of functions that removes if true and adds if false */}
                                <button onClick={hasUserLiked ? removeLike : addLike}> { hasUserLiked ? <> &#128078; Unlike </> : <> Like &#128077; </>} </button>
                                {/* only show likes number when there are likes present on the post */}
                                { likes && <p> Likes: {likes?.length} </p> }
                            </div>
            </div>
        </div>
    )
}