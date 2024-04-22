import { Pencil, Trash } from "@phosphor-icons/react"
import { Table, TableBody, TableContainer, TableHeader, TableImg, TableTd, TableText, TableTh, TableTr } from "../style-componentns/tableCart/style"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { Input } from "../input";
import './style.css'

interface TableProps {
    uid: string;
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string, 
    quantity: number,
}

const CardCart: React.FC<TableProps> = ({uid, id, title, price, description, category, image, quantity}) => {
    const { deleteProductCart, updateProductCart } = useContext(CartContext)
    const [ editProduct, setEditProduct] = useState(false)
    const [ newQuantity, setNewQuantity ] = useState(quantity)
    
    function increment() {
        setNewQuantity(valueCurrent => valueCurrent + 1)   
    }

    function decrement() {
        if(newQuantity == 1) {
            return
        }
        setNewQuantity(valueCurrent => valueCurrent - 1)
    }

    function updateQuantity(uid: string) {
        console.log(newQuantity);
        if(quantity == newQuantity) {
            setNewQuantity(0)
            setEditProduct(false)
        } else {
            updateProductCart(uid, id, newQuantity)
            setNewQuantity(0)
            setEditProduct(false)
        }
    }

    return(
        <>
            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableTr>
                            <TableTh>Produto</TableTh>
                            <TableTh>Quantidade</TableTh>
                            <TableTh>Preço</TableTh>
                            <TableTh>Total</TableTh>
                            <TableTh>Ações</TableTh>
                        </TableTr>
                    </TableHeader>
                    <TableBody>
                        <TableTd>
                            <TableImg src={image} />
                            <TableText>{title}</TableText>
                        </TableTd>
                        <TableTd>
                            {
                                editProduct ? 
                                <>
                                    <button onClick={decrement} className="button-update">-</button>
                                        {newQuantity}
                                    <button onClick={increment} className="button-update">+</button>
                                    <button onClick={() => updateQuantity(uid)} className="button-save">Salvar</button>
                                </>
                                :
                                <TableText>{quantity}</TableText>
                            }
                        </TableTd>
                        <TableTd>R$ {price.toFixed(2)}</TableTd>
                        <TableTd>R$ {quantity* price}</TableTd>
                        <TableTd>
                            <Trash size={28} color="#d52a2a" onClick={() => deleteProductCart(uid)} className="icon-pencil"/>
                            <Pencil size={28} color="#d52a2a" onClick={() => setEditProduct(true)} className="icon-pencil"/>
                        </TableTd>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CardCart