import {addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import {BookmarkIcon, ChatIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon} from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import {db} from "../firebase"
import { HeartIcon as HeartIconFilled} from "@heroicons/react/solid"

function Post({id, username, avatar, profession, postImg, caption}) {
    const auth = getAuth();
    const {currentUser} = useContext(AuthContext)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
   
  
    useEffect(() => {
        return onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot => {
            setComments(snapshot.docs)
        });

     
    }, [id, db])

    useEffect(() => {
        return onSnapshot(collection(db, 'posts', id, 'likes'), orderBy('timestamp', 'desc'), snapshot => {
            setLikes(snapshot.docs)
        });

     
    }, [id, db])

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1)
    }, [likes])

    const sendComment = async(e) => {
        e.preventDefault()

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: currentUser.displayName,
            timestamp: serverTimestamp()
        })
    }

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', currentUser.uid))
        }
        else{
            await setDoc(doc(db, 'posts', id, 'likes',  currentUser.uid), {
                username: currentUser.displayName
            })
        }
      
    }

  return (
    <div  className="bg-white my-7 border rounded-sm">
        {/* Header */}
        <div className="flex items-center py-2 px-5">
            <img src={avatar} alt="avatar" className="rounded-full h-12 w-12 object-contain   mr-3" />
            <p className="flex-1 font-bold capitalize ">{username}</p>
            <p className="text-red-600 uppercase font-semibold text-xs ">{profession}</p>
        </div>
        {/* postImg */}
        <img src={postImg} alt="" className="object-cover h-[600px] w-full" />
        {/* buttons */}
       { auth.currentUser &&
            (
                <div className="flex justify-between px-4 py-4 ">
                    <div className="flex space-x-4">
                        {
                            hasLiked? (
                                <HeartIconFilled onClick={likePost} className="postBtn text-red-500"/>
                            ) :
                            (
                                <HeartIcon onClick={likePost} className="postBtn"/>
                            )
                        }
                        
                        <ChatIcon className="postBtn"/>
                        <PaperAirplaneIcon className="postBtn"/>
                    </div>

                    <BookmarkIcon className="postBtn"/>
                </div>
            )
        }
        
        {/* caption */}
        <p className="p-5 truncate">
            {likes.length > 0  && (
                <p className="font-bold mb-1">{likes.length} likes</p>
            )}
            <span className="font-bold lowercase mr-1">{username} </span>{caption}
        </p>
        {/* comments */}
        { comments.length > 0 &&
            (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin ">
                    {comments?.map((comment) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img src={avatar} alt="avatar" className="rounded-full h-7" />
                            <p className="text-sm flex-1"> <span className="font-bold">{comment.data().username}</span> {comment.data().comment}</p>
                        </div>
                    ))}
                </div>
            )
        }
        {/* input box */}
            { auth.currentUser && 
                    (
                        <form className="flex items-center p-4">
                                <EmojiHappyIcon className="h-7"/>
                                <input 
                                    type="text"
                                    value={comment}
                                    placeholder="Add a comment..."
                                    className="border-none flex-1 focus:ring-0 outline-none"
                                    onChange={(e) => setComment(e.target.value)}
                                    />
                                <button 
                                    type="submit" 
                                    disabled={!comment.trim()} 
                                    className="font-semibold text-red-600 text-xs"
                                    onClick={sendComment}
                                    >
                                        Post
                                    </button>
                        </form>
                    )
                }
    </div>
  )
}

export default Post