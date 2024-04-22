import { Link } from "react-router-dom"
import "./style.css"
import { Name } from "../../components/Name"

export function Notfound() {
    return(
        <>
            <Name />
            <div className="error">
                <img src="src/assets/image/erro.jpg" alt="" className="img-error"/>
                <button className="button"><Link to={"/"} className="link">Voltar ao Home</Link></button>
            </div>
        </>
    )
}