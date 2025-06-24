import { useEffect, useState } from "react"
import { fetchUser } from "../fetchData"
import { Link, useNavigate } from "react-router-dom"

function UserIcon(){
    const username = "tickle122"

    const [user, setUser] = useState({})

    const navigate = useNavigate()
    
    useEffect(() => {
        fetchUser(username)
        .then(({user}) => {
            setUser(user)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return <>
        <Link to={`/users/${user.username}`} >
        <img src={user.avatar_url} alt="the user's chosen profile picture" className="user-icon"/>
        </Link>
    </>
}

export default UserIcon