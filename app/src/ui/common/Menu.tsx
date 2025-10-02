import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <Link to={{pathname:"/"}} >Home</Link> | <Link to={{pathname:"/about"}} >About</Link>
        </>
    )
}