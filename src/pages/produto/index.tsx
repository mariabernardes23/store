import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductProps } from "../home"
import CardTwo from "../../components/cardTwo.tsx/cardTwo"
import "./style.css"
import { Name } from "../../components/Name"

export function Produto() {
    const { id } = useParams()
    const [product, setProduct] = useState<ProductProps>()
    
    useEffect(() => {
        function getProduct(id: string | undefined) {
            const url =`https://fakestoreapi.com/products/${id}`
            fetch(url)
            .then(response => response.json())
            .then((data) => {
                setProduct(data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
        getProduct(id)
    }, [])

    return(
        <>
            <Name />
            <div className="center">
                <CardTwo 
                    id={product?.id} 
                    title={product?.title} 
                    price={product?.price} 
                    description={product?.description} 
                    category={product?.category} 
                    image={product?.image}
                />
            </div>
        </>
    )
}
