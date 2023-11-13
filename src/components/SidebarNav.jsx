import { getAuth } from "firebase/auth";
import { AuthContext } from "../contextApi/AuthContext";
import { useContext } from "react";
import {  useNavigate} from "react-router-dom";

function SidebarNav() {

  const auth = getAuth();
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const logOut = () => {
    auth.signOut();
    navigate('/')
  }


  return (
    <div className='sideBarNav bg-orange'>
      

        <div className="sideBarNavName  uppercase font-bold  ">
         <span className="text-white">{currentUser.displayName}</span>

        </div>


        <div className="sideBarRight ">
            <button className="hidden lg:inline bg-white rounded-md text-orange text-xs lg:text-sm text-extrabold px-3 py-1 cursor-pointer " onClick={logOut}>Logout</button>
        </div>
    </div>
  )
}

export default SidebarNav