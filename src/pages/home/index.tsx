import { useContext, useEffect, useState } from "react";
import Card from "../../components/card/card";
import { UserContext } from "../../context/UserContex";
import './style.css';
import { Name } from "../../components/Name";

export interface ProductProps {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string, 
}

export function Home() {
    const [products, setProducts] = useState<ProductProps[]>([])

    useEffect(() => {
        function getProducts() {
            fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then((data) => {
                setProducts(data);             
            })
            .catch((error) => {
                console.log(error);
            })
        }
        getProducts()
    }, [])

    return(
        <>
            <Name />
            <h1 className="welcome">Seja bem-vindo a nosso site! Explore nossa seleção de produtos cuidadosamente escolhidos 
                para atender às suas necessidades.</h1>
             
            <div className='card-list'>
                {
                    products.map((item, index) => (
                        <Card 
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            image={item.image}                         
                        />
                    ))
                }
            </div>
        </>
    )
}