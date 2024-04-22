import { ReactNode, createContext, useEffect, useState } from "react";
import { db } from "../services/firebaseConnection";
import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore";

interface UserProviderProps {
    children: ReactNode;
}

interface UserContextData {
    user: UserData,
    addUser: (id: string, name: string, email: string) => void,
    updateDataUser: (uid: string, name: string, email: string) => void,
}

interface UserData {
    uid: string;
    id: string;
    name: string;
    email: string;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }:  UserProviderProps) {
    const [ user, setUser ] = useState<UserData>({
        uid: '',
        id: '',
        name: '',
        email: '',
    })

    useEffect(() => {
        getDataUser()
    }, [])

    async function checkUser(id: string) {
        const userCollection = collection(db, 'user')
        const queryRef = query(userCollection)
        const snapshot = await getDocs(queryRef)
        const isUser = snapshot.docs.some(doc => doc.data().id === id)
        
        return isUser
    }

    async function addUser(id: string, name: string, email: string) {
        if(await checkUser(id)) {
            console.log("Usuário salvo já");
        } else {
            const end = name.indexOf('@')
            addDoc(collection(db, 'user'), {
                id: id,
                name: name.substring(0, end),
                email: email,
            })
            .then(() => {
                console.log("Usuário salvo no banco");    
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    function getDataUser() { 
        const userCollection = collection(db, 'user')
        const queryRef = query(userCollection)

        onSnapshot(queryRef, (snapshot) => {
            snapshot.forEach((doc) => {
                setUser({
                    uid: doc.id,
                    id: doc.data().id,
                    name: doc.data().name,
                    email:  doc.data().email
                })
            })
        })
    }

    function updateDataUser(uid: string, name: string, email: string) {
        const docRef = doc(db, 'user', uid)
    
        updateDoc(docRef, {
            'name': name,
            'email': email,
        })
        .then(() => {
            user.name = name
            user.email = email
            console.log("Dados do perfil atualizado com sucesso!");
        })
        .then((error) => {
            console.log(error);
        })
    }

    return(
        <UserContext.Provider value={{user, addUser, updateDataUser}}>
            {children}
        </UserContext.Provider>
    )
}