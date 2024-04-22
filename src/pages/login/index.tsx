import { FormEvent, useContext, useState } from "react";
import { Input } from "../../components/input";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "@phosphor-icons/react";
import "../login/style.css";
import { UserContext } from "../../context/UserContex";

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { addUser } = useContext(UserContext)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (email === '' || password === '') {
            alert('Prencha todos os campos')
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user            
            addUser(user.uid, user.email, user.email)
            console.log('Login realizado com sucesso');
            navigate('/', { replace: true})
        })
        .catch((error) => {
            console.log('Erro ao realizar login');
            console.log(error);
        })
    }

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <div className="center">
                    <UserCircle size={120} weight="fill" className="user"/>
                </div>
            
                <Input 
                    placeholder="seuemail@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />

                <Input
                    placeholder="********"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />

                <div className="center">
                    <button type="submit" className="button">Entrar</button>
                </div>
            </form>
        </div>
    )
}