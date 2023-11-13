import Sidebar from "../components/Sidebar"
import Chatboard from "../components/Chatboard"
import Header from "../components/Header"



export default function Chats() {


  return (
    <>
         <Header/>
         <div className="home ">
            <div className="homeContainer">
                <Sidebar/>
                <Chatboard/>
            </div>
    </div>
    </>
   
  
  )
}