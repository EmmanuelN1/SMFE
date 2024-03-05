import { useContext } from "react";
import { useEffect, useState } from "react"
import { faker }from "@faker-js/faker"
import { getAuth } from "firebase/auth";
import { AuthContext } from "../contextApi/AuthContext";




function Suggestion() {
    const [suggestion, setSuggestion] = useState([])
    const auth = getAuth();
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        const suggestion = [...Array(10)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id:i
        }));
          setSuggestion(suggestion)
    }, [])


  return (
        <>
            {auth?.currentUser && 
                        <div className="mt-4 ml-10 ">
                            <div className="flex justify-between text-sm mb-5">
                                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                                <button className="text-gray-600 font-semibold">See All</button>
                            </div>
            
                        {
                            suggestion.map(profile =>(
                                <div key={profile.id} className="flex items-center justify-between mt-3">
                                    <img className=" rounded-full border p-{2px}" width={34} height={34} src={profile.avatar} alt="avatar"/>
            
                                    <div className="flex-1 ml-4">
                                        <h2 className="font-semibold text-sm">
                                            {profile.username}
                                        </h2>
                                        <h3 className="text-xs text-gray-400 truncate w-20">Works at{profile.company.name}</h3>
                                    </div>
                                    <button  className="text-sm text-red-600 font-bold" onClick={() => alert("Functionality not within the scope")}>follow</button>
                                </div>
                            ))
                        }
                    </div>
            }
        </>

  )
}

export default Suggestion