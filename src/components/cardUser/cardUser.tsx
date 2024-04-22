import { IdentificationBadge } from "@phosphor-icons/react"
import { CardContainer, CardBody, CardText, CardIcon } from "../style-componentns/cardUser/style"

interface CardUserProps {
    name: string,
    email: string,
}

const CardUser: React.FC<CardUserProps> = ({name, email}) => {
    return (
        <CardContainer>
            <CardIcon>
                <IdentificationBadge size={90} color="#d52a2a"/>
            </CardIcon>
            <CardBody>
                <CardText>{name}</CardText>
                <CardText>{email}</CardText>
            </CardBody>
        </CardContainer>
    )
}

export default CardUser