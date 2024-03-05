import { useContext } from "react";
import user from "../assests/user.png"
import { AuthContext } from "../contextApi/AuthContext";
import { getAuth } from "firebase/auth";
import {  useNavigate} from "react-router-dom";




function MiniProfile() {

  const auth = getAuth();
  const navigate = useNavigate()
  

  const logOut = () => {
    auth.signOut();
    navigate('/')
  }
  
  
  const {currentUser} = useContext(AuthContext)
  return (
    <>
      {auth?.currentUser && <div className="flex items-center justify-between mt-14 ml-10">
        <img 
          alt=""
          className="w-16 h-16  rounded-full border p-1" 
          src={user} />


        <div className=" flex-1 mx-4">
            <h2 className="font-bold">{currentUser?.displayName}</h2>
            <h3 className="text-xs text-gray-400">Welcome to SMFE</h3>
        </div>

        <button 
        className=" text-orange text-sm font-semibold"
        onClick={logOut}
        >
        Sign Out
        </button>
     </div>}
    </>
    
  )
}

export default MiniProfile