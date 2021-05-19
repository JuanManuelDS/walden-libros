import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';


export default function NavBar ({padding}) {
    return (
        <nav className='navBar'>
            <div>
                <img src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453640/WaldenLibros/Logos/shopping-cart_lyotws.png' id='carrito-img'/>
                <ul>
                    <li><Link to={'/'} style={{color: 'white', textDecoration: 'none'}}>Home</Link></li>
                    <li> <Link to={'/categories'} style={{color: 'white', textDecoration: 'none'}}>Libros</Link></li>
                </ul>
                
                <span>
                    <Link to={'/'} style={{color: 'white', textDecoration: 'none'}}>Walden Libros</Link>
                </span>
            </div>
        </nav>
    )
}