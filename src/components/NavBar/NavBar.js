import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import CartWidget from '../Cart/CartWidget/CartWidget'


export default function NavBar ({padding}) {
    return (
        <nav className='navBar'>
            <div>
                <CartWidget />
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