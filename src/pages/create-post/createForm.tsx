import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
//addDoc adds a new document to your collection
//collection is a function which collection you want to add a document to
import { addDoc, collection} from "firebase/firestore"
//import db to access post annd collection
import { auth, db } from '../../config/firebase'
//import auth to access current user
import { useAuthState } from "react-firebase-hooks/auth"
export const CreateForm = () => {

    //define an interface so that you could assign data types to your schema
    interface CreateFormData {
        title: string,
        description: string
    }

    //schema yup can be chaining, see other code from github for ref
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description")
    })

    //see react-form docs for components reference
    const { register, 
        handleSubmit, 
        formState : {errors} } = useForm<CreateFormData>({
        resolver : yupResolver(schema),
    })
    
    //create function to access current auth state
    const [user] = useAuthState(auth);
    //creates a reference to what collection you want to access
    const postsRef = collection(db, "posts");
    //handles what happens to the data onSubmit
    //use aync await when function needs to return a promise
    //js promise is completed in the future after
    //the function returns a value
    //it's either a success or an error

    const onCreatePost = async (data : CreateFormData) => {
        await addDoc(postsRef, {
            // title: data.title,
            // description : data.description,
            //we can destructor the object above by passing a spread operator
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input placeholder='Title...' {...register("title")}></input>
                <p style={{color: "red"}}> {errors.title?.message} </p>
                <textarea placeholder='Description...' {...register("description")}/>
                <p style={{color: "red"}}> {errors.description?.message} </p>
                <input type='submit'/>
            </form>
        </div>
    )
}
