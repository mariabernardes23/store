import { useNavigate } from "react-router-dom";
import { CardBody, CardButton, CardContainer, CardImg, CardFlex, CardTitle, CardText } from "../style-componentns/card/style";
import { Star } from "@phosphor-icons/react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export interface CardProps {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string, 
}

const Card: React.FC<CardProps> = ({id, title, price, description, category, image }) => {
    const navigate = useNavigate()

    function handleShowMore(id: number) {
        const url = `/produto/${id}`;
        navigate(url, { replace: true})
    }

    async function checkBookmark() {
        const BookmarksCollection = collection(db, 'bookmarks');
        const queryRef = query(BookmarksCollection);
        
        const snapshot = await getDocs(queryRef);
    
        const isFavorited = snapshot.docs.some(doc => doc.data().id === id);
  
        return isFavorited;
    }

    async function handleBookmark() {
        if(await checkBookmark()) {
            alert('Você já favoritou esse produto, confira em "Favotitos"!')
        } else {
            alert('PRODUTO FAVORITADO COM SUCESSO!!!')
            addDoc(collection(db, 'bookmarks'), {
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                image: image,
                bookmarkedAt: new Date(),
            })
            .then(() => {
                console.log('SALVOU COM SUCESSO!!!');  
            })
            .catch((error) => {
                console.log('HOUVE UM ERRO AO FAVORITAR', error);
            })
        }
    }

    return(
        <>
            <CardContainer>
                <CardImg src={image} />
                <CardBody>
                    <CardTitle>{title}</CardTitle> 
                    <CardFlex>
                        <CardText>R$ {price}</CardText>
                        <Star size={26} color="yellow" weight="fill" onClick={handleBookmark} />
                    </CardFlex>
                    <CardButton onClick={() => handleShowMore(id)}>Ver Mais</CardButton>
                </CardBody>
            </CardContainer>

        </>
    )
}

export default Card;