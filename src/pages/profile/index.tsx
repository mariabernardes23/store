import { FormEvent, useContext, useEffect, useState } from "react";
import { Input } from "../../components/input";
import { UserContext } from "../../context/UserContex";
import CardUser from "../../components/cardUser/cardUser";
import { Pencil } from "@phosphor-icons/react";
import './style.css';
import { Name } from "../../components/Name";

export function Profile() {
    const { user, updateDataUser } = useContext(UserContext);
    const [ editUser, setEditUser ] = useState(false)
    const [ userName, setUserName ] = useState('')
    const [ userEmail, setUserEmail ] = useState('')

    useEffect(() => {
        setUserName(user.name)
        setUserEmail(user.email)
    }, [user])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if(userName.trim() == '' && userEmail.trim() == '') {
            alert("Os campos nome e email não pode ser nulos!")
            return
        }
        
        updateDataUser(user.uid, userName, userEmail)
        setEditUser(false)
    }

    if(editUser){   
        return (
            <>
                <Name />
                <h1 className="profile">Gerencimaneto de Usuário</h1>
                <div className="form-container">
                    <form className="form">
                        <Input
                            placeholder="Nome"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} 
                            className="input"
                        />
                        <Input
                            placeholder="email"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)} 
                            className="input"
                        />
                        <div className="center">
                            <button onClick={handleSubmit} className="button">
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Name />
                <h1 className="profile">Gerencimaneto de Usuário</h1>
                
                <div className="div">
                    <div className="container-edit">
                        <CardUser 
                            name={userName} 
                            email={userEmail} />

                        <Pencil size={30} color="#d52a2a" onClick={() => setEditUser(true)} className="icon-pencil"/>
                    </div>
                </div>
            </>
        )
    }
}