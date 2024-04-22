import { useContext, useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import { Storefront, List } from "@phosphor-icons/react";
import { CartContext } from '../../context/CartContext';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalProduct } = useContext(CartContext)

  return (
    <nav className='navbar'>
      <Link to="/" className="name-logo">
        <Storefront size={34} />
        <p className='name'>Store</p>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <List size={32} weight="bold" className="icon-menu"/>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <Link to={'/'} className='link'>Home</Link>
        </li>
        <li>
          <Link to={'/favoritos'} className='link'>Favoritos</Link>
        </li>
        <li>
          <Link to={'/cart'} className='link'>Carrinho {totalProduct}</Link>
        </li>
        <li>
          <Link to={'/profile'} className='link'>Perfil</Link>
        </li>
        <li>
          <Link to={'/login'} className='link'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}