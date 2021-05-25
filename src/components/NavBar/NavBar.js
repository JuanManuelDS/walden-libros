import React, { useContext } from 'react';
import './NavBar.css';
import {Link, useHistory} from 'react-router-dom';
import CartWidget from '../Cart/CartWidget/CartWidget';
import {BiUserCircle} from 'react-icons/bi';
import { UserContext } from '../../context/UserContext';


export default function NavBar () {

    const {user} = useContext(UserContext)
    const history = useHistory();

    return (
        <nav className='navBar'>
            <div>
                <CartWidget />
                <BiUserCircle onClick={()=>history.push(user.name ? '/user' : '/login')} size={'40px'} id='user-icon'/>
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