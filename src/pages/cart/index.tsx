import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import CardCart from "../../components/tableCart"
import './style.css'
import { Name } from "../../components/Name"

export function Cart() {
    const {listProduct, clearCart, total} = useContext(CartContext)
    return(
        <>
            <Name />
            <h1 className="my-cart">Meus Produtos</h1>

            <div className="info-cart">
                <p>Total R${total.toFixed(2)}</p>
                <button onClick={clearCart} className="button-clear">Limpar Carrinho</button>
            </div>

            <div className="card-center">
                {
                    listProduct.map((item, index) => (
                        <CardCart 
                            key={index}
                            uid = {item.uid}
                            id={item.id} 
                            title={item.title}  
                            price={item.price} 
                            description={item.description} 
                            category={item.category} 
                            image={item.image} 
                            quantity={item.quantity}/>
                    ))
                }
            </div>
        </>
    )
}