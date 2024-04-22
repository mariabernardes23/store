import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContex"

export function Name() {
    const [name, setName] = useState('')
    const { user } = useContext(UserContext)

    useEffect(() => {
        setName(user.name || 'cliente')
    },[user])
    
    return(
        <p>Olá, {name}!</p>
    )
}