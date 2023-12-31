import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import Post from "./Post"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import avatar from "../assests/user.png"

function Posts() {

    const [posts, setPosts ] = useState([])


    useEffect(() => {
        return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs)
        });

     
    }, [db])

  return (
    <div>
        { posts.map((post) => (
             <Post 
                key={post.id}
                id={post.id}
                username={post.data().username}
                // profession={info.profession}
                avatar={avatar}
                postImg={post.data().image}
                caption = {post.data().caption}
              />
        ))}
    </div>
  )
}

export default Posts