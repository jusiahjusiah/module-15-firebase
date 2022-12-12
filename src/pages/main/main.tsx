import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { Posts } from './posts';
//define what your Post looks like from Firestore
export interface Post {
    id: string,
    username: string,
    description: string,
    userId: string,
    title: string,

}

export const Main = () => {
    //state has Post as data type, | represents that Post can be null for the meantime
    const [postList, setPostList ] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");
    const getPosts = async () => {
        //gets the list of documents we have in our firestore collection
        const data = await getDocs(postsRef)
        //cast data as Data type Post
        //map our data from the firestore database
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})) as Post[])
    }

    //use useEffect hook to fetch your document's post array

    useEffect(() => {
        getPosts()
    }, [])
    
    return (
        <div className="container">
            {/* loops through our postList */}
            {postList?.map(( post ) =>
                <Posts post={post}/>
                )}
        </div>
    )
}
