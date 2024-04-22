import styled from "styled-components";

const TableContainer = styled.div`
    overflow-x: auto;
    margin-bottom: 2rem;
`
const Table = styled.table`
    border-collapse: collapse;
    border: 0.5rem solid #203936;
    width: 100%;
    text-align: center;
`

const TableHeader = styled.thead`
`

const TableTr = styled.tr`

`

const TableTh = styled.th`
    border: 0.5rem solid #203936;
    padding: 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
`

const TableTd = styled.td`
    border: 0.5rem solid #203936;
    word-wrap: break-word;
    text-justify: inter-word;
    padding: 0.5rem;
`

const TableBody = styled.tbody``

const TableImg = styled.img`
    width: 100%;
    height: 8rem;
    object-fit: contain;

    @media screen and (max-width: 600px){
        height: 6rem;
    }
`

const TableText = styled.p`
    margin: 0;
` 

export { TableContainer, Table, TableHeader,  TableTr, TableTh, TableBody,  TableTd, TableImg, TableText }