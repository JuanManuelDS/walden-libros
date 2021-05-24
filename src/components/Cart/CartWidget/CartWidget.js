import React, {useContext,useState,  useEffect} from 'react';
import {ImCart} from 'react-icons/im';
import {TiDelete} from 'react-icons/ti'
import {CarritoContext} from '../../../context/CarritoContext';
import {Link} from 'react-router-dom';
import './CartWidget.css';
import {UserContext} from '../../../context/UserContext'

export default function CartWidget(){

    const {user} = useContext(UserContext);
    const {cart, deleteItem, cleanCart} = useContext(CarritoContext);
    const [CWVisibility, setCWVisibility] = useState(false);

    function changeCWVisibility(){
        CWVisibility ? setCWVisibility(false) : setCWVisibility(true)
    }

    return (
        <>
            <ImCart id='carrito-img' onClick={changeCWVisibility} onBlur={changeCWVisibility}/>
            {//Si el CWVisibility es true, muestro el cartWidget
            CWVisibility ? 
                <div id='cartWidget'>
                    {//Si el carrito tiene items, muestro la tabla. Sino, el mensaje con el link hacia el listado de items
                    cart.length>0 ?
                        <>
                        <table id='cartWidget-table'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Libro</th>
                                    <th>Precio</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(lib=>{
                                    return(<tr>
                                        <td><img src={lib.item.imagen} className='cartWidget-table-img'/></td>
                                        <td>{lib.item.titulo}</td>
                                        <td>{lib.price}</td>
                                        <td><TiDelete id='deleteIcon'onClick={e=>deleteItem(e,lib)}/></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                        <button id='cartWidget-table-btnVaciar' onClick={cleanCart}>Vaciar</button>
                        <Link to={`${user.name ? '/cart' : '/login'}`} style={{textDecoration: 'none'}}><button id='cartWidget-table-btnFinalizar'>Finalizar compra</button></Link>
                        </>
                        :
                        <><p>Todavía no agregaste ningun libro</p><Link to={'/categories'}><p>Ir a listado</p></Link></>}
                </div>
            :
            //Si el CWVisibility es false, no muestro nada
            <></>}
        </>
    )
}