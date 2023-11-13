
import user from "../assests/user.png"
import logo from "../assests/x.png"
import {SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon} from "@heroicons/react/outline"
import {HomeIcon} from "@heroicons/react/solid"
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth";
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"


function Header() {
  const navigate = useNavigate()
  const auth = getAuth();
  const [open, setOpen] = useRecoilState(modalState)


  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
        <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto pb-1">
             {/* left */}
            <div className="relative h-12 mt-3  w-24 cursor-pointer">
                  <img 
                      src={logo} 
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      className="h-9 w-9"
                  />
              </div>
          
            {/* Middle Search Input Field */}
            <div className="max-w-xs">
                <div className=" relative mt-1 p-3 rounded-md ">
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-500"/>
                  </div>
                  <input type="text" className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md outline-none focus:ring-black focus:border-black" placeholder="search" />  
                </div> 
            </div>
               
            {/* Right */}

            {auth.currentUser ?
                <div className="flex items-center justify-end space-x-4">
                  <HomeIcon className="navBtn" onClick={() => navigate('/')}/>
                  <MenuIcon className="h-6 md:hidden cursor-pointer" onClick={() => navigate('/')}/>
                  <div className="relative navBtn" onClick={() => navigate('/chats')}>
                    <PaperAirplaneIcon className="navBtn rotate-45"/>
                    <div className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-orange rounded-full flex items-center justify-center text-white animate-pulse ">3</div>
                  </div>
                  <PlusCircleIcon className="navBtn" onClick={() => setOpen(true)}/>
                  <UserGroupIcon className="navBtn" onClick={() => navigate('/')}/>
                  <HeartIcon className="navBtn" onClick={() => navigate('/')}/>
                  <img src={user} alt="profilePic" className="h-10 w-10 rounded-full cursor-pointer" />
                </div>
                : 
                    <button 
                    className=" text-white navBtn items-center mt-4 bg-orange text-sm py-3 px-4 rounded-md font-semibold"
                    onClick={() => navigate('/signin')}
                    > Sign In</button>
              
            }
        </div>
       
    </div>
  )
}

export default Header

