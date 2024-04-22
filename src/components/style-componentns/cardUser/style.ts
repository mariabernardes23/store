import styled from 'styled-components'

const CardContainer = styled.div`
    display: flex;
    align-items: center;
`
const CardBody = styled.div`
`

const CardText = styled.h2`
    font-size: 1.3rem;
    margin-left: 0.5rem;

    @media screen and (max-width: 600px) {
        font-size: 0.9rem;
    }
`
const CardIcon = styled.div`
    @media screen and (max-width: 600px) {
        display: none;
    }
`

export { CardContainer, CardBody, CardText, CardIcon }