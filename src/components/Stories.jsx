
import { useEffect, useState } from "react"
import { faker } from "@faker-js/faker"
import Story from "./Story";

function Stories() {
    const [suggestion, setSuggestion] = useState([])


    useEffect(() => {
        const suggestion = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id:i
        }));
          setSuggestion(suggestion)
    }, [])

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll">
        {
          suggestion.map(profile =>(
            <Story 
                key={profile.id}
                img={profile.avatar} 
                username={profile.username} 
            />
          ))
        
        }
    </div>
  )
}

export default Stories