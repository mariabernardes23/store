import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { CardProps } from "../card/card";
import { CardContainer, CardFlex, CardBody, CardImg, CardText, CardTitle, CardTextColor, CardButtonGet } from "../style-componentns/cardTwo/style";

const CardTwo: React.FC<CardProps> = ({id, title, price, description, category, image}) => {
    const { addProductCart } = useContext(CartContext)
    
    return ( 
        <CardContainer>
            <CardFlex>
                <CardImg src={image} />
                <CardBody>
                    <CardTextColor>{category}</CardTextColor>
                    <CardTitle>{title}</CardTitle> 
                    <CardTextColor>R$ {price}</CardTextColor>
                    <CardText>{description}</CardText>
                    <CardButtonGet 
                        onClick={() => {addProductCart(id, title, price, description, category, image)}}>
                        Adicionar ao Carrinho
                    </CardButtonGet>
                </CardBody>
           </CardFlex>
        </CardContainer>
    )
}
export default CardTwo;