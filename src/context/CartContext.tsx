import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useState } from "react";
import { db } from "../services/firebaseConnection";

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextData {
    listProduct: ProductData[];
    addProductCart: (id: number, title: string, price: number, description: string, category: string, image: string) => void;
    deleteProductCart: (uid: string) => void;
    updateProductCart: (uid: string, id: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
    totalProduct: number
}

interface ProductData {
    uid: string,
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    quantity: number,
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children } : CartProviderProps) {
    const [listProduct, setListProduct ] = useState<ProductData[]>([])
    const [total, setTotal] = useState(0)
    const [totalProduct, setTotalProduct ] = useState(0)
    
    useEffect(() => {
        getDataProducts()
    }, [listProduct])

    useEffect(() => {
        let sunPrice = 0
        listProduct.map((item) => {
            sunPrice = ((item.quantity * item.price) + sunPrice)
        })
        setTotal(sunPrice)
    }, [listProduct])

    useEffect(() => {
        let sunQuantity = 0
        listProduct.map((item) => {
            sunQuantity = item.quantity + sunQuantity
        })
        setTotalProduct(sunQuantity)
    }, [listProduct])

    async function checkProduct(id: number) {
        const cartCollection = collection(db, 'cart')
        const queryRef = query(cartCollection, where('id', '==', id ))
        const snapshot = await getDocs(queryRef)
        const updateProduct = {
            uid: '',
            id: 0,
            quantity: '',
            isProduct: false
        }

        snapshot.forEach((doc) => {
            console.log(doc.data().title);
            updateProduct.uid = doc.id
            updateProduct.id = doc.data().id
            updateProduct.quantity = (doc.data().quantity + 1)
            updateProduct.isProduct = true
        })
        return updateProduct
    }

    async function addProductCart(id: number, title: string, price: number, description: string, category: string, image: string){
        const product = await checkProduct(id)
        if(product.isProduct) {
            updateProductCart(product.uid, product.id, Number(product.quantity))
        } else {
            addDoc(collection(db, 'cart'), {
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                image: image,
                quantity: 1,
                cartAt: new Date(),
            })
            .then(() => {
                alert("Produto adicionado ao carrinho!");
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    function getDataProducts() {
        const cartCollection = collection(db, 'cart')
        const queryRef = query(cartCollection, orderBy('cartAt', 'desc'))

        onSnapshot(queryRef, (snapshot) => {
            const list = [] as ProductData[]
            snapshot.forEach((doc) => {
                list.push(
                    {
                        uid: doc.id,
                        id: doc.data().id,
                        title: doc.data().title,
                        price: doc.data().price,
                        description: doc.data().description,
                        category: doc.data().category,
                        image: doc.data().image,
                        quantity: doc.data().quantity,
                    }
                )
                setListProduct(list)
            })
        })
    }

    async function deleteProductCart(uid: string) {
        const docRef = doc(db, 'cart', uid)

        await deleteDoc(docRef)
        .then(() => {
            const newListProduct = listProduct.filter(item => item.uid !== uid);
            setListProduct(newListProduct);
            console.log(listProduct.length);
            console.log("produto removido do carrinho com sucesso");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async function updateProductCart(uid: string, id: number, quantity: number) {
        const index = listProduct.findIndex(item => item.id === id)
        const newProduct = listProduct[index]
        newProduct.quantity = quantity;
        console.log(newProduct.quantity);
        
        const docRef = doc(db, 'cart', uid)

        await updateDoc(docRef, {
            'quantity': quantity,
        })
        .then(() => {
            listProduct.splice(index, 1, newProduct)
            alert("Quantidade Atulizada com sucesso")
        })
        .catch((error) => {
            console.log("Erro:" + error);
        })
    }

    async function clearCart() {
        const cartCollection = collection(db, 'cart')
        const queryRef = query(cartCollection)
        const snapshot = await getDocs(queryRef)

        snapshot.forEach(async (doc) => {
            console.log(doc.ref);
            
            await deleteDoc(doc.ref)
            .then(() => {
                setListProduct([])
            })
            .catch((error) => {
                console.log(error);
            })
        })
    }

    return(
        <CartContext.Provider value={{listProduct, addProductCart, deleteProductCart, updateProductCart, clearCart, total, totalProduct }}>
            {children}
        </CartContext.Provider>
    )
}