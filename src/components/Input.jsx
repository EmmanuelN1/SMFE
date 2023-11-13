import { PaperAirplaneIcon} from "@heroicons/react/outline";
import { useContext, useState } from "react";
import { db} from "../firebase";
import { AuthContext } from "../contextApi/AuthContext";
import { ChatContext } from "../contextApi/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import {v4 as uuid} from "uuid"




function Input() {

    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    
    
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const send = async () => {
     
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })

        await updateDoc(doc(db,"userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]:{
                text,
            },

            [data.chatId + ".date"] : serverTimestamp()
        })

        await updateDoc(doc(db,"userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]:{
                text,   
            },

            [data.chatId + ".date"] : serverTimestamp()
        })
        setImage(null)
        setText("")
    }

  return (
        <div className="input">
            <input type="text" placeholder="Type A Message..." class="inputText text-xs lg:text-sm" onChange={(e) => setText((e).target.value)} value={text}/>
            <div className="inputSend space-x-3">

                <PaperAirplaneIcon onClick={send} fill="#ff4500" height={24} width={24}/>

            </div>
        </div>
  )
}

export default Input