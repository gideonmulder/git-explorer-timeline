import { useState } from "react";

export default function About(){
    const [healthText, setHealthText] = useState<string>("");

    const showBackendHealth = async () =>{
        setHealthText(() => "loading");
        const result = await fetch('/api/health');
        if(result.ok){
            const text = await result.text();
            setHealthText(() => text);
        }
        else{
            setHealthText(() => "Error: could not get health from server")
        }
    }

    return (
        <>
        View your git repository through graphical timeline<br />
        <button onClick={() => showBackendHealth()}>Get backend health</button>
        <div>{healthText}</div>
        </>
    )
}