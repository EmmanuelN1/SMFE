import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";


const auth = getAuth()

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
      const unsub =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        });

        return () => {
            unsub()
        }
    }, []);
    return(
        <AuthContext.Provider value={{currentUser}}>
              {children}
        </AuthContext.Provider>      
    )
   
}

